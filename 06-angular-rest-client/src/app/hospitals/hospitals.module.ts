import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbListModule,
  NbCardModule,
  NbUserModule,
  NbButtonModule,
  NbIconModule,
  NbDialogModule,
  NbInputModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbSelectModule,
} from '@nebular/theme';
import { EditHospitalDialogComponent } from './components/edit-hospital-dialog/edit-hospital-dialog.component';
import { DeleteHospitalDialogComponent } from './components/delete-hospital-dialog/delete-hospital-dialog.component';
import { AddHospitalDialogComponent } from './components/add-hospital-dialog/add-hospital-dialog.component';

@NgModule({
  declarations: [HospitalsComponent, EditHospitalDialogComponent, DeleteHospitalDialogComponent, AddHospitalDialogComponent],
  imports: [
    CommonModule,
    HospitalsRoutingModule,
    NbListModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbSelectModule,
  ],
})
export class HospitalsModule {}
