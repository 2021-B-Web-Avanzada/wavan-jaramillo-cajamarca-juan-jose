import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { ZorroModule } from '../zorro/zorro.module';
import { StoreCardComponent } from './components/store-card/store-card.component';

@NgModule({
  declarations: [CategoryComponent, StoreCardComponent],
  imports: [CommonModule, CategoriesRoutingModule, ZorroModule],
})
export class CategoriesModule {}
