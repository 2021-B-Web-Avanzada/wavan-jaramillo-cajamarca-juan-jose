import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientsService } from 'src/app/core/services/patients.service';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { DeletePatientDialogComponent } from '../delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public patients: Patient[] = [];

  public isLoading = false;

  constructor(
    private patientsService: PatientsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.patientsService.getAllPatients('5e9e7d7f8f8b9a0a9a9f9d7a').subscribe({
      next: (patients) => {
        this.patients = patients;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.danger(err.message, 'Error');
        this.isLoading = false;
      },
    });
  }

  delete(currentPatient: Patient) {
    this.dialogService
      .open(DeletePatientDialogComponent, {
        context: {
          patient: currentPatient,
        },
      })
      .onClose.subscribe(this.refetch.bind(this));
  }

  open(currentPatient: Patient) {
    this.dialogService
      .open(EditPatientDialogComponent, {
        context: {
          patient: currentPatient,
        },
        hasBackdrop: true,
        autoFocus: true,
        hasScroll: true,
      })
      .onClose.subscribe(this.refetch.bind(this));
  }

  refetch() {
    this.patientsService.getAllPatients('5e9e7d7f8f8b9a0a9a9f9d7a').subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        this.toastrService.danger(err.message, 'Error');
      },
    });
  }

  addPatient() {
    this.dialogService
      .open(AddPatientDialogComponent)
      .onClose.subscribe(this.refetch.bind(this));
  }
}
