import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Hospital } from 'src/app/core/models/hospital.model';
import { HospitalsService } from 'src/app/core/services/hospitals.service';

@Component({
  selector: 'app-edit-hospital-dialog',
  templateUrl: './edit-hospital-dialog.component.html',
  styleUrls: ['./edit-hospital-dialog.component.scss'],
})
export class EditHospitalDialogComponent implements OnInit {
  @Input() hospital?: Hospital;

  public form: FormGroup;

  public enableEdit: boolean = false;

  public isLoading: boolean = false;

  constructor(
    private FormBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<EditHospitalDialogComponent>,
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
      website: [
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
    if (this.hospital) {
      this.form.patchValue({
        name: this.hospital.name,
        address: this.hospital.address,
        phone: this.hospital.phone,
        email: this.hospital.email,
        website: this.hospital.website,
        description: this.hospital.description,
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

  public save() {
    this.isLoading = true;
    const jwt = localStorage.getItem('jwt');
    this.hospitalService
      .updateHospital(jwt as string, this.hospital?.id as string, {
        ...this.form.value,
        image: 'https://via.placeholder.com/150',
      })
      .subscribe({
        next: (response) => {
          this.toastrService.success(
            'Hospital successfully updated',
            'Success'
          );
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.toastrService.danger(
            'An error occurred while updating hospital [CODE] ' + error.status,
            'Error'
          );
        },
      });
  }
}
