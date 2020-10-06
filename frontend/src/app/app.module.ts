import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UsersService } from './users.service';

import {HttpClientModule} from '@angular/common/http';
import { FarmerComponent } from './farmer/farmer.component';
import { CompanyComponent } from './company/company.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AddNurseryComponent } from './add-nursery/add-nursery.component';
import { OnlineShopComponent } from './online-shop/online-shop.component';
import { NurseryDetailsComponent } from './nursery-details/nursery-details.component';
import { StockroomComponent } from './stockroom/stockroom.component';
import { BasketComponent } from './basket/basket.component';
import { SeedlingDetailsComponent } from './seedling-details/seedling-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    FarmerComponent,
    CompanyComponent,
    NewPasswordComponent,
    ProductDetailsComponent,
    NewProductComponent,
    AddNurseryComponent,
    OnlineShopComponent,
    NurseryDetailsComponent,
    StockroomComponent,
    BasketComponent,
    SeedlingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
