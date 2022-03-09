import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { HospitalsService } from 'src/app/core/services/hospitals.service';

@Component({
  selector: 'app-add-hospital-dialog',
  templateUrl: './add-hospital-dialog.component.html',
  styleUrls: ['./add-hospital-dialog.component.scss'],
})
export class AddHospitalDialogComponent implements OnInit {
  public isLoading = false;

  public form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<AddHospitalDialogComponent>,
    private hospitalService: HospitalsService
  ) {
    this.form = this.FormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  save() {
    const jwt = localStorage.getItem('jwt');
    this.isLoading = true;
    this.hospitalService
      .createHospital(jwt as string, {
        ...this.form.value,
        image: 'https://via.placeholder.com/150',
      })
      .subscribe({
        next: (hospital) => {
          this.toastrService.success(
            `Successfully added hospital ${hospital.name}`,
            'Success'
          );
          this.dialogRef.close();
        },
        error: (err) => {
          this.toastrService.danger(err.message, 'Error');
          this.isLoading = false;
        },
      });
  }
}
