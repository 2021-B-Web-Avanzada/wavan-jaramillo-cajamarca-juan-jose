import { Module } from '@nestjs/common';
import { PatientsModule } from 'src/patients/patients.module';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';

@Module({
  controllers: [HospitalsController],
  imports: [PatientsModule],
  providers: [HospitalsService],
})
export class HospitalsModule {}
