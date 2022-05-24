import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { GroupMoviesComponent } from './group-movies/group-movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalElementComponent } from './modal-element/modal-element.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from 'src/security/jwtInterceptor';
import { AddScreeningComponent } from './add-screening/add-screening.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HeaderSectionComponent,
    GroupMoviesComponent,
    MovieItemComponent,
    AddMovieComponent,
    ModalElementComponent,
    LoginComponent,
    RegisterComponent,
    AddScreeningComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule
    
  ],
  providers: [{ provide: 'BACKEND_URL', useValue: 'http://localhost:8080'},
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
