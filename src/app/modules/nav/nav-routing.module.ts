import { HomeComponent } from './../../home/home.component';
import { AppComponent } from './../../app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavListComponent } from '../side-nav/nav-list/nav-list.component';
import { SearchUsersComponent } from '../search-users/search-users/search-users.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'search-users', loadChildren: 'app/modules/search-users/search-users.module#SearchUsersModule'
  },
  {
    path: '**', redirectTo: 'search-users', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class NavRoutingModule { }
