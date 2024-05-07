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
import { GetNutrionnistComponent } from './features/user/get-nutrionnist/get-nutrionnist.component';
import { ShowProgramComponent } from './features/user/show-program/show-program.component';
import { ShowProgramMenuComponent } from './features/user/show-program-menu/show-program-menu.component';
import { MyProgramComponent } from './features/user/my-program/my-program.component';
import { CaloriesComponent } from './features/user/calories/calories.component';
import { RendezVousComponent } from './features/user/rendez-vous/rendez-vous.component';
import { CalenderComponent } from './features/Nutrionniste/calender/calender.component';
import { AppointmentComponent } from './features/Nutrionniste/appointment/appointment.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionaddComponent } from './subscriptionadd/subscriptionadd.component';
import { SubscriptiondetailComponent } from './subscriptiondetail/subscriptiondetail.component';
import { SubscriptionfrontComponent } from './subscriptionfront/subscriptionfront.component';
import { SubscriptionPaymentComponent } from './subscription-payment/subscription-payment.component';
import { WorkoutFrontComponent } from './workout-front/workout-front.component';
import { DeliverymanagementComponent } from './deliverymanagement/deliverymanagement.component';
import { PaypalComponent } from './paypal/paypal.component';
import { PaymentComponent } from './payment/payment.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CreatePhysiotherapistComponent } from './create-physiotherapist/create-physiotherapist.component';
import { AllPhysiotherapistsComponent } from './all-physiotherapists/all-physiotherapists.component';
import { UpdatePhysiotherapistComponent } from './update-physiotherapist/update-physiotherapist.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { MapComponent } from './map/map.component';
import { AddJournalComponent } from './Journal/journal/add-journal/add-journal.component';
import { UpdJournalComponent } from './Journal/journal/upd-journal/upd-journal.component';
import { AddPoComponent } from './Journal/persob/add-po/add-po.component';
import { AssignPoComponent } from './Journal/persob/assign-po/assign-po.component';
import { UpdPoComponent } from './Journal/persob/upd-po/upd-po.component';
import { JournalComponent } from './Journal/journal/journal.component';
import { PoComponent } from './Journal/persob/po.component';
import { DetailJournalComponent } from './Journal/journal/detail-journal/detail-journal.component';
import { RoomComponent } from './Room/room/room.component';
import { MainComponent } from './Room/main/main.component';
import { CartTotalComponent } from './cart-total/cart-total.component';
import { CREATEMEALComponent } from './MealCRUD/createmeal/createmeal.component';
import { UpdateMealComponent } from './MealCRUD/updatemeal/updatemeal.component';
import { MealDetailsComponent } from './MealCRUD/meal-details/meal-details.component';
import { CreateCouponComponent } from './CouponMealCrud/create-coupon/create-coupon.component';
import { ListCouponsComponent } from './CouponMealCrud/list-coupons/list-coupons.component';
import { UpdateCouponComponent } from './CouponMealCrud/update-coupon/update-coupon.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { get } from 'http';
import { GetAllComponent } from './MealCRUD/get-all/get-all.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { GetallprogramComponent } from './Umentor/getallprogram/getallprogram.component';


