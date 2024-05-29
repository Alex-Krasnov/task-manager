import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { DeskComponent } from './desk/desk.component';
import { UserAdmComponent } from './user-adm/user-adm.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard],
  children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'desk/:id', component: DeskComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserAdmComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
