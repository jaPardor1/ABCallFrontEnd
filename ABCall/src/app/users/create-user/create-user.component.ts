import { Component, inject } from '@angular/core';
import { UserDto } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  readonly dialog = inject(MatDialog);


  constructor(private userService:UserService){

  }

  createUser(userInfo: UserDto) {
    if (userInfo.cognito_user_sub !== undefined) {
      this.userService.createUser(userInfo).subscribe(
        (response:any) => {
          console.log(response.cognito_user_sub);
          this.openDialog( $localize `El Usuario ha sido Creado`+response.cognito_user_sub);
        },
        (error:any) => {
          this.openDialog(error.Message);
           console.error(error.Message)
        }
      )
    }
  }

  openDialog(mensaje: string): void {
    this.dialog.open(DialogComponent, {
     data: { message: mensaje },
   });
 }

}
