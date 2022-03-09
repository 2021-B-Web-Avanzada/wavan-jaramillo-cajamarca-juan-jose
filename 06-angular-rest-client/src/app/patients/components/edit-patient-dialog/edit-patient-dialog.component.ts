import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Hospital } from 'src/app/core/models/hospital.model';
import { Patient } from 'src/app/core/models/patient.model';
import { HospitalsService } from 'src/app/core/services/hospitals.service';
import { PatientsService } from 'src/app/core/services/patients.service';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.scss'],
})
export class EditPatientDialogComponent implements OnInit {
  @Input() patient?: Patient;

  public form: FormGroup;

  public enableEdit: boolean = false;

  public isLoading: boolean = false;

  public hospital?: Hospital;

  constructor(
    private FormBuilder: FormBuilder,
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<EditPatientDialogComponent>,
    private hospitalService: HospitalsService
  ) {
    this.form = this.FormBuilder.group({
      name: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      age: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      identity: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      address: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      phone: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      email: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      description: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    if (this.patient) {
      this.form.patchValue({
        name: this.patient.name,
        age: this.patient.age,
        identity: this.patient.identityNumber,
        address: this.patient.address,
        phone: this.patient.phone,
        email: this.patient.email,
        description: this.patient.description,
      });
      const jwt = localStorage.getItem('jwt') || '';
      this.hospitalService
        .getHospitalById(jwt, this.patient.hospitalId)
        .subscribe((hospital) => {
          this.hospital = hospital;
        });
    }
  }

  public enableEditMode(): void {
    this.enableEdit = true;
    this.form.enable();
  }

  public disableEditMode(): void {
    this.enableEdit = false;
    this.form.disable();
  }

  public save(): void {
    this.isLoading = true;
    const jwtToken = localStorage.getItem('jwtToken') || '';
    if (this.form.valid) {
      this.patientService
        .updatePatient(
          this.patient?.hospitalId as string,
          this.patient?.id as string,
          {
            ...this.form.value,
          },
          jwtToken
        )
        .subscribe({
          next: (patient) => {
            this.disableEditMode();
            this.patient = patient;
            this.isLoading = false;
            this.toastrService.success(
              'Patient updated successfully',
              'Success',
              {
                icon: 'person-done-outline',
              }
            );
            this.dialogRef.close();
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.toastrService.danger(
              'Something went wrong. Please try again later. [CODE] ' +
                err.status,
              'Error',
              {
                icon: 'alert-circle',
              }
            );
          },
        });
    }
  }
}
