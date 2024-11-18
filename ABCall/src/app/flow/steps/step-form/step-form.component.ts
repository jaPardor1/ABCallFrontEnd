import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlowStepResultDTO, StepType } from '../stepRestult';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent implements OnInit {

  @Input() model: FlowStepResultDTO | null = null;
  @Output() submit: EventEmitter<FlowStepResultDTO> = new EventEmitter<FlowStepResultDTO>();
  public form: FormGroup;
  public submitted = false;
  public flowId!: number;
  stepTypes = Object.values(StepType)

  constructor(private formBuilder: FormBuilder, private translate: TranslateService, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      flow_id: [],
    });
  }

  ngOnInit() {
    const flowIdParam = this.route.snapshot.paramMap.get('flow_id');
    if (flowIdParam) {
      this.flowId = +flowIdParam;
      this.form.patchValue({ flow_id: this.flowId });
    } else {
      console.error('No flow_id found in the URL');
    }
  }

  saveInfo() {
    debugger;
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorDescriptionField(): string{
    debugger;
    const campo = this.form.get('description');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('flowSteps.requiredDescription');
      if(campo.hasError('minlength')) return this.translate.instant('flowSteps.minLength');
    }
    return ""
  }

  getErrorTypeField(): string{
    const campo = this.form.get('type');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('flowSteps.typeRequired');
    }
    return ""
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return this.translate.instant('FlowFormModule.fieldRequired');
    }
    if (control?.hasError('minlength')) {
      return this.translate.instant('FlowFormModule.minLength');
    }
    return '';
  }

  onCancel() {
    this.form.reset();
    this.submitted = false;
  }

}
