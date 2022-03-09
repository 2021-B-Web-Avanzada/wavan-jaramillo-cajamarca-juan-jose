import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Hospital } from 'src/app/core/models/hospital.model';
import { HospitalsService } from 'src/app/core/services/hospitals.service';

@Component({
  selector: 'app-delete-hospital-dialog',
  templateUrl: './delete-hospital-dialog.component.html',
  styleUrls: ['./delete-hospital-dialog.component.scss'],
})
export class DeleteHospitalDialogComponent implements OnInit {
  @Input() hospital?: Hospital;

  constructor(
    private hospitalService: HospitalsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<DeleteHospitalDialogComponent>
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    const jwt = localStorage.getItem('jwt') || '';
    this.hospitalService
      .deleteHospital(jwt, this.hospital?.id as string)
      .subscribe({
        next: () => {
          this.toastrService.success(
            `Hospital ${this.hospital?.name} deleted successfully`,
            'Success',
            {
              icon: 'checkmark-circle-outline',
            }
          );
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
