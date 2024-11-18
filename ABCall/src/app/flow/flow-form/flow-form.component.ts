import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlowResultDto } from '../flowResult';
import { TranslateService } from '@ngx-translate/core';
import { FlowService } from '../../service/knowledgebase/flow.service';
import { TagResultDTO } from '../../knwoledgebase/tagResult';

@Component({
  selector: 'app-flow-form',
  templateUrl: './flow-form.component.html',
  styleUrls: ['./flow-form.component.css']
})
export class FlowFormComponent implements OnInit {
  @Input() model: FlowResultDto | null = null;
  @Output() submit: EventEmitter<FlowResultDto> = new EventEmitter<FlowResultDto>();
  public form: FormGroup;
  public submitted = false;
  public tags: TagResultDTO[] = []

  constructor(private formBuilder: FormBuilder, private translate: TranslateService, private flowService: FlowService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      tags: [[]],
    });
    this.getTags();
  }

  ngOnInit(): void {
    if (this.model) {
      this.form.patchValue(this.model);
    }
  }

  saveInfo() {
    this.submitted = true;
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorNameField(): string{
    const campo = this.form.get('name');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('flowsModule.requiredName');
    }
    return ""
  }

  getErrorDescriptionField(): string{
    const campo = this.form.get('description');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('flowsModule.requiredDescription');
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

  public getTags() {
    this.flowService.getTags().subscribe(
      (response: TagResultDTO[]) => {
        this.tags = response; 
      },
      (error: any) => console.error(error.message) 
    );
  }

  public modifyTags(tag_id: number): void {
    const campo = this.form.get('tags');
    
    if (campo && Array.isArray(campo.value)) {
      const tags = [...campo.value]; 
  
      if (tags.includes(tag_id)) { 
        const index = tags.indexOf(tag_id);
        tags.splice(index, 1);
      } else { 
        tags.push(tag_id);
      }
  
      campo.setValue(tags);
    } else {
      console.error('El campo tags no es un arreglo válido');
    }
  }
  

  onCancel() {
    this.form.reset();
    this.submitted = false;
  }
}
