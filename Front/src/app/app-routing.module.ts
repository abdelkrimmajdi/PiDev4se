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
import { AddExoComponent } from './Mentor/MentorExercice/add-exo/add-exo.component';
import { MentorExerciceComponent } from './Mentor/mentor-exercice/mentor-exercice.component';
import { MentorProgramComponent } from './Mentor/mentor-program/mentor-program.component';
import { AddProgComponent } from './Mentor/MentorProgram/add-prog/add-prog.component';
import { UpdateExoComponent } from './Mentor/MentorExercice/update-exo/update-exo.component';
import { UpdateProgComponent } from './Mentor/MentorProgram/update-prog/update-prog.component';
import { AssignEtoPComponent } from './Mentor/MentorExercice/assign-eto-p/assign-eto-p.component';
import { AssignPtoUComponent } from './Mentor/MentorProgram/assign-pto-u/assign-pto-u.component';
import { DetailProgComponent } from './Mentor/MentorProgram/detail-prog/detail-prog.component';

const routes: Routes = [
  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },{
        path: "edite-profile",
        component:EditprofileComponent
      },
      {
        path: "MentorExo",
        component: MentorExerciceComponent
        
      },
      {
        path: "MentorProg",
        component: MentorProgramComponent
        
      }
     
    ]
  },
  { path: 'resetpassword/:passwordResetToken',component:ResetpasswordComponent },
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
  {
    path: "AddMentorExo",
    component: AddExoComponent
    
  },
  {
    path: "MentorExo",
    component: MentorExerciceComponent
    
  },
  {
    path: "MentorProg",
    component: MentorProgramComponent
    
  },
  {
    path: "AddMentorProg",
    component: AddProgComponent
    
  },
  {
    path: "UpdateProg/:idMentorProg",
    component: UpdateProgComponent
    
  },
  {
    path: "UpdateExo/:idExercice",
    component: UpdateExoComponent

    
  },
  {
    path: "assignEtoP",
    component: AssignEtoPComponent

    
  },
  {
    path: "assignPtoU",
    component: AssignPtoUComponent

    
  },
  {
    path: "Prog/:idMentorProg",
    component: DetailProgComponent

    
  }
  

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
