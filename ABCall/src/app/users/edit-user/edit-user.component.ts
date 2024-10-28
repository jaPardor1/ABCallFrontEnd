import { Component, OnInit } from '@angular/core';
import { UserDto } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
   sub:string | null='' ;
   constructor(private activatedRoute: ActivatedRoute, private userService:UserService){

   }
  ngOnInit(): void {
    debugger;
     this.sub = this.activatedRoute.snapshot.paramMap.get('sub');
  }




}
