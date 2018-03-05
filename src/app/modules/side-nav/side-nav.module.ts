import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { MatListModule } from '@angular/material/list';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  exports: [NavListComponent],
  declarations: [NavListComponent]
})
export class SideNavModule { }
