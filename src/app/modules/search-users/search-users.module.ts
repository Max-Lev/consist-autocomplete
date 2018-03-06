import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUsersComponent } from './search-users/search-users.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GetUsersService } from './services/get-users.service';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FilterUsersService } from './services/filter-users.service';
import { AddUserComponent } from './add-user/add-user.component';
const routes: Routes = [
  {
    path: '', component: SearchUsersComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    GetUsersService,
    FilterUsersService
  ],
  declarations: [SearchUsersComponent, AddUserComponent]
})
export class SearchUsersModule { }
