import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './BackOffice/header/header.component';
import { HomeComponent } from './BackOffice/home/home.component';
import { FooterComponent } from './BackOffice/footer/footer.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { LoginComponent } from './login/LoginComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { EditprofileComponent } from './features/admin/editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { Error404ComponentComponent } from './error404-component/error404-component.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    AllTemplateBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    LoginComponent,
    RegisterComponent,
    UsergetallComponent,
    EditProfileComponent,
    EditprofileComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    VerifEmailComponent,
    Error404ComponentComponent
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
