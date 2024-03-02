import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeComponent } from './BackOffice/home/home.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { LoginComponent } from './login/login.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      }
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
    
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
