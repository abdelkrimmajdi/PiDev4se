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
import { Error404ComponentComponent } from './error404-component/error404-component.component';
import { AuthAdminService } from './guards/admin/auth-admin.service';
import { AuthUserService } from './guards/user/auth-user.service';
import { AuthNutririonisteService } from './guards/Nutritioniste/auth-nutririoniste.service';

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
        path: "edite-profile",
        component: EditprofileComponent
      },
      {
        path: "getall",
        component: UsergetallComponent,
      
      }
    ]
  },
  
   
 
  { path: 'resetpassword/:passwordResetToken',component:ResetpasswordComponent },
  {
path:"",
    component: AllTemplateFrontComponent,
  
    children: [
      {
        path: "",
        component: HomeFrontComponent
      },
    
    ]
  },{
    path:"",
    component: AllTemplateFrontComponent,
    canActivate: [ AuthUserService] ,
    children: [
      {
        path: "edit",
        component: EditProfileComponent,
       
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
    
  },
  { path: '**', component:Error404ComponentComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
