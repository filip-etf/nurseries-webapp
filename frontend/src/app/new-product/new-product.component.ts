import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Preparation } from '../preparation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }
  
  message: String;
  user_data: String;
  company_name: String;
  type: String = 'seedling';
  preparations: Preparation[];

  //Middle data
  product_name: String;
  available_quantity: String;
  unit_price: String;


  //Seedling data
  preparation: string;
  seed_preparations: Array<{name: string}> = [];
  growing_time: String;


  //Preparation data
  accelerating_time: String;

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.company_name = localStorage.getItem('company_name');
    this.load_preparations();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  new_Password(){
    this.router.navigate(['../new-password']);
  }

  load_preparations(){
    this.service.load_preparations().subscribe(res=>{
      this.preparations = JSON.parse(JSON.stringify(res));
      
      // console.log(this.preparations);
    });
  }

  add_prepartion(){
    this.seed_preparations.push({name: this.preparation});

    this.message = 'Preparation "' + this.preparation + '" added.';

    // console.log(this.seed_preparations);
  }

  add_product(){
    if(this.type == 'seedling'){
      const data = {
        name: this.product_name,
        username: this.user_data,
        producer_name: this.company_name,
        growing_time: this.growing_time,
        available_quantity: this.available_quantity,
        unit_price: this.unit_price,
        preparations: this.seed_preparations,
        type: 'seedling'
      };

      this.service.new_seedling(data).subscribe(res=>{
        
        //console.log(this.products_requests);
      });
    } else{
      const data = {
        name: this.product_name,
        username: this.user_data,
        producer_name: this.company_name,
        accelerating_time: this.accelerating_time,
        available_quantity: this.available_quantity,
        unit_price: this.unit_price,
        type: 'preparation'
      };

      this.service.new_preparation(data).subscribe(res=>{
        
        //console.log(this.products_requests);
      });
    }

    this.router.navigate(['../company']);
  }
}
