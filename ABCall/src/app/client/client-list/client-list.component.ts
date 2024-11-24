import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ClientResultDTO } from '../clientResult';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client/client.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ClientDetailDialogComponent } from '../../shared/client-detail-dialog/client-detail-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public clientList: any;
  displayedColumns: string[] = ['name', 'address', 'perfil', 'planType',  'actions'];
  isNotFound:boolean=true;
  private subscription: Subscription = new Subscription;

  constructor(private router:Router, private clientService: ClientService, public dialog: MatDialog, private translate: TranslateService) {
    this.getClients();
  }

  public getClients() {
    this.clientService.getClients().subscribe(
      (response: ClientResultDTO[]) => this.listFoundClients(response),
      (error: any) => console.error(error)
    );
  }

  public listFoundClients(list: ClientResultDTO[]) {
    this.isNotFound=(list.length==0);
    console.log(list);
    this.clientList = new MatTableDataSource<ClientResultDTO>(list);
    this.clientList.paginator = this.paginator;
  }

  goToClientCreation(){
    this.router.navigateByUrl('createClient');
  }

  getClientDetail(clientInfo:ClientResultDTO){
    this.dialog.open(ClientDetailDialogComponent, {
      data: { clientInfo },
    });
  }


}
