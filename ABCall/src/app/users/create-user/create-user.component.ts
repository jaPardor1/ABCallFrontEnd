import { Component, inject } from '@angular/core';
import { UserDto } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService, private router: Router, private translate: TranslateService) {}

  createUser(userInfo: UserDto) {
    if (userInfo.cognito_user_sub !== undefined) {
      this.userService.createUser(userInfo).subscribe(
        (response: any) => {
          console.log(response.cognito_user_sub);
          const message = this.translate.instant('createUserModule.userCreated') + response.cognito_user_sub;
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
      this.router.navigate(['/listUsers']);
    });
  }
}
