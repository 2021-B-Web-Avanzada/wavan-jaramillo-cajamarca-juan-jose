import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientsService } from 'src/app/core/services/patients.service';

@Component({
  selector: 'app-delete-patient-dialog',
  templateUrl: './delete-patient-dialog.component.html',
  styleUrls: ['./delete-patient-dialog.component.scss'],
})
export class DeletePatientDialogComponent implements OnInit {
  @Input() patient?: Patient;

  constructor(
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<DeletePatientDialogComponent>
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    const jwt = localStorage.getItem('jwt') || '';
    this.patientService
      .deletePatient(
        this.patient?.hospitalId as string,
        this.patient?.id as string,
        jwt
      )
      .subscribe({
        next: () => {
          this.toastrService.success(
            `Patient ${this.patient?.name} deleted successfully`,
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