const routes: Routes = [ 
  {        path: "cart", 
component: CartTotalComponent        
  },
  {
    path: "user-favorites", 
    component: UserFavoritesComponent 
},
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
        component: EditprofileComponent,
        canActivate: [ AuthAdminService] ,

      },
      {
        path: "getall",
        component: UsergetallComponent,
        canActivate: [ AuthAdminService] ,

      
      }, ]
    },{
  path: "admin",
    component: AllTemplateBackComponent,
   
    children: [
      
    
      {
        path: "MentorExo",
        component: MentorExerciceComponent
        
      },
      {
        path: "deliverymanagement",
        component: DeliverymanagementComponent
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
      },
      {
        path: 'sub',
        component: SubscriptionComponent
      },
      {
        path: 'subAdd',
        component: SubscriptionaddComponent
      },
      {
        path: 'subUpdate/:idSub',
        component: SubscriptiondetailComponent
      },
      
      {
      path : "all-meal",
      component : GetAllComponent
      },
      { 
      path : "create-meal",
        component : CREATEMEALComponent
        },
        {
      path: "update-meal/:id",
          component: UpdateMealComponent
          
        },
        {
      path: "detail-meal/:id",
          component: MealDetailsComponent
        },   
        { 
          path :  "CreateCoupon",    
          component : CreateCouponComponent   
        },{ 
          path :  "AllCoupon",  
          component : ListCouponsComponent
        }  
        ,
        {
          path :  "update-coupon/:id",   
          component : UpdateCouponComponent
        }, 
         
          {path: 'coupon/:id', component: CouponDetailsComponent
            }  
      
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
        path: "createPhysiotherapist",
        component: CreatePhysiotherapistComponent
      },
      {
        path: "getPhysiotherapists",
        component: AllPhysiotherapistsComponent
      },
      {
        path: "updatePhysiotherapist/:id", // Définir une route pour la modification de réclamation avec un paramètre d'ID
        component: UpdatePhysiotherapistComponent // Utiliser le composant de modification de réclamation
      },
      {
        path: 'update-physiotherapist/:id', // Chemin pour la modification de la réclamation avec un paramètre d'ID
        component: UpdatePhysiotherapistComponent
      },
      {
        path: "getAppointments",
        component: AllAppointmentsComponent
      },
      {
        path: "updateappointment/:id", // Définir une route pour la modification de réclamation avec un paramètre d'ID
        component: UpdateAppointmentComponent // Utiliser le composant de modification de réclamation
      },
      {
        path: 'update-appointment/:id', // Chemin pour la modification de la réclamation avec un paramètre d'ID
        component: UpdateAppointmentComponent
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
      },
      {
      path: "AddMentorProg",
      component: AddProgComponent
      
      },
      {
        path: "AddMentorExo",
        component: AddExoComponent
        
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
    path: "UpdateProg/:idMentorProg",
    component: UpdateProgComponent
    
  },
  {
    path: "UpdateExo/:idExercice",
    component: UpdateExoComponent

    
      },
      {
        path: "Prog/:idMentorProg",
        component: DetailProgComponent
    
        
      },

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
        path: 'sub',
        component: SubscriptionfrontComponent
        
      },
      {
        path: "paypal",
        component: PaypalComponent
      },
      {
        path: "payment",
        component: PaymentComponent
      },
      {
        path: "delivery",
        component: DeliveryComponent
      },
      {
        path: 'payment/:idSub',
        component: SubscriptionPaymentComponent
      },
      {
        path: 'workout',
        component: WorkoutFrontComponent
      },
      {
        path: "createReclamation",
        component: CreateReclamationComponent
      },
      {
        path: "createAppointment",
        component: CreateAppointmentComponent
      },
      
      {
        path: "market",
        component:MarketComponent
    
      },
      {
        path: "GetMentors",
        component: GetallMentorComponent
      },
      {
        path: "GetJournals",
        component: JournalComponent
      },
      {
        path: "GetPos",
        component: PoComponent
      },  
      {
        path: "addJournal",
        component: AddJournalComponent
      },
      { path: 'chat', component: RoomComponent },
      { path: 'main', component: MainComponent },
      
   
    
    ]

  },{
    path:"",
    component: AllTemplateFrontComponent,
    canActivate: [ AuthUserService] ,
    children: [
      {
        path: "edit",
        component: EditProfileComponent,
       
      },  {        path: "resto", 
      component: MealListComponent        
      },{
        path: "NutritionistMenu",
        component: ShowProgramMenuComponent
      },  {
        path: "NutritionistProgram",
        component: ShowProgramComponent
      },  {
        path: "Nutritionists",
        component: GetNutrionnistComponent
      },   {
        path: "MyProgram",
        component: MyProgramComponent
      },{path: "CalculCalories",
      component: CaloriesComponent
    },{path: "Appointment",
    component: RendezVousComponent
      },
      {
        path: "assignPotoJ",
        component: AssignPoComponent
      },
      {
        path: "GetProgU",
        component: GetallprogramComponent
      },

     
      
    
    ]
  },
  {
    path:"admin",
    component: AllTemplateBackComponent,
   
    children: [
      {
        path: "Program",
        component: ProgrammComponent,
        canActivate: [AuthNutririonisteService],

      },
        {
          path: "AddProgram",
          component: AddProgrammComponent,
          canActivate: [AuthNutririonisteService],

      },
      {
        path: "Menu",
        component: MenuComponent,
        canActivate: [AuthNutririonisteService],

        },
        {
          path: "AddMenu",
          component: AddMenuComponent,
          canActivate: [AuthNutririonisteService],

          },
          {
            path: "GetAppoinment",
            component: AppointmentComponent,
            canActivate: [AuthNutririonisteService],

            }, 
    
    ]
  },
  {
    path: 'map', 
    component: MapComponent
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
  
  
  {
    path: "GetMentorsDetails/:id",
    component: MentorDetailComponent
  },
  {
    path: "GetAppionment",
    component: CalenderComponent
  },
  {
    path: "addPo",
    component: AddPoComponent
  },
  {
    path: "UpdatePo/:idPerOb",
    component: UpdPoComponent
    
  },
  {
    path: "assignPotoJ",
    component: AssignPoComponent
  },
  {
    path: "detailJournal/:idJo",
    component: DetailJournalComponent
  },
  
  { path: '**', component:Error404ComponentComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
