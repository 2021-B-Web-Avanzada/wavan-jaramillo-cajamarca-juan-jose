import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  ShoppingCartOutline,
  CaretDownFill,
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

const icons: IconDefinition[] = [
  MenuOutline,
  ShoppingCartOutline,
  CaretDownFill,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzGridModule,
    NzInputModule,
  ],
  exports: [NzButtonModule, NzIconModule, NzGridModule, NzInputModule],
})
export class ZorroModule {}
