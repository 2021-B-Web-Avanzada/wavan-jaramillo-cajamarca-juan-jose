import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Hospital } from 'src/app/core/models/hospital.model';
import { HospitalsService } from 'src/app/core/services/hospitals.service';
import { AddHospitalDialogComponent } from '../add-hospital-dialog/add-hospital-dialog.component';
import { DeleteHospitalDialogComponent } from '../delete-hospital-dialog/delete-hospital-dialog.component';
import { EditHospitalDialogComponent } from '../edit-hospital-dialog/edit-hospital-dialog.component';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit {
  public hospitals: Hospital[] = [];

  public isLoading = true;

  constructor(
    private hospitalService: HospitalsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const jwt = localStorage.getItem('jwt');
    this.hospitalService.getHospitals(jwt as string).subscribe({
      next: (hospitals) => {
        this.hospitals = hospitals;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.danger(err.message, 'Error');
        this.isLoading = false;
      },
    });
  }

  open(currentHospital: Hospital) {
    this.dialogService
      .open(EditHospitalDialogComponent, {
        context: {
          hospital: currentHospital,
        },
      })
      .onClose.subscribe({
        next: () => {
          this.refetch();
        },
        error: (error) => {
          this.toastrService.success(error.message, 'Error');
        },
      });
  }

  delete(currentHospital: Hospital) {
    this.dialogService
      .open(DeleteHospitalDialogComponent, {
        context: {
          hospital: currentHospital,
        },
      })
      .onClose.subscribe({
        next: () => {
          this.refetch();
        },
        error: (error) => {
          this.toastrService.success(error.message, 'Error');
        },
      });
  }

  refetch() {
    const jwt = localStorage.getItem('jwt');
    this.hospitalService.getHospitals(jwt as string).subscribe({
      next: (hospitals) => {
        this.hospitals = hospitals;
      },
      error: (error) => {
        this.toastrService.success(error.message, 'Error');
      },
    });
  }

  addHospital() {
    this.dialogService.open(AddHospitalDialogComponent).onClose.subscribe({
      next: () => {
        this.refetch();
      },
      error: (error) => {
        this.toastrService.success(error.message, 'Error');
      },
    });
  }
}
