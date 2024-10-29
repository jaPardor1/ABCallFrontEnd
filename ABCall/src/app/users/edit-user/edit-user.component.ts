import { Component, inject, OnInit } from '@angular/core';
import { UserDto } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  sub: string | null = '';
  readonly dialog = inject(MatDialog);
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {

  }
  ngOnInit(): void {
    this.sub = this.activatedRoute.snapshot.paramMap.get('sub');
  }

  saveChanges(userInfo: UserDto) {

    if (userInfo.cognito_user_sub !== undefined) {
      console.log(userInfo);
      this.userService.editUserSub(userInfo).subscribe(
        (response) => {
          console.log(response);
          this.openDialog('La información ha sido actualizada.');
        },
        (error) => {

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
