import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Product_shop } from '../product_shop.model';
import { Product_request } from '../product_request.model';

@Component({
  selector: 'app-online-shop',
  templateUrl: './online-shop.component.html',
  styleUrls: ['./online-shop.component.css']
})
export class OnlineShopComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  items : Product_shop[];
  items_original : Product_shop[];
  filter_data: string;
  index : number;

  //Item data for Basket
  quantity: Array<string> = [];
  basket: Product_request = {username: null, product_array: null, producer:null, location: null, nursery_name:null, filing_date: null, status: null};
  product_array: Array<{'type': string, 'name': string, 'quantity': string, 'time': string}> = [];
  
  message: string;

  ngOnInit() {
    this.load_product();

    if(localStorage.getItem('basket') != null){
      this.basket = JSON.parse(localStorage.getItem('basket'));
    } 
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  view_basket(){
    localStorage.setItem('basket', JSON.stringify(this.basket));
    // console.log(localStorage.getItem('basket'));

    this.router.navigate(['../basket']);
  }

  load_product(){
    this.service.load_product_shop().subscribe(res=>{
      this.items = JSON.parse(JSON.stringify(res));
      this.items_original = JSON.parse(JSON.stringify(res));
      // console.log(this.items);
    });
  }
  
  product_details(name, type, producer){
    localStorage.setItem('product_name', name);
    localStorage.setItem('product_type', type);
    localStorage.setItem('producer_name', producer);
    this.router.navigate(['product-details']);
  }

  add_basket(name, type, producer_name, accelerating_time, growing_time){
    for(let item of this.items){
      if(item.name == name && item.type == type && item.producer_name == producer_name)
        this.index = this.items.indexOf(item);
    }

    if(this.basket.product_array == null){

      if(accelerating_time == undefined)
        this.product_array.push({type: type, name:name, quantity: this.quantity[this.index], time: growing_time});
      else
        this.product_array.push({type: type, name:name, quantity: this.quantity[this.index], time: accelerating_time});

      this.basket.product_array = this.product_array;
      this.basket.location = localStorage.getItem('nursery_location');
      this.basket.username = localStorage.getItem('user');
      this.basket.producer = producer_name;
      this.basket.status = "non_delivered";
    }else{
      if(accelerating_time == undefined)
        this.basket.product_array.push({type: type, name:name, quantity: this.quantity[this.index], time: growing_time});
      else 
        this.basket.product_array.push({type: type, name:name, quantity: this.quantity[this.index], time: accelerating_time});
    }
    
    this.message = "Name => " + name + ", Quantity => " + this.quantity[this.index] + " added to basket";
    // console.log(this.basket);
  }

  view_nursery(){
    this.router.navigate(['../nursery-details']);
  }

  product_search(){
    this.items = this.items.filter(item => {
      return item.name.toLowerCase().includes(this.filter_data);
    });
  }

  reset(){
    this.items = this.items_original;
  }
}
