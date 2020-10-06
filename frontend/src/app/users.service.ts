import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri='http://localhost:4000'
  app: AppComponent = null;

  constructor(private http: HttpClient) { }

  setApp(app:AppComponent){
    this.app = app;
  }

  //=======================LOGIN=======================//

  login(username, password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  find_company(data){
    return this.http.post(`${this.uri}/find_company`, data);
  }

  startTimer(){
    this.app.TimerUpdate();
  }

  load_update(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/load_update`, data);
  }

  timer_update(data){
    return this.http.post(`${this.uri}/timer_update`, data);
  }

  //=======================REGISTER=======================//

  register(data){
    return this.http.post(`${this.uri}/register`, data);
  }

  //=======================NEW PASSWORD=======================//

  change_password(username, password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/change_password`, data);
  }

  //=======================ADMIN=======================//

  load_requests(){
    return this.http.post(`${this.uri}/load_requests`, null);
  }

  load_companies(){
    return this.http.post(`${this.uri}/load_companies`, null);
  }

  load_farmers(){
    return this.http.post(`${this.uri}/load_farmers`, null);
  }

  add_farmer(farmer){
    return this.http.post(`${this.uri}/add_farmer`, farmer);
  }

  add_company(company){
    return this.http.post(`${this.uri}/add_company`, company);
  }

  add_user(user){
    return this.http.post(`${this.uri}/add_user`, user);
  }

  remove_request(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/remove_request`, data);
  }

  delete_user(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/delete_user`, data);
  }

  update_company(user, company_name, company_acronym, password, foundation_date, location, mail){
    const data = {
      user_username: user,
      company_name: company_name,
      company_acronym: company_acronym,
      password: password,
      foundation_date: foundation_date,
      location: location,
      mail: mail
    };

    return this.http.post(`${this.uri}/update_company`, data);
  }

  update_farmer(user, firstname, lastname, username, password, birthday_date, birthday_place, phone, mail){
    const data = {
      user_username: user,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      birthday_date: birthday_date,
      birthday_place: birthday_place,
      phone: phone,
      mail: mail
    };

    return this.http.post(`${this.uri}/update_farmer`, data);
  }

  //=======================COMPANY=======================//

  load_product_requests(data){
    return this.http.post(`${this.uri}/load_product_requests`, data);
  }

  load_product_base(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/load_product_base`, data);
  }

  load_delivers(company){
    const data = {
      company: company
    };

    return this.http.post(`${this.uri}/load_delivers`, data);
  }

  load_seedling(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/load_seedling`, data);
  }

  load_preparation(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/load_preparation`, data);
  }

  load_preparations(){
    return this.http.post(`${this.uri}/load_preparations`, null);
  }
  
  load_comments(name, company){
    const data = {
      product_name: name,
      company: company
    }
    return this.http.post(`${this.uri}/load_comments`, data);
  }

  new_seedling(data){
    console.log(data);

    return this.http.post(`${this.uri}/new_seedling`, data);
  }

  new_preparation(data){
    console.log(data);

    return this.http.post(`${this.uri}/new_preparation`, data);
  }

  delete_request(data){
    return this.http.post(`${this.uri}/delete_request`, data);
  }

  delete_product(name){
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/delete_product`, data);
  }

  update_request_status(data){
    return this.http.post(`${this.uri}/update_request_status`, data);
  }

  update_deliver(data){
    return this.http.post(`${this.uri}/update_deliver`, data);
  }

  load_business_report(data){
    return this.http.post(`${this.uri}/load_business_report`, data);
  }

  //=======================FARMER=======================//

  load_nurseries(farmer){
    const data = {
      farmer: farmer
    }

    return this.http.post(`${this.uri}/load_nursery`, data);
  }

  find_nursery(data){
    return this.http.post(`${this.uri}/find_nursery`, data);
  }

  add_nursery(data){
    return this.http.post(`${this.uri}/add_nursery`, data);
  }

  update_nursery(data){
    return this.http.post(`${this.uri}/update_nursery`, data);
  }

  load_stockroom(farmer, nursery){
    const data = {
      farmer: farmer,
      nursery: nursery
    }

    return this.http.post(`${this.uri}/load_stockroom`, data);
  }

  load_farmer_stockrooms(farmer){
    const data = {
      farmer: farmer
    }

    return this.http.post(`${this.uri}/load_farmer_stockrooms`, data);
  }

  load_product_shop(){
    return this.http.post(`${this.uri}/load_product_shop`, null);
  }

  add_comment(data){
    return this.http.post(`${this.uri}/add_comment`, data);
  }

  add_product_request(data){
    return this.http.post(`${this.uri}/add_product_request`, data);
  }

  update_items_stockroom(data){
    return this.http.post(`${this.uri}/update_items_stockroom`, data);
  }

  find_product_request(data){
    return this.http.post(`${this.uri}/find_product_request`, data);
  }

}