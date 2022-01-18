import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Hospital, Patient } from '@prisma/client';
import { CreatePatientDto, UpdatePatientDto } from 'src/patients/patients.dto';
import { PatientsService } from 'src/patients/patients.service';
import { CreateHospitalDto, UpdateHospitalDto } from './hospitals.dto';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private hospitalsService: HospitalsService,
    private patientsService: PatientsService,
  ) {}

  @Get()
  async getHospitals(@Query('name') name?: string): Promise<Hospital[]> {
    if (name) {
      return this.hospitalsService.getHospitalByName(name);
    }
    return this.hospitalsService.getHospitals();
  }

  @Get('/:id')
  async getHospital(@Param('id', ParseIntPipe) id: number): Promise<Hospital> {
    return this.hospitalsService.getHospital(id);
  }

  @Post()
  async createHospital(@Body() hospital: CreateHospitalDto): Promise<Hospital> {
    return this.hospitalsService.createHospital(hospital);
  }

  @Put('/:id')
  async updateHospital(
    @Param('id', ParseIntPipe) id: number,
    @Body() hospital: UpdateHospitalDto,
  ): Promise<any> {
    return this.hospitalsService.updateHospital(id, hospital);
  }

  @Delete('/:id')
  async deleteHospital(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.hospitalsService.deleteHospital(id);
  }

  @Get('/:id/patients')
  async getHospitalPatients(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Patient[]> {
    return this.patientsService.getPatientsByHospitalId(id);
  }

  @Get('/:id/patients/:patientId')
  async getHospitalPatient(
    @Param('id', ParseIntPipe) id: number,
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<Patient> {
    const patient = await this.patientsService.getPatient(patientId);
    if (patient.hospitalId !== id) {
      throw new Error('Patient not found');
    }
    return patient;
  }

  @Post('/:id/patients')
  async createHospitalPatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() patient: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientsService.createPatient(patient, id);
  }

  @Put('/:id/patients/:patientId')
  async updateHospitalPatient(
    @Param('id', ParseIntPipe) id: number,
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() patient: UpdatePatientDto,
  ): Promise<Patient> {
    const patientToUpdate = await this.patientsService.getPatient(patientId);
    if (patientToUpdate.hospitalId !== id) {
      throw new Error('Patient not found');
    }
    return this.patientsService.updatePatient(patientId, patient);
  }

  @Delete('/:id/patients/:patientId')
  async deleteHospitalPatient(
    @Param('id', ParseIntPipe) id: number,
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<Patient> {
    const patientToDelete = await this.patientsService.getPatient(patientId);
    if (patientToDelete.hospitalId !== id) {
      throw new Error('Patient not found');
    }
    return this.patientsService.deletePatient(patientId);
  }
}
