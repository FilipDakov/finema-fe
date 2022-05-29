import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/security/auth.guard';
import { RoleGuard } from 'src/security/role.guard';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddScreeningComponent } from './add-screening/add-screening.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShowReservationsUserComponent } from './show-reservations-user/show-reservations-user.component';
import { ShowReservationsComponent } from './show-reservations/show-reservations.component';

const routes: Routes = [
  {path : '',redirectTo : 'home', pathMatch: 'full'},
  {path : 'home', component:HomeComponent},
  {path : 'addMovie', component:AddMovieComponent,canActivate: [RoleGuard]},
  {path : 'login', component:LoginComponent},
  {path : 'registration', component:RegisterComponent},
  {path : 'addScreening', component:AddScreeningComponent,canActivate: [RoleGuard]}, 
  {path: 'upcomingMovies', component:ComingSoonComponent},
  {path : 'schedule',component:ScheduleComponent},
  {path : 'reservation',component:ReservationComponent,canActivate : [AuthGuard]},
  {path : 'showReservations',component:ShowReservationsComponent,canActivate: [RoleGuard]},
  {path: 'myReservations',component:ShowReservationsUserComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
