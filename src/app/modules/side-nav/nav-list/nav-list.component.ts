import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  linkslist: any = [{ name: 'Home', path: '/' }, { name: 'Search', path: '/search-users' }];

  constructor() { };

  ngOnInit() { };

}
