import './rx-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SideNavModule } from './modules/side-nav/side-nav.module';
import { NavModule } from './modules/nav/nav.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SideNavModule,
    NavModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
