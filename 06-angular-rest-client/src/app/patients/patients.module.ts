import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './components/patients/patients.component';
import { CoreModule } from '../core/core.module';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { EditPatientDialogComponent } from './components/edit-patient-dialog/edit-patient-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePatientDialogComponent } from './components/delete-patient-dialog/delete-patient-dialog.component';
import { AddPatientDialogComponent } from './components/add-patient-dialog/add-patient-dialog.component';

@NgModule({
  declarations: [
    PatientsComponent,
    EditPatientDialogComponent,
    DeletePatientDialogComponent,
    AddPatientDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    CoreModule,
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
export class PatientsModule {}
