import { Hospital } from "../models/hospital.model";
import { FilesService } from "./files.service";

export class HospitalService {
  constructor(private fileService: FilesService<Hospital>) {}

  async getHospitals(): Promise<Hospital[]> {
    return this.fileService.read();
  }

  async getHospital(id: number): Promise<Hospital | null> {
    const hospitals = await this.getHospitals();
    const hospital = hospitals.find((hospital) => hospital.id == id);
    if (!hospital) {
      return null;
    }
    return hospital;
  }

  async createHospital(hospital: Hospital): Promise<Hospital> {
    const hospitals = await this.getHospitals();
    const newHospital = {
      id: hospitals.length + 1,
      ...hospital,
      created_at: new Date().toJSON(),
      updated_at: new Date().toJSON(),
    };
    hospitals.push(newHospital);
    await this.fileService.write(hospitals);
    return newHospital;
  }

  async updateHospital(id: number, hospital: Hospital): Promise<Hospital> {
    const hospitals = await this.getHospitals();
    const index = hospitals.findIndex((h) => h.id == id);
    if (index === -1) {
      throw new Error("Hospital not found");
    }
    hospitals[index] = {
      ...hospital,
      updated_at: new Date().toJSON(),
    };
    await this.fileService.write(hospitals);
    return hospital;
  }

  async deleteHospital(id: number): Promise<void> {
    const hospitals = await this.getHospitals();
    const index = hospitals.findIndex((h) => h.id == id);
    if (index === -1) {
      throw new Error("Hospital not found");
    }
    hospitals.splice(index, 1);
    await this.fileService.write(hospitals);
  }
}
