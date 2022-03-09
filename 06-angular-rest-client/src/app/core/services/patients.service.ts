import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private httpClient: HttpClient) {}

  getPatientsByHospitalId(hospitalId: string, jwt: string) {
    return this.httpClient.get<Patient>(
      `${environment.apiHost}/hospitals/${hospitalId}/patients`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }

  getPatientById(hospitalId: string, patientId: string, jwt: string) {
    return this.httpClient.get<Patient>(
      `${environment.apiHost}/hospitals/${hospitalId}/patients/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }

  createPatient(hospitalId: string, patient: Patient, jwt: string) {
    return this.httpClient.post<Patient>(
      `${environment.apiHost}/hospitals/${hospitalId}/patients`,
      patient,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }

  updatePatient(
    hospitalId: string,
    patientId: string,
    patient: Patient,
    jwt: string
  ) {
    return this.httpClient.put<Patient>(
      `${environment.apiHost}/hospitals/${hospitalId}/patients/${patientId}`,
      patient,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }

  deletePatient(hospitalId: string, patientId: string, jwt: string) {
    return this.httpClient.delete<Patient>(
      `${environment.apiHost}/hospitals/${hospitalId}/patients/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }

  getAllPatients(jwt: string) {
    return this.httpClient.get<Patient[]>(`${environment.apiHost}/patients`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}
