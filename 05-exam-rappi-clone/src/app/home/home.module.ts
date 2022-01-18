import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ZorroModule } from '../zorro/zorro.module';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { InfoBannerComponent } from './components/info-banner/info-banner.component';
import { StoresComponent } from './components/stores/stores.component';
import { StoresCardComponent } from './components/stores-card/stores-card.component';
import { PromoBannerComponent } from './components/promo-banner/promo-banner.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    CategoriesComponent,
    CategoryCardComponent,
    InfoBannerComponent,
    StoresComponent,
    StoresCardComponent,
    PromoBannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ZorroModule,
    SharedModule,
    RouterModule,
  ],
})
export class HomeModule {}
