import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: UsersService, private route: ActivatedRoute) { }

  isAdmin: Boolean;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {this.type = params.type});
    
    if (this.type == 'farmer'){
      this.farmer = false;
      this.company = true;
    } else{
      this.farmer = true;
      this.company = false;
    }

    if(localStorage.getItem('user') == 'admin'){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  company: Boolean;
  farmer: Boolean;
  type: String;
  message: String;

  //Mutual details
  password: String;
  password_conf: String;
  mail: String;
  date: Date;
  city: String;

  //Farmer details
  firstname: String;
  lastname: String;
  username: String;
  phone: String;

  //Company details
  company_name: String;
  company_acronym: String;

  register():void{

    if(this.password != this.password_conf){
      this.message = "Password is not confirmed!";
      return;
    }

    const data = {
      company_name: this.company_name,
      company_acronym: this.company_acronym,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      date: this.date,
      location: this.city,
      phone: this.phone,
      mail: this.mail,
      type: this.type
    };
    
    this.service.register(data).subscribe(user=>{
      if(user['user']=='ok'){
        this.message='OK';
      }
    })
    
    // console.log(data);
    this.router.navigate(['..']);
  }

  admin_register(){
    if(this.password != this.password_conf){
      this.message = "Password is not confirmed!";
      return;
    }

    if(this.type == 'farmer'){
      const farmer = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password,
        birthday_date: this.date.toString().substring(0,10),
        birthday_city: this.city,
        phone: this.phone,
        mail: this.mail, 
        time: new Date()
      }

      // console.log(this.date.toString().substring(0,10));

      const user = {
        username: this.username,
        password: this.password,
        type: 'farmer'
      }

      this.service.add_farmer(farmer).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });

      this.service.add_user(user).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });

    } else{
      let delivers: Array<{firstname:String, status:String, deliver_time:String, request: {farmer: String, nursery: String}}> = [];

      delivers.push({firstname:"Deliver_1", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_2", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_3", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_4", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_5", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});

      const company = {
        company_name: this.company_name,
        company_acronym: this.company_acronym,
        password: this.password,
        foundation_date: this.date.toString().substring(0,10),
        location: this.city,
        mail: this.mail,
        delivers: delivers,
        company: this.company_acronym
      }

      const user = {
        username: this.company_acronym,
        password: this.password,
        type: 'company'
      }

      this.service.add_company(company).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });

      this.service.add_user(user).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });

    }

    this.router.navigate(['/admin']);
  }

}
