import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Nursery } from '../nursery.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-nursery-details',
  templateUrl: './nursery-details.component.html',
  styleUrls: ['./nursery-details.component.css']
})
export class NurseryDetailsComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  user_data: String;
  nursery_data: String;
  nursery: Nursery;
  available_seedlings: Array<String> = [];
  items: Item[];

  date : Date = new Date();
  diff_days: Number;
  progress: String;

  //Add seedling
  width: string;
  height: string;
  name: string;
  message: string;

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.nursery_data = localStorage.getItem('nursery');
    this.load_nursery();
    this.load_items();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  view_stockroom(){
    this.router.navigate(['/stockroom']);
  }

  online_shop(){
    this.router.navigate(['../online-shop']);
  }

  view_farmer(){
    this.router.navigate(['../farmer']);
  }

  load_nursery(){
    const data = {
      farmer: this.user_data,
      nursery: this.nursery_data
    }

    this.service.find_nursery(data).subscribe(res=>{
      this.nursery = JSON.parse(JSON.stringify(res[0]));
      
      this.calculate_progress();

      console.log(this.nursery);
    });
  }

  load_items(){
    this.service.load_stockroom(this.user_data, this.nursery_data).subscribe(res=>{
      this.items = JSON.parse(JSON.stringify(res[0].items));
      
      for(let item of this.items){
        if(item.available && item.type == "seedling")
          this.available_seedlings.push(item.name);
      }

    });
  }

  view_seedling(width, height){
    
    this.router.navigate(['../seedling-details'], { queryParams: {width:width, height:height}});
  }

  update_nursery(){
    const data = {
      nursery: this.nursery
    }

    this.service.update_nursery(data).subscribe(res=>{

    });
  }

  add_seedling(){
    if(this.check_place()){
      for(let item of this.items){
        if(item.name == this.name){
          const data = {
            width: this.width,
            height: this.height,
            seedling_name: this.name,
            producer: item.producer,
            planted_date: new Date(),
            growing_time: item.time,
            progress: false
          }
      
          this.nursery.plants.push(data);
  
          this.update_nursery();
          break;
        }
      }

      this.message = '';
    }else{
      this.message = 'This place is already used!'
    }
  }

  check_place(){
    for(let plant of this.nursery.plants){
      if(plant.height == this.height && plant.width == this.width){
        return false;
      }
    }   

    return true;
  }

  show_progress(planted_date, growing_time){
    
    this.diff_days = Math.ceil(Math.abs(this.date.valueOf() - (new Date(planted_date).valueOf())) / (1000 * 3600 * 24));

    this.progress = this.diff_days + "/" + growing_time;
  }

  remove_seedling(width, height){
    for(let plant of this.nursery.plants){
      if(plant.height == height && plant.width == width){
        this.nursery.plants.splice(this.nursery.plants.indexOf(plant), 1);
        this.update_nursery();
        break;
      }
    }   
  }

  calculate_progress(){
    for(let plant of this.nursery.plants){
      if(Math.ceil(Math.abs(this.date.valueOf() - (new Date(plant.planted_date).valueOf())) / (1000 * 3600 * 24)) >= Number(plant.growing_time)){
        plant.progress = true;
      } else {
        plant.progress = false;
      }
    } 
  }
}
