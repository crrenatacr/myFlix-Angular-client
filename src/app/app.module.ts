import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // New method to provide HttpClient
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()  // Aqui você substitui o HttpClientModule por provideHttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
