import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/database/providers/prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './patients.dto';

@Injectable()
export class PatientsService {
  constructor(private prismaService: PrismaService) {}

  async getPatients(): Promise<Patient[]> {
    return this.prismaService.patient.findMany();
  }

  async getPatient(id: number): Promise<Patient> {
    return this.prismaService.patient.findUnique({ where: { id } });
  }

  async createPatient(
    patient: CreatePatientDto,
    hospitalId: number,
  ): Promise<Patient> {
    return this.prismaService.patient.create({
      data: { ...patient, hospitalId },
    });
  }

  async updatePatient(id: number, patient: UpdatePatientDto): Promise<Patient> {
    return this.prismaService.patient.update({
      where: { id },
      data: patient,
    });
  }
  async deletePatient(id: number): Promise<Patient> {
    return this.prismaService.patient.delete({ where: { id } });
  }

  async getPatientsByHospitalId(id: number): Promise<Patient[]> {
    return this.prismaService.patient.findMany({
      where: { hospital: { id } },
    });
  }
}
