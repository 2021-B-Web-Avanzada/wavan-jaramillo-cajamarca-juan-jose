import { Injectable } from '@nestjs/common';
import { Hospital, Patient } from '@prisma/client';
import { PrismaService } from 'src/database/providers/prisma/prisma.service';
import { CreateHospitalDto, UpdateHospitalDto } from './hospitals.dto';

@Injectable()
export class HospitalsService {
  constructor(private prismaService: PrismaService) {}

  async getHospitals(): Promise<Hospital[]> {
    return this.prismaService.hospital.findMany();
  }

  async getHospital(id: number): Promise<Hospital> {
    return this.prismaService.hospital.findUnique({ where: { id } });
  }

  async createHospital(hospital: CreateHospitalDto): Promise<Hospital> {
    return this.prismaService.hospital.create({ data: hospital });
  }

  async updateHospital(
    id: number,
    hospital: UpdateHospitalDto,
  ): Promise<Hospital> {
    return this.prismaService.hospital.update({
      where: { id },
      data: hospital,
    });
  }

  async deleteHospital(id: number): Promise<Hospital> {
    return this.prismaService.hospital.delete({ where: { id } });
  }

  async getHospitalByName(name: string): Promise<Hospital[]> {
    return this.prismaService.hospital.findMany({
      where: { name: { contains: name } },
    });
  }

  async getHospitalPatients(id: number): Promise<Patient[]> {
    return this.prismaService.patient.findMany({
      where: { hospital: { id } },
    });
  }
}
