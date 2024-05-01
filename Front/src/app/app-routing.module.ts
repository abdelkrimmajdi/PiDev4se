import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeComponent } from './BackOffice/home/home.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { LoginComponent } from './login/login.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { EditprofileComponent } from './features/admin/editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
=======
import { MarketComponent } from './market/market.component';
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

import { AddExoComponent } from './Mentor/MentorExercice/add-exo/add-exo.component';
import { MentorExerciceComponent } from './Mentor/mentor-exercice/mentor-exercice.component';
import { MentorProgramComponent } from './Mentor/mentor-program/mentor-program.component';
import { AddProgComponent } from './Mentor/MentorProgram/add-prog/add-prog.component';
import { UpdateExoComponent } from './Mentor/MentorExercice/update-exo/update-exo.component';
import { UpdateProgComponent } from './Mentor/MentorProgram/update-prog/update-prog.component';
import { AssignEtoPComponent } from './Mentor/MentorExercice/assign-eto-p/assign-eto-p.component';
import { AssignPtoUComponent } from './Mentor/MentorProgram/assign-pto-u/assign-pto-u.component';
import { DetailProgComponent } from './Mentor/MentorProgram/detail-prog/detail-prog.component';

import { Error404ComponentComponent } from './error404-component/error404-component.component';
import { AuthAdminService } from './guards/admin/auth-admin.service';
import { AuthUserService } from './guards/user/auth-user.service';
import { AuthNutririonisteService } from './guards/Nutritioniste/auth-nutririoniste.service';
import { GetallMentorComponent } from './Umentor/getall-mentor/getall-mentor.component';
import { MentorDetailComponent } from './Umentor/mentor-detail/mentor-detail.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { MarketComponent } from './market/market.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateReclamationComponent } from './create-reclamation/create-reclamation.component';
import { AllReclamationsComponent } from './all-reclamations/all-reclamations.component';
import { AllResponsesComponent } from './all-responses/all-responses.component';
import { UpdateReclamationComponent } from './update-reclamation/update-reclamation.component';
import { CreateResponseComponent } from './create-response/create-response.component';
import { UpdateResponseComponent } from './update-response/update-response.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ExerciceaddComponent } from './exerciceadd/exerciceadd.component';
import { ExercicedetailComponent } from './exercicedetail/exercicedetail.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutaddComponent } from './workoutadd/workoutadd.component';
import { WorkoutdetailComponent } from './workoutdetail/workoutdetail.component';
import { ExercicefrontComponent } from './exercicefront/exercicefront.component';
import { CreateEventComponent } from './EventCRUD/create-event/create-event.component';
import { EventDetailComponent } from './EventCRUD/event-detail/event-detail.component';
import { EventfrontComponent } from './EventCRUD/eventfront/eventfront.component';
import { GetalleventComponent } from './EventCRUD/getallevent/getallevent.component';
import { UpdateeventComponent } from './EventCRUD/updateevent/updateevent.component';
import { DemandeComponent } from './demande/demande.component';
import { ProgrammComponent } from './features/Nutrionniste/programm/programm.component';
import { AddProgrammComponent } from './features/Nutrionniste/add-programm/add-programm.component';
import { MenuComponent } from './features/Nutrionniste/menu/menu.component';
import { AddMenuComponent } from './features/Nutrionniste/add-menu/add-menu.component';

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
<<<<<<< HEAD
        path: "edite-profile",
        component: EditprofileComponent
      },
      {
        path: "getall",
        component: UsergetallComponent,
      
      },
      {
        path: "MentorExo",
        component: MentorExerciceComponent
        
      },
      {
        path: "MentorProg",
        component: MentorProgramComponent
        
      },{
        path: 'exercice',
        component: ExerciceComponent
      },
      {
        path: 'exerciceAdd',
        component: ExerciceaddComponent
      },
      {
        path: 'exerciceUpdate/:idExer',
        component: ExercicedetailComponent
      },
      {
        path: 'workout',
        component: WorkoutComponent
      },
      {
        path: 'workoutAdd',
        component: WorkoutaddComponent
      },
      {
        path: 'workoutUpdate/:idWork',
        component: WorkoutdetailComponent
=======
        path: "addproduct",
        component:AddproductComponent
        
      },
      {
        path: "product",
        component:ProductComponent
        
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
      },

    ]
  },{
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
    {
      path: "update-product/:id",
      component: ProductUpdateComponent
    },
    {
      path : "event",
      component : EventfrontComponent
    }
]},{
    path: "admin",
    component: AllTemplateBackComponent,
    children: [ 
    {
      path: "getReclamations",
      component: AllReclamationsComponent
    },
    {
      path: "getResponses",
      component: AllResponsesComponent
    },
    {
      path: "updateReclamation/:id", // Définir une route pour la modification de réclamation avec un paramètre d'ID
      component: UpdateReclamationComponent // Utiliser le composant de modification de réclamation
    },
    {
      path: 'update-reclamation/:id', // Chemin pour la modification de la réclamation avec un paramètre d'ID
      component: UpdateReclamationComponent
    },
    {
      path: "createReponse",
      component: CreateResponseComponent
    },
    {
      path: "updateResponse/:id", // Définir une route pour la modification de réclamation avec un paramètre d'ID
      component: UpdateResponseComponent // Utiliser le composant de modification de réclamation
    },
    {
      path: 'update-response/:id', // Chemin pour la modification de la réclamation avec un paramètre d'ID
      component: UpdateResponseComponent
    },
    {
      path: "update-event/:id",
      component:  UpdateeventComponent
    } ,
    {
      path : "all-events",
      component : GetalleventComponent
    }
    ,
    {
      path : "create-event",
      component: CreateEventComponent
    },
    {
      path :  "detail-event/:id",
      component : EventDetailComponent
    },
    {
      path :  "demande-event",
      component : DemandeComponent
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
      {
        path: 'exercice',
        component: ExercicefrontComponent
      },
      {
        path: "createReclamation",
        component: CreateReclamationComponent
      },
      {
        path: "market",
        component:MarketComponent
    
      },
      {
        path: "GetMentors",
        component: GetallMentorComponent
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
    path:"admin",
    component: AllTemplateBackComponent,

    children: [
      {
        path: "Program",
        component: ProgrammComponent,
       
      },
      
        {
          path: "AddProgram",
          component: AddProgrammComponent,
         
      },
      {
        path: "Menu",
        component: MenuComponent,
        },
        {
          path: "AddMenu",
          component:AddMenuComponent,
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
<<<<<<< HEAD
  
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

    
  },
  
  {
    path: "GetMentorsDetails/:id",
    component: MentorDetailComponent
  },
  
  { path: '**', component:Error404ComponentComponent }


=======
  {
    path: "market",
    component:MarketComponent
    
  },
  {
    path: "getall",
    component:UsergetallComponent
    
  },
 
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
