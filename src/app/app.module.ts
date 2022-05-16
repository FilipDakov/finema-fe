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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HeaderSectionComponent,
    GroupMoviesComponent,
    MovieItemComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: 'BACKEND_URL', useValue: 'http://localhost:8080'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
