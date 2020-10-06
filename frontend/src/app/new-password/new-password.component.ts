import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    
  }

  old_password: String;
  new_password: String;
  password_conf: String;
  message: String;

  save(){
    if(this.old_password == localStorage.getItem('password')){
      if(this.new_password == this.password_conf){
        this.service.change_password(localStorage.getItem('user'), this.new_password).subscribe(user=>{
          if(user['request']=='ok'){
            this.message='OK';
          }

          localStorage.clear();
          this.router.navigate(['..']);
        });
      } else {
        this.message = "Password is not confirmed!";
      }
    } else {
      this.message = "Password is incorrect!";
    }
  }

}