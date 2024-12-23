import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserDto } from '../user';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';
import { UserService } from '../../service/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit , OnDestroy  {
  displayedColumns: string[] = ['identificacion', 'nombre', 'perfil','actions'];
  usersList:UserDto[]=[];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private subscription: Subscription = new Subscription;
  constructor(private router:Router,private userService:UserService,public dialog: MatDialog, private translate: TranslateService) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getRegisteredUsers();
  }

  goToUserCreation(){
    this.router.navigateByUrl('createUser');
  }

  getRegisteredUsers(){

    this.userService.getUsers().subscribe(
      (response: UserDto[]) => {
        this.usersList=response;
        this.dataSource = new MatTableDataSource<UserDto>(this.usersList);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => console.error(error)
    )
  }

  onDeleteUser(user:string){
    alert(user);

  }
  onEditUser(sub:string){
    this.router.navigateByUrl(`editUser/${sub}`);
  }

  showDeletionDialog(sub:string): void {
    let message = ''
    this.subscription=this.translate.stream('userListModule.borrarMessage').subscribe((translatedText: string) => {
      message = translatedText;
    });

    console.log(sub);
    this.dialog
      .open(ConfirmDialogComponent,{
        data: message
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
            this.userService.deleteUserSub(sub).subscribe(
              (result:any)=>{
                this.openDialog(result.message)
                this.getRegisteredUsers();
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
