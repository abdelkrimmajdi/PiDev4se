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
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UsergetallComponent } from './features/admin/usergetall/usergetall.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { EditprofileComponent } from './features/admin/editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MentorProgramComponent } from './Mentor/mentor-program/mentor-program.component';
import { MentorExerciceComponent } from './Mentor/mentor-exercice/mentor-exercice.component';
import { AddProgComponent } from './Mentor/MentorProgram/add-prog/add-prog.component';
import { UpdateProgComponent } from './Mentor/MentorProgram/update-prog/update-prog.component';
import { UpdateExoComponent } from './Mentor/MentorExercice/update-exo/update-exo.component';
import { AddExoComponent } from './Mentor/MentorExercice/add-exo/add-exo.component';

// Import Angular Material modules
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AssignEtoPComponent } from './Mentor/MentorExercice/assign-eto-p/assign-eto-p.component';
import { AssignPtoUComponent } from './Mentor/MentorProgram/assign-pto-u/assign-pto-u.component';
import { DetailProgComponent } from './Mentor/MentorProgram/detail-prog/detail-prog.component';

import { Error404ComponentComponent } from './error404-component/error404-component.component';
import { GetallMentorComponent } from './Umentor/getall-mentor/getall-mentor.component';
import { MentorDetailComponent } from './Umentor/mentor-detail/mentor-detail.component';
import { MarketComponent } from './market/market.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
import { PanierComponent } from './panier/panier.component';
import { CreateReclamationComponent } from './create-reclamation/create-reclamation.component';
import { UpdateReclamationComponent } from './update-reclamation/update-reclamation.component';
import { CreateResponseComponent } from './create-response/create-response.component';
import { AllResponsesComponent } from './all-responses/all-responses.component';
import { UpdateResponseComponent } from './update-response/update-response.component';
import { ForbiddenWordsDirective } from './forbidden-words.directive';
import { AllReclamationsComponent } from './all-reclamations/all-reclamations.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ExerciceaddComponent } from './exerciceadd/exerciceadd.component';
import { ExercicedetailComponent } from './exercicedetail/exercicedetail.component';
import { ExercicefrontComponent } from './exercicefront/exercicefront.component';
import { WorkoutaddComponent } from './workoutadd/workoutadd.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutdetailComponent } from './workoutdetail/workoutdetail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Event } from './model/Event';
import { EventDetailComponent } from './EventCRUD/event-detail/event-detail.component';
import { UpdateeventComponent } from './EventCRUD/updateevent/updateevent.component';
import { GetalleventComponent } from './EventCRUD/getallevent/getallevent.component';
import { CreateEventComponent } from './EventCRUD/create-event/create-event.component';
import { EventfrontComponent } from './EventCRUD/eventfront/eventfront.component';
import { DemandeComponent } from './demande/demande.component';
import { ProgrammComponent } from './features/Nutrionniste/programm/programm.component';
import { AddProgrammComponent } from './features/Nutrionniste/add-programm/add-programm.component';
import { AddMenuComponent } from './features/Nutrionniste/add-menu/add-menu.component';
import { MenuComponent } from './features/Nutrionniste/menu/menu.component';

import { GetNutrionnistComponent } from './features/user/get-nutrionnist/get-nutrionnist.component';
import { ShowProgramComponent } from './features/user/show-program/show-program.component';
import { ShowProgramMenuComponent } from './features/user/show-program-menu/show-program-menu.component';
import { StripeComponent } from './features/user/stripe/stripe.component';
import { MyProgramComponent } from './features/user/my-program/my-program.component';
import { CaloriesComponent } from './features/user/calories/calories.component';
import { RendezVousComponent } from './features/user/rendez-vous/rendez-vous.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';




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
    CreateReclamationComponent,
    UpdateReclamationComponent,
    CreateResponseComponent,
    AllResponsesComponent,
    UpdateResponseComponent,
    ForbiddenWordsDirective,
AllReclamationsComponent,
    MentorProgramComponent,
    MentorExerciceComponent,
    AddProgComponent,
    UpdateProgComponent,
    UpdateExoComponent,
    AddExoComponent,
    AssignEtoPComponent,
    AssignPtoUComponent,
    DetailProgComponent,
    ExerciceComponent,
    ExerciceaddComponent,
    ExercicedetailComponent,
    ExercicefrontComponent,
    WorkoutComponent,
    WorkoutaddComponent,
    WorkoutdetailComponent,
    EventDetailComponent,
    UpdateeventComponent,
    GetalleventComponent,
    CreateEventComponent,
    EventfrontComponent,
    GetalleventComponent,
    EventfrontComponent,
    Error404ComponentComponent,
      GetallMentorComponent,
      MentorDetailComponent,
      MarketComponent,
      AddproductComponent,
      ProductComponent,
      PanierComponent,
      DemandeComponent,
      ProgrammComponent,
      AddProgrammComponent,
      AddMenuComponent,
      MenuComponent,
   
      GetNutrionnistComponent,
          ShowProgramComponent,
          ShowProgramMenuComponent,
          StripeComponent,
          MyProgramComponent,
          CaloriesComponent,
          RendezVousComponent,
           
      

  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule, // Import MatSortModule
    MatTableModule,// Import MatTableModule
 
    MatTooltipModule,
    MatButtonModule,
    MatIconModule ,   
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule
    ,
  BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FullCalendarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {
  
 }
