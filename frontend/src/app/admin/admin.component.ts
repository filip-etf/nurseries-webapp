import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Request } from '../request.model';
import { Farmer } from '../farmer.model';
import { Company } from '../company.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  requests: Request[];
  farmers: Farmer[];
  companies: Company[];
  message: String;
  edit_user: String;

  //Edit data COMPANY
  edit_company_acronym: String;
  edit_company_name: String;
  edit_company_password: String;
  edit_company_date: Date;
  edit_company_location: String;
  edit_company_mail: String;

  //Edit data FAMER
  edit_farmer_username: String;
  edit_farmer_firstname: String;
  edit_farmer_lastname: String;
  edit_farmer_password: String;
  edit_farmer_phone: String;
  edit_farmer_birthday_date: Date;
  edit_farmer_birthday_place: String;
  edit_farmer_mail: String;

  //f: Farmer = {firstname:null, lastname:null, username:null, password:null, birthday_date:null, birthday_city:null, phone:null, mail:null};

  ngOnInit() {
    this.load_requests();
    this.load_users();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  new_Password(){
    this.router.navigate(['../new-password']);
  }

  load_requests(){
    this.service.load_requests().subscribe(res=>{
      // console.log(requests);
      this.requests = JSON.parse(JSON.stringify(res));
    });
  }

  load_users(){
    this.service.load_farmers().subscribe(res=>{
      // console.log(requests);
      this.farmers = JSON.parse(JSON.stringify(res));
    });

    this.service.load_companies().subscribe(res=>{
      // console.log(requests);
      this.companies = JSON.parse(JSON.stringify(res));
    });
  }

  add_farmer(){
    this.router.navigate(['register'], {queryParams: {type: 'farmer'}});
  }

  add_company(){
    this.router.navigate(['register'], {queryParams: {type: 'company'}});
  }

  accept_request(username, acronym, type){
    if(type == 'farmer'){

      for(let r of this.requests)
        if(r.username ==  username){
          const farmer = {
            firstname: r.firstname,
            lastname: r.lastname,
            username: r.username,
            password: r.password,
            birthday_date: r.date,
            birthday_city: r.location,
            phone: r.phone,
            mail: r.mail, 
            time: new Date()
          }

          const user = {
            username: r.username,
            password: r.password,
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

          this.service.remove_request(username).subscribe(user=>{
            if(user['user']=='ok'){
              this.message='OK';
            }
          });
        }
    }
    else if (type == 'company'){
      // console.log(company);
      let delivers: Array<{firstname:String, status:String, deliver_time:String, request: {farmer: String, nursery: String}}> = [];

      delivers.push({firstname:"Deliver_1", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_2", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_3", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_4", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});
      delivers.push({firstname:"Deliver_5", status:"available", deliver_time:"", request: {farmer: "", nursery: ""}});

      for(let r of this.requests)
        if(r.company_acronym ==  acronym){
          const company = {
            company_name: r.company_name,
            company_acronym: r.company_acronym,
            password: r.password,
            foundation_date: r.date,
            location: r.location,
            mail: r.mail,
            delivers: delivers,
            company: r.company_acronym
          }

          // console.log(company);
          this.service.add_company(company).subscribe(user=>{
            if(user['user']=='ok'){
              this.message='OK';
            }
          });

          const user = {
            username: r.company_acronym,
            password: r.password,
            type: 'company'
          }

          this.service.add_user(user).subscribe(user=>{
            if(user['user']=='ok'){
              this.message='OK';
            }
          });

          this.service.remove_request(acronym).subscribe(user=>{
            if(user['user']=='ok'){
              this.message='OK';
            }
          });
        }
    }

    location.reload();
  }

  refuse_request(username, acronym, type){
    if(type == 'farmer'){
      this.service.remove_request(username).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });
    }
    else if(type == 'company'){
      this.service.remove_request(acronym).subscribe(user=>{
        if(user['user']=='ok'){
          this.message='OK';
        }
      });
    }

    location.reload();
  }

  edit_company(company_name, company_acronym, password, foundation_date, location, mail){
    this.edit_user = company_acronym;
    
    this.edit_company_acronym = company_acronym;
    this.edit_company_name = company_name;
    this.edit_company_password = password;
    this.edit_company_date = foundation_date;
    this.edit_company_location = location;
    this.edit_company_mail = mail;
  }

  save_company(){
    //Sacuvati u bazu
    console.log('Save company');
    
    this.service.update_company(this.edit_user, this.edit_company_name, this.edit_company_acronym, this.edit_company_password, this.edit_company_date, this.edit_company_location, this.edit_company_mail).subscribe(user=>{
      if(user['user']=='ok'){
        this.message='OK';
      }
    });

    location.reload();
  }

  edit_farmer(firstname, lastname, username, password, date, place, phone, mail){
    this.edit_user = username;

    this.edit_farmer_username = username;
    this.edit_farmer_firstname = firstname;
    this.edit_farmer_lastname = lastname;
    this.edit_company_password = password;
    this.edit_farmer_birthday_date = date;
    this.edit_farmer_birthday_place = place;
    this.edit_farmer_phone = phone;
    this.edit_farmer_mail = mail;
  }

  save_farmer(){
    //Sacuvati u bazu
    console.log('Save farmer');
    
    this.service.update_farmer(this.edit_user, this.edit_farmer_firstname, this.edit_farmer_lastname, this.edit_farmer_username, this.edit_company_password, this.edit_farmer_birthday_date, this.edit_farmer_birthday_place, this.edit_farmer_phone, this.edit_farmer_mail).subscribe(user=>{
      if(user['user']=='ok'){
        this.message='OK';
      }
    });

    location.reload();
  }

  delete(username){
    this.service.delete_user(username).subscribe(user=>{
      if(user['user']=='ok'){
        this.message='OK';
      }
    });

    location.reload();
  }

}
