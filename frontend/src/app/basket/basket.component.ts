import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Product_request } from '../product_request.model';
import { StockroomComponent } from '../stockroom/stockroom.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  user_data: String;
  date: string;
  basket: Product_request;

  stockroom: StockroomComponent;
  nursery_data: string;

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.nursery_data = localStorage.getItem('nursery');
    this.basket = JSON.parse(localStorage.getItem('basket'));

    this.load_stockroom();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  buy_items(){
    this.date = new Date().getFullYear().toString() + "-" + new Date().getMonth().toString() + "-" + new Date().getDate().toString();

    this.basket.filing_date = this.date;
    this.basket.nursery_name = this.nursery_data;

    this.service.add_product_request(this.basket).subscribe(user=>{
      this.add_items_stockroom();
    });

    // console.log(this.basket);
  }

  add_items_stockroom(){
    for(let product of this.basket.product_array){
      this.stockroom.items.push({name: product.name, producer:this.basket.producer, quantity: product.quantity, available: false, type: product.type, time: product.time});
    }

    this.service.update_items_stockroom(this.stockroom).subscribe(user=>{
      localStorage.removeItem('basket');
      this.router.navigate(['../online-shop']);
    });

    // console.log(this.stockroom.items);
  }

  load_stockroom(){
    this.service.load_stockroom(this.user_data, this.nursery_data).subscribe(res=>{
      this.stockroom = JSON.parse(JSON.stringify(res[0]));

      // console.log(this.stockroom.items);
    });
  }
}
