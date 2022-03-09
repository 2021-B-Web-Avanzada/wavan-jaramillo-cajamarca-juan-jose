import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Hospital } from 'src/app/core/models/hospital.model';
import { HospitalsService } from 'src/app/core/services/hospitals.service';
import { PatientsService } from 'src/app/core/services/patients.service';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss'],
})
export class AddPatientDialogComponent implements OnInit {
  public form: FormGroup;

  public selectedHospitalId = '';

  public hospitals: Hospital[] = [];

  public enableEdit: boolean = false;

  public isLoading: boolean = false;

  constructor(
    private FormBuilder: FormBuilder,
    private patientService: PatientsService,
    private hospitalsService: HospitalsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<AddPatientDialogComponent>
  ) {
    this.form = this.FormBuilder.group({
      hospitalId: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      identity: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    const jwt = localStorage.getItem('jwt');
    this.hospitalsService.getHospitals(jwt as string).subscribe({
      next: (response) => {
        this.hospitals = response;
        this.selectedHospitalId = this.hospitals[0].id || '';
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toastrService.danger(
          'An error occurred while getting hospitals [CODE] ' + error.status,
          'Error'
        );
      },
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    const jwt = localStorage.getItem('jwt');
    this.patientService
      .createPatient(
        this.selectedHospitalId,
        {
          ...this.form.value,
          identityNumber: this.form.value.identity,
          hospitalId: Number(this.selectedHospitalId),
          image: 'https://via.placeholder.com/150',
        },
        jwt as string
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastrService.success('Patient added successfully', 'Success');
          this.dialogRef.close(response);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.toastrService.danger(
            'An error occurred while adding patient. [CODE] ' + error.status,
            'Error'
          );
        }
      );
  }
}
