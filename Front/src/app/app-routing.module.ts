import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeComponent } from './BackOffice/home/home.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { LoginComponent } from './login/login.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './register/register.component';
import { MarketComponent } from './market/market.component';
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "addproduct",
        component:AddproductComponent
        
      },
      {
        path: "product",
        component:ProductComponent
        
      },

    ]
  },
  {
    path: "acceuil",
    component: AllTemplateFrontComponent,
    children: [
      {
        path: "",
        component: HomeFrontComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
    
  },
  {
    path: "register",
    component: RegisterComponent
    
  },
  {
    path: "market",
    component:MarketComponent
    
  },
  {
    path: "getall",
    component:UsergetallComponent
    
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
