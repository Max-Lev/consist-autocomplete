import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
})
export class SharedModule {
  static forRoot() {
    return { ngModule: SharedModule, providers: [SharedService] }
  }
}
