import { Component, inject } from '@angular/core';
import { FlowService } from '../../service/knowledgebase/flow.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlowResultDto } from '../flowResult';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { TagResultDTO } from '../../knwoledgebase/tagResult';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent {
  readonly dialog = inject(MatDialog);
  private tagsList: TagResultDTO[] = [];
  constructor(private flowService: FlowService, private router: Router, private translate: TranslateService) {
  }

  createFlow(flowInfo: FlowResultDto) {
    if (flowInfo.name !== undefined) {
      this.flowService.createFlow(flowInfo).subscribe(
        (response: any) => {
          const message = this.translate.instant('flowsModule.flowCreated');
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
      this.router.navigate(['/flows']);
    });
  }

  

}
