import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : '',redirectTo : 'home', pathMatch: 'full'},
  {path : 'home', component:HomeComponent},
  {path : 'addMovie', component:AddMovieComponent},
  {path : 'login', component:LoginComponent},
  {path : 'registration', component:RegisterComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
