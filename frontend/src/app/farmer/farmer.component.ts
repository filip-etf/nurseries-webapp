import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Nursery } from '../nursery.model';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  user_data: String;
  nurseries: Nursery[];

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.load_nurseries();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  new_Password(){
    this.router.navigate(['../new-password']);
  }

  load_nurseries(){
    this.service.load_nurseries(this.user_data).subscribe(res=>{
      this.nurseries = JSON.parse(JSON.stringify(res));
      
      // console.log(this.nurseries);
    });
  }

  view_nursery(name, location){
    localStorage.setItem('nursery', name);
    localStorage.setItem('nursery_location', location);
    this.router.navigate(['../nursery-details']);
  }

  add_nursery(){
    this.router.navigate(['../add-nursery']);
  }

}
