import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddScreeningComponent } from './add-screening/add-screening.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {path : '',redirectTo : 'home', pathMatch: 'full'},
  {path : 'home', component:HomeComponent},
  {path : 'addMovie', component:AddMovieComponent},
  {path : 'login', component:LoginComponent},
  {path : 'registration', component:RegisterComponent},
  {path : 'addScreening', component:AddScreeningComponent},
  {path: 'upcomingMovies', component:ComingSoonComponent},
  {path : 'schedule',component:ScheduleComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
