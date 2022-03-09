import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  constructor(private httpClient: HttpClient) {}

  getHospitals(jwtToken: string) {
    return this.httpClient.get<Hospital[]>(`${environment.apiHost}/hospitals`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }

  getHospitalById(jwtToken: string, id: string) {
    return this.httpClient.get<Hospital>(
      `${environment.apiHost}/hospitals/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  }

  createHospital(jwtToken: string, hospital: Hospital) {
    return this.httpClient.post<Hospital>(
      `${environment.apiHost}/hospitals`,
      hospital,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  }

  updateHospital(jwtToken: string, hospitalId: string, hospital: Hospital) {
    return this.httpClient.put<Hospital>(
      `${environment.apiHost}/hospitals/${hospitalId}`,
      hospital,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  }

  deleteHospital(jwtToken: string, id: string) {
    return this.httpClient.delete<Hospital>(
      `${environment.apiHost}/hospitals/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  }
}
