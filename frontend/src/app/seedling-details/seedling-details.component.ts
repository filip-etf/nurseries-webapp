import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { Item } from '../item.model';
import { Nursery } from '../nursery.model';

@Component({
  selector: 'app-seedling-details',
  templateUrl: './seedling-details.component.html',
  styleUrls: ['./seedling-details.component.css']
})
export class SeedlingDetailsComponent implements OnInit {

  constructor(private router: Router, private service: UsersService, private route: ActivatedRoute) { }

  user_data: String;
  nursery_data: String;
  nursery: Nursery;
  available_preparations: Array<String> = [];
  items: Item[];
  params: any;
  width: string;
  height: string;
  seedling_data: any;
  preparation: String;

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.nursery_data = localStorage.getItem('nursery');
    this.route.queryParams.subscribe((params) => {this.width = params.width; this.height = params.height});
    this.load_items();
    this.load_seedling();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  load_items(){
    this.service.load_stockroom(this.user_data, this.nursery_data).subscribe(res=>{
      this.items = JSON.parse(JSON.stringify(res[0].items));
      
      for(let item of this.items){
        if(item.available && item.type == "preparation")
          this.available_preparations.push(item.name);
      }

      // console.log(this.available_seedlings);
    });
  }

  load_seedling(){
    const data = {
      farmer: this.user_data,
      nursery: this.nursery_data
    }

    this.service.find_nursery(data).subscribe(res=>{
      this.nursery = JSON.parse(JSON.stringify(res[0]));
      
      for(let plant of this.nursery.plants){
        if(plant.height == this.height && plant.width == this.width){
          this.seedling_data = plant;
          break;
        }
      }

      // console.log(this.nursery);
    });
  }

  add_preparation(){
    for(let item of this.items){
      if(item.name == this.preparation){
        for(let plant of this.nursery.plants){
          if(plant.height == this.height && plant.width == this.width){
            plant.growing_time = (Number(plant.growing_time) - Number(item.time)).toString();

            if(Number(plant.growing_time) < 0)
              plant.growing_time = '0';

            this.update_nursery();
            break;
          }
        }   
        break;
      }
    }

    this.router.navigate(['../nursery-details']);
  }

  update_nursery(){
    const data = {
      nursery: this.nursery
    }

    this.service.update_nursery(data).subscribe(res=>{

    });
  }
}
