import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeComponent } from './BackOffice/home/home.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { LoginComponent } from './login/login.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './register/register.component';
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { EditprofileComponent } from './features/admin/editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

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
    path: "",
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
    path: "edit",
    component: EditProfileComponent
    
  },
  {
    path: "register",
    component: RegisterComponent
    
  },{
    path: "getall",
    component: UsergetallComponent
    
  },
  {
    path: "edite-profile",
    component:EditprofileComponent
  },
  {
    path: "forgotpassword",
    component:ForgotpasswordComponent
  },
  {
    path: "resetpassword",
    component: ResetpasswordComponent
  
  },
  {
    path: "verifemail",
    component: VerifEmailComponent
    
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
