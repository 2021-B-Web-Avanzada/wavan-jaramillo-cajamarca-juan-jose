import { join } from "path";
import { Menu } from "./src/Menu";
import { Hospital } from "./src/models/hospital.model";
import { Patient } from "./src/models/patient.model";
import { FilesService } from "./src/services/files.service";
import { HospitalService } from "./src/services/hospital.service";
import { PatientsService } from "./src/services/patients.service";

const hospitalFileService = new FilesService<Hospital>(
  join(__dirname, "data", "hospitals.data")
);
const hospitalService = new HospitalService(hospitalFileService);

const patientFileService = new FilesService<Patient>(
  join(__dirname, "data", "patients.data")
);
const patientService = new PatientsService(patientFileService);

const main = async () => {
  const menu = new Menu(hospitalService, patientService);
  await menu.printMainOptions();
};

main();
