import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';
import { Company } from '../company.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  message: String;

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
  }

  login():void{
    this.service.login(this.username, this.password).subscribe((user: User)=>{
      if(user[0]){
        if(user[0].type=='farmer') {
          localStorage.setItem('user', user[0].username);
          localStorage.setItem('user_type', user[0].type);
          localStorage.setItem('password', user[0].password);
    
          this.service.startTimer();

          this.router.navigate(['/farmer']);
        }
        else
          if(user[0].type=='company') {
            const data = {
              username : user[0].username
            }
            
            this.service.find_company(data).subscribe((company: Company)=>{
              localStorage.setItem('user', user[0].username);
              localStorage.setItem('password', user[0].password);
              localStorage.setItem('company_name', company[0].company_name);
              
              this.router.navigate(['/company']);
            });
          }
          else if(user[0].type=='admin') {
            localStorage.setItem('user', 'admin');
            localStorage.setItem('password', user[0].password);
            this.router.navigate(['/admin']);}
      }
      else{
        this.message = "User does not exist!";
      }
     
    })
  }

  

}
