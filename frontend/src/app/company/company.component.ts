import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Product_request } from '../product_request.model';
import { Products } from '../products.model'
import { Deliver } from '../delivers.model';
import { Item } from '../item.model';
import { Business_report } from '../business_report.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  message: String;
  user_data: String;
  company_name: String;
  products_requests: Product_request[];
  products: Products[];
  // delivers: Array<{name:String, status:String, busy_time:String}> = [];
  delivers: Deliver;
  items: Item[];
  status: String;
  business_reports: Business_report[];
  total_number_orders: Number = new Number(0);
  date : Date;
  diff_days : number;

  ngOnInit() {
    this.user_data = localStorage.getItem('user');
    this.company_name = localStorage.getItem('company_name');

    this.load_product_requests();
    this.load_product_base();
    this.load_delivers();
    this.load_business_report();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['..']);
  }

  new_Password(){
    this.router.navigate(['../new-password']);
  }

  add_product(){
    this.router.navigate(['../new-product']);
  }

  load_product_requests(){
    const data = {
      company: this.company_name
    }

    this.service.load_product_requests(data).subscribe(res=>{
      this.products_requests = JSON.parse(JSON.stringify(res));

      //console.log(this.products_requests);
    });
  }

  load_product_base(){
    this.service.load_product_base(this.user_data).subscribe(res=>{
      this.products = JSON.parse(JSON.stringify(res));

      //console.log(this.products_requests);
    });
  }

  load_delivers(){
    this.service.load_delivers(this.user_data).subscribe(res=>{
      this.delivers = JSON.parse(JSON.stringify(res[0]));

      // console.log(this.delivers);
    });
  }

  load_items(farmer, nursery, product_array){
    this.service.load_stockroom(farmer, nursery).subscribe(res=>{
      // console.log(farmer);
      // console.log(nursery);

      this.items = JSON.parse(JSON.stringify(res[0].items));

      for(let product of product_array){
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
        farmer: farmer,
        nursery: nursery,
        items: this.items,
      }

      // console.log(this.items);
      this.service.update_items_stockroom(data).subscribe(user=>{
        location.reload();
      });
    });
  }

  load_business_report(){
    this.date = new Date();
    this.date.setDate(this.date.getDate() - 30);

    const data = {
      company: this.user_data,
      date: this.date
    }

    this.service.load_business_report(data).subscribe(res=>{
      this.business_reports = JSON.parse(JSON.stringify(res));

      for(let report of this.business_reports){
        this.total_number_orders = Number(this.total_number_orders) + Number(report.orders.length);
      }

      // console.log(this.business_reports);

      // this.diff_days = Math.ceil(Math.abs(this.date.valueOf() - (new Date(this.business_reports[0].day).valueOf())) / (1000 * 3600 * 24));
      // console.log(this.diff_days);
    });
  }

  accept_request(farmer, nursery){
    const data = {
      farmer: farmer,
      company: this.company_name,
      nursery: nursery,
      status: 'delivering'
    }

    this.hire_deliver(farmer, nursery);

    this.service.update_request_status(data).subscribe(res=>{
      if(res['res']=='ok'){
        this.message='OK';
      }

      location.reload();
    });
  }

  refuse_request(username, nursery, producer, product_array){
    const data = {
      farmer: username,
      nursery: nursery,
      producer: producer
    }

    this.service.delete_request(data).subscribe(res=>{

      this.load_items(username, nursery, product_array);
    });
  }

  change_status(farmer, nursery){
    const data = {
      farmer: farmer,
      company: this.company_name,
      nursery: nursery,
      status: this.status
    }

    if(this.status == 'delivering')
      this.hire_deliver(farmer, nursery);

    if(this.status == 'delivered')
      this.release_deliver(farmer, nursery);

    this.service.update_request_status(data).subscribe(res=>{
      if(res['res']=='ok'){
        this.message='OK';
      }

      location.reload();
    });
  }

  hire_deliver(farmer, nursery){
    for(let deliver of this.delivers.delivers){
      if(deliver.status == 'available'){
        deliver.status = 'busy';
        deliver.request.farmer = farmer;
        deliver.request.nursery = nursery;
  
        let date = new Date();
        date.setHours(this.date.getHours() + 2);

        deliver.deliver_time = date;

        const data = {
          company: this.delivers.company,
          delivers: this.delivers.delivers
        }

        this.service.update_deliver(data).subscribe(res=>{
          if(res['res']=='ok'){
            this.message='OK';
          }
        });

        break;
      }
    }
  }

  release_deliver(farmer, nursery){
    for(let deliver of this.delivers.delivers){
      if(deliver.request.farmer == farmer && deliver.request.nursery == nursery){
        deliver.status = 'available';
        deliver.request.farmer = '';
        deliver.request.nursery = '';
        deliver.deliver_time = null;

        const data = {
          company: this.delivers.company,
          delivers: this.delivers.delivers
        }

        this.service.update_deliver(data).subscribe(res=>{
          if(res['res']=='ok'){
            this.message='OK';
          }
        });

        break;
      }
    }
  }

  product_details(name, type, producer){
    localStorage.setItem('product_name', name);
    localStorage.setItem('product_type', type);
    localStorage.setItem('producer_name', producer);
    this.router.navigate(['product-details']);
  }

  delete_product(name){
    this.service.delete_product(name).subscribe(res=>{
      if(res['res']=='ok'){
        this.message='OK';
      }
    });

    location.reload();
  }

  date_sort(){
   this.products_requests.sort(this.sortByDate); 
  }

  sortByDate(p1, p2){
    if((new Date(p1.filing_date).valueOf()) > (new Date(p2.filing_date).valueOf()))
      return 1;
    else
      return -1;
  }

  delivers_init(){
    // this.delivers.push({name:"Filip", status:"Available", busy_time:"0"});

  }
}
