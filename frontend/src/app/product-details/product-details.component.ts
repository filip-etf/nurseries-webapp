import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Comment } from '../comment.model';
import { Stockroom } from '../stockroom.model'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }
  
  producer: String;
  name: String;
  seedling: Boolean;
  product: any;
  comments: Comment[];
  stockrooms: Stockroom[];
  num_comments: number;
  avarage_rating: number;
  isComment: boolean;
  isPurchased: boolean = false;
  hideComment: boolean = false;

  //Comment data
  rating: String;
  describe: String;

  ngOnInit() {
    this.producer = localStorage.getItem('producer_name');
    this.name = localStorage.getItem('product_name');

    if(localStorage.getItem('product_type') == 'seedling') {
      this.seedling = true;
    }else {
      this.seedling = false;
    }

    this.load_product();
    this.load_comments();
  }
  
  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  new_Password(){
    this.router.navigate(['../new-password']);
  }

  load_product(){
    if(this.seedling){
      this.service.load_seedling(this.name).subscribe(res=>{
        this.product = JSON.parse(JSON.stringify(res));
        
        // console.log(this.product[0]);
      });
    }else {
      this.service.load_preparation(this.name).subscribe(res=>{
        this.product = JSON.parse(JSON.stringify(res));
        
        // console.log(this.product[0]);
      });
    }
  }

  load_stockrooms(){
    this.service.load_farmer_stockrooms(localStorage.getItem('user')).subscribe(res=>{
      this.stockrooms = JSON.parse(JSON.stringify(res));
      
      // console.log(this.comments);
      this.check_item_purchased();

      if(this.isPurchased){
        this.check_comment();
      } else {
        this.hideComment = true;
      }

      // console.log(this.isPurchased);
      // console.log(this.hideComment);
    });
  }

  load_comments(){
    this.service.load_comments(this.name, this.producer).subscribe(res=>{
      this.comments = JSON.parse(JSON.stringify(res));
      
      // console.log(this.comments);
      this.count_rating();
      this.load_stockrooms();
    });
  }

  count_rating(){
    let count: Number = Number(0);
    let sum: Number = Number(0);
    
    // console.log(this.comments);

    for(let comment of this.comments){
      count = Number(count) + Number(1);
      sum = Number(sum) + Number(comment.rating);
    }

    if(this.comments.length > 0)
      this.avarage_rating = Number(sum) / Number(count);
  }

  check_comment(){
    for(let comment of this.comments){
      if(comment.username == localStorage.getItem('user')){
        this.hideComment = true;
      }
    }
  }

  check_item_purchased(){
    // console.log(this.stockrooms);
    
    for(let stockroom of this.stockrooms){
      for(let item of stockroom.items){
        // console.log(item.name);
        if(item.name == this.name && item.available == true){
          this.isPurchased = true;
        }
      }
    }

    // console.log(this.isPurchased);
  }

  add_comment(){
    const data = {
      username: localStorage.getItem('user'),
      rating: this.rating,
      product_name: this.name,
      company: this.producer,
      describe: this.describe
    }
    
    // console.log(data);
    this.service.add_comment(data).subscribe(user=>{
      location.reload();
    });
  }

}
