import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresComponent } from './components/stores/stores.component';

const routes: Routes = [
  {
    path: ':id',
    component: StoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
