import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Item } from '../item.model';
import { Product_request } from '../product_request.model';

@Component({
  selector: 'app-stockroom',
  templateUrl: './stockroom.component.html',
  styleUrls: ['./stockroom.component.css']
})
export class StockroomComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  nursery_data: String;
  user_data: String;
  items: Item[];
  items_original: Item[];
  product_request: Product_request;
  sort_type: String;
  filter_data: String;

  ngOnInit() {
    this.nursery_data = localStorage.getItem("nursery");
    this.user_data = localStorage.getItem("user");
    this.load_items();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  load_items(){
    this.service.load_stockroom(this.user_data, this.nursery_data).subscribe(res=>{
      this.items = JSON.parse(JSON.stringify(res[0].items));
      this.items_original = JSON.parse(JSON.stringify(res[0].items));
      // this.items[0].available = false;
      // console.log(this.items[0].available);
    });
  }

  cancel(producer){
    const data = {
      producer: producer,
      nursery: this.nursery_data,
      farmer: this.user_data
    }

    this.service.find_product_request(data).subscribe(res=>{
      this.product_request = JSON.parse(JSON.stringify(res[0]));
      
      for(let product of this.product_request.product_array){
        for(let item of this.items){
          if(item.name == product.name && item.available == false){
            // console.log(item.name);
            // console.log(product.name);
            // console.log(this.items.indexOf(item));
            this.items.splice(this.items.indexOf(item), 1);
          }
        }
      }

      const data = {
        farmer: this.user_data,
        nursery: this.nursery_data,
        items: this.items,
        producer: producer
      }

      this.service.update_items_stockroom(data).subscribe(user=>{
        this.service.delete_request(data).subscribe(res=>{
          
        });
      });

      // console.log(data);
    });

    // console.log(data);
  }

  sort_select_type(){
    if(this.sort_type == 'product_name'){
      this.items.sort(this.sort_product_name);
    }
    else if(this.sort_type == 'producer_name'){
      this.items.sort(this.sort_producer_name);
    }else if(this.sort_type == 'quantity'){
      this.items.sort(this.sort_quantity);
    }else if(this.sort_type == 'available'){
      this.items.sort(this.sort_available);
    }
  }

  sort_product_name(p1: Item, p2: Item){
    if(p1.name >= p2.name)
      return 1;
    else 
      return -1;
  }

  sort_producer_name(p1: Item, p2: Item){
    if(p1.producer >= p2.producer)
      return 1;
    else 
      return -1;
  }

  sort_quantity(p1: Item, p2: Item){
    if(Number(p1.quantity) >= Number(p2.quantity))
      return 1;
    else 
      return -1;
  }

  sort_available(p1: Item, p2: Item){
    if(p1.available <= p2.available)
      return 1;
    else 
      return -1;
  }

  filter_sort(){
    if(this.sort_type == 'product_name'){
      this.items = this.items.filter(item => {
        return item.name.toLowerCase().includes(this.filter_data.toString());
      });
    }
    else if(this.sort_type == 'producer_name'){
      this.items = this.items.filter(item => {
        return item.producer.toLowerCase().includes(this.filter_data.toString());
      });
    }else if(this.sort_type == 'quantity'){
      this.items = this.items.filter(item => {
        return item.quantity.includes(this.filter_data.toString());
      });
    }
  }

  reset(){
    this.items = this.items_original;
  }
}
