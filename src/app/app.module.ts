import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { HomeService } from './services/home.service';
import { HomeComponent } from './home/home.component';
import { HomeDesksComponent } from './home-desks/home-desks.component';
import { HomeTasksComponent } from './home-tasks/home-tasks.component';
import { DeskComponent } from './desk/desk.component';
import { TaskComponent } from './task/task.component';
import { ModalComponent } from './modal/modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { NewDeskComponent } from './new-desk/new-desk.component';
import { ModalErrComponent } from './modal-err/modal-err.component';
import { UserAdmComponent } from './user-adm/user-adm.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    HomeDesksComponent,
    HomeTasksComponent,
    DeskComponent,
    TaskComponent,
    ModalComponent,
    TaskModalComponent,
    NewDeskComponent,
    ModalErrComponent,
    UserAdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
