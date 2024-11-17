import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FlowService } from '../../service/knowledgebase/flow.service';
import { MatDialog } from '@angular/material/dialog';
import { FlowResultDto } from '../flowResult';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.css']
})
export class FlowListComponent {

  @ViewChild('searchContent') searchContent!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public flowsList: any;
  displayedColumns: string[] = ['name', 'description', 'actions'];
  isNotFound:boolean=true;
  private subscription: Subscription = new Subscription;
  constructor(private router:Router, private flowService: FlowService, public dialog: MatDialog, private translate: TranslateService) {
    this.getFlows();
  }

  public getFlows() {
    this.flowService.getFlows().subscribe(
      (response: FlowResultDto[]) => this.listFoundFlows(response),
      (error: any) => console.error(error)
    );
  }

  public listFoundFlows(list: FlowResultDto[]) {
    console.log("TEST")
    this.isNotFound=(list.length==0)
    this.flowsList = new MatTableDataSource<FlowResultDto>(list);
    this.flowsList.paginator = this.paginator;
  }

  goToFlowCreation(){
    this.router.navigateByUrl('createFlow');
  }

  onCheckSteps(id:number){
    this.router.navigateByUrl(`flow/steps/${id}`);
  }

  showDeletionDialog(id:number): void {
    let message = ''
    this.subscription=this.translate.stream('flowsModule.deleteMessage').subscribe((translatedText: string) => {
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
            this.flowService.deleteFlow(id).subscribe(
              (result:any)=>{
                this.openDialog(result.message)
                this.getFlows();
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
