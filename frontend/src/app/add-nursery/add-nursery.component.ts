import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-nursery',
  templateUrl: './add-nursery.component.html',
  styleUrls: ['./add-nursery.component.css']
})
export class AddNurseryComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  name: String;
  location: String;
  width: String;
  height: String;
  
  message: String;

  ngOnInit() {

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  register_nursery(){
    const data = {
      farmer: localStorage.getItem('user'),
      name: this.name,
      location: this.location,
      width: this.width,
      height: this.height,
      temperature: "18",
      water: "200",
      plants: new Array,
      nursery: this.name,
      items: new Array
    }

    // console.log(data);

    this.service.add_nursery(data).subscribe(res=>{
      if(res['res']=='ok'){
        this.message='OK';
      }

      this.router.navigate(['../farmer']);
    });
  }

}
