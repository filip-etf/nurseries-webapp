import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { Nursery } from './nursery.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontApp';
  timer;
  nurseries: Nursery[];
  last_update: Date;
  hours_delay: String;

  constructor(private service: UsersService) { 
    service.setApp(this);
  }

  ngOnInit() {
    if(localStorage.getItem('user_type') == 'farmer'){
      this.TimerUpdate();
    }
  }

  TimerUpdate(){
    this.load_nurseries();
    this.load_update();

    let app = this;

    this.timer = setInterval(this.update_nurseries_timer, 3600000, app);
  }

  StopTimer(){
    console.log('stop');
    clearInterval(this.timer);
  }

  load_nurseries(){
    this.service.load_nurseries(localStorage.getItem('user')).subscribe(res=>{
      this.nurseries = JSON.parse(JSON.stringify(res));
      
      // console.log(this.nurseries);
    });
  }

  load_update(){
    this.service.load_update(localStorage.getItem('user')).subscribe(res=>{
      this.last_update = JSON.parse(JSON.stringify(res[0].time));

      let delay = Math.abs((new Date()).valueOf() - (new Date(this.last_update).valueOf())) / (1000 * 3600);

      //Ako je manje od 1 pretpostavljam da je uradio refresh
      //Kada je jednak 1 prosao je jedan sat od poslednjeg update
      if(delay > 1)
        this.hours_delay = (Math.ceil(delay)).toString();
      else 
        this.hours_delay = '0';

      console.log('Befor ' + this.hours_delay + ' hours was last update!');
      this.update_nurseries();
    });
  }

  update_nurseries(){
    for(let nursery of this.nurseries){
      nursery.temperature = (Number(nursery.temperature) + Number(this.hours_delay) * 0.5).toString();
      nursery.water = (Number(nursery.water) - Number(this.hours_delay)).toString();

      this.update_nursery(nursery);
    }

    this.update_set_time();

    console.log(this.nurseries);
  }

  update_nurseries_timer(app){
    app.service.load_nurseries(localStorage.getItem('user')).subscribe(res=>{
      app.nurseries = JSON.parse(JSON.stringify(res));
      
      for(let nursery of app.nurseries){
        nursery.temperature = (Number(nursery.temperature) + Number(0.5)).toString();
        nursery.water = (Number(nursery.water) - Number(1)).toString();

        this.update_nursery(nursery);
      }

      this.update_set_time();

      console.log(app.nurseries);
    });
  }

  update_nursery(nursery){
    const data = {
      nursery: nursery
    }

    // this.service.update_nursery(data).subscribe(res=>{
    //   console.log('Updated - ' + nursery.name)
    // });
  }

  update_set_time(){
    const data = {
      time: new Date(),
      username: localStorage.getItem('user')
    }

    // this.service.timer_update(data).subscribe(res=>{
    //     console.log('Updated time!')
    // });
  }
}
