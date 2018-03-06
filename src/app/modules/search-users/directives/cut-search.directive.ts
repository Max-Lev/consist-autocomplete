import { Directive, HostListener, ElementRef, ViewContainerRef } from '@angular/core';
import { SearchUsersComponent } from '../search-users/search-users.component';

@Directive({
  selector: '[cut]'
})
export class CutSearchDirective {

  constructor(private element: ElementRef, private _parentComponent: SearchUsersComponent) { };

  @HostListener('keyup', ['$event']) onCut($event) {
    // || $event.keyCode === 46
    // $event.keyCode === 91 ||
    if ($event.keyCode === 8) {
      this._parentComponent.showPanelSearchOptions();
    }
  };

}
