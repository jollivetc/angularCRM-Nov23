import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authenticationGuard } from './login/authentication.guard';
import { ConsumerListComponent } from './consumer/consumer-list/consumer-list.component';
import { ConsumerFicheComponent } from './consumer/consumer-fiche/consumer-fiche.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[authenticationGuard]},
  {path: 'consumers', component: ConsumerListComponent, canActivate:[authenticationGuard]},
  {path: 'consumers/new', component: ConsumerFicheComponent, canActivate:[authenticationGuard]},
  {path: 'consumers/:id', component: ConsumerFicheComponent, canActivate:[authenticationGuard]},
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
