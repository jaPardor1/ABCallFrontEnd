import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowService } from '../../../service/knowledgebase/flow.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FlowStepResultDTO } from '../stepRestult';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.css']
})
export class StepListComponent {

  @ViewChild('searchContent') searchContent!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public stepsList: any;
  displayedColumns: string[] = ['description', 'type', 'actions'];
  isNotFound:boolean=true;
  public flowId!: number;
  private subscription: Subscription = new Subscription;
  constructor(private router:Router, private route: ActivatedRoute, private flowService: FlowService, public dialog: MatDialog, private translate: TranslateService) {
    this.flowId = +(this.route.snapshot.paramMap.get('flow_id') ?? 0);
    if(this.flowId > 0){
      this.getSteps(this.flowId)
    }else{
      console.error('No flow_id found in the URL')
    }
  }

  public getSteps(flow_id: number) {
    this.flowService.getSteps(flow_id).subscribe(
      (response: FlowStepResultDTO[]) => this.listFoundFlowSteps(response),
      (error: any) => console.error(error)
    );
  }

  public listFoundFlowSteps(list: FlowStepResultDTO[]) {
    this.isNotFound=(list.length==0)
    this.stepsList = new MatTableDataSource<FlowStepResultDTO>(list);
    this.stepsList.paginator = this.paginator;
  }

  goToStepCreation(){
    this.router.navigateByUrl(`flow/${this.flowId}/createStep`);
  }

  showDeletionDialog(id:number): void {
    let message = ''
    this.subscription=this.translate.stream('flowSteps.deleteMessage').subscribe((translatedText: string) => {
      message = translatedText;
    });

    console.log(id);
    this.dialog
      .open(ConfirmDialogComponent, {
        data: message
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
            this.flowService.deleteStep(id).subscribe(
              (result:any)=>{
                this.openDialog(result.message)
                this.getSteps(this.flowId);
              },
              (error:any)=>{
                this.openDialog(error)
              }
            )
        }
      });
  }

  openDialog(mensaje: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: mensaje },
    });
  }

}
