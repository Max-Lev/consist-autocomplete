import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRoutingModule } from './nav-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NavRoutingModule
  ],
  exports: [NavRoutingModule],
  declarations: []
})
export class NavModule { }
