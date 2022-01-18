import { Patient } from "../models/patient.model";
import { FilesService } from "./files.service";

export class PatientsService {
  constructor(private fileService: FilesService<Patient>) {}

  async getPatients(): Promise<Patient[]> {
    return this.fileService.read();
  }

  async getPatient(id: number): Promise<Patient> {
    const patients = await this.getPatients();
    const patient = patients.find((patient) => patient.id == id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  }

  async createPatient(patient: Patient): Promise<Patient> {
    const patients = await this.getPatients();
    const newPatient = { ...patient, id: patients.length + 1 };
    patients.push(newPatient);
    await this.fileService.write(patients);
    return newPatient;
  }

  async updatePatient(id: number, patient: Patient): Promise<Patient> {
    const patients = await this.getPatients();
    const index = patients.findIndex((patient) => patient.id == id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    patients[index] = patient;
    await this.fileService.write(patients);
    return patient;
  }

  async deletePatient(id: number): Promise<Patient> {
    const patients = await this.getPatients();
    const index = patients.findIndex((patient) => patient.id == id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    const deletedPatient = patients.splice(index, 1)[0];
    await this.fileService.write(patients);
    return deletedPatient;
  }

  async getPatientsByHospital(idHospital: number): Promise<Patient[]> {
    const patients = await this.getPatients();
    const patientsByHospital = patients.filter(
      (patient) => patient.hospitalId == idHospital
    );
    return patientsByHospital;
  }
}
