import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './components/stores/stores.component';
import { StoreCardComponent } from './components/store-card/store-card.component';


@NgModule({
  declarations: [
    StoresComponent,
    StoreCardComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule
  ]
})
export class StoresModule { }
