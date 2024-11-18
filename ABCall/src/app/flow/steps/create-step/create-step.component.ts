import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlowService } from '../../../service/knowledgebase/flow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlowStepResultDTO } from '../stepRestult';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent {
  readonly dialog = inject(MatDialog);
  public flowId!: number;
  constructor(private flowService: FlowService, private router: Router,private route: ActivatedRoute, private translate: TranslateService) {
    this.flowId = +(this.route.snapshot.paramMap.get('flow_id') ?? 0);
  }

  createStep(step:FlowStepResultDTO){
    debugger;
    if (step.description !== undefined) {
      this.flowService.createStep(step).subscribe(
        (response: any) => {
          const message = this.translate.instant('flowSteps.stepCreated');
          this.openDialog(message);
        },
        (error: any) => {
          console.error(error.Message);
        }
      );
    }
  }

  openDialog(mensaje: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: mensaje },
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/flow/steps/' + this.flowId]);
    });
  }

}
