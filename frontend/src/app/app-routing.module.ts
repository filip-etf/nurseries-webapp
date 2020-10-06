import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'new-password', component: NewPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'farmer', component: FarmerComponent},
  {path: 'add-nursery', component: AddNurseryComponent},
  {path: 'online-shop', component: OnlineShopComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'nursery-details', component: NurseryDetailsComponent},
  {path: 'seedling-details', component: SeedlingDetailsComponent},
  {path: 'stockroom', component: StockroomComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', component: LoginComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
