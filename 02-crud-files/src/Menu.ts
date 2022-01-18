import inquirer from "inquirer";
import { Console } from "./Console";
import { Hospital } from "./models/hospital.model";
import { Patient } from "./models/patient.model";
import { HospitalService } from "./services/hospital.service";
import { PatientsService } from "./services/patients.service";

export class Menu {
  public customConsole = new Console();

  constructor(
    private readonly hospitalService: HospitalService,
    private readonly patientService: PatientsService
  ) {}

  public async printMainOptions() {
    const { option } = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Choose an option",
      choices: [
        { name: "Hospitals", value: "hospitals" },
        { name: "Patients", value: "patients" },
        { name: "Exit", value: "exit" },
      ],
    });

    switch (option) {
      case "hospitals":
        this.printHospitalOptions();
        break;
      case "patients":
        this.printPatientOptions();
        break;
      case "exit":
        process.exit();
      default:
        this.printMainOptions();
    }
  }

  public async printHospitalOptions() {
    const { option } = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Choose an option",
      choices: [
        { name: "Add a hospital", value: "add" },
        { name: "Remove a hospital", value: "remove" },
        { name: "Update a hospital", value: "update" },
        { name: "Show all hospitals", value: "show" },
        { name: "Show patients", value: "patients" },
        { name: "Return to main menu", value: "return" },
      ],
    });

    switch (option) {
      case "add":
        const { name, address, phone, email, website } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the name of the hospital",
          },
          {
            type: "input",
            name: "address",
            message: "Enter the address of the hospital",
          },
          {
            type: "input",
            name: "phone",
            message: "Enter the phone of the hospital",
          },
          {
            type: "input",
            name: "email",
            message: "Enter the email of the hospital",
          },
          {
            type: "input",
            name: "website",
            message: "Enter the website of the hospital",
          },
        ]);
        const hospital: Hospital = {
          name,
          address,
          phone,
          email,
          website,
        };
        await this.hospitalService.createHospital(hospital);
        break;
      case "remove":
        const { id } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter the id of the hospital",
        });
        await this.hospitalService.deleteHospital(id);
        break;
      case "update":
        const { id: idUpdate } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter the id of the hospital",
        });
        const hospitalToUpdate = await this.hospitalService.getHospital(
          idUpdate
        );
        if (!hospitalToUpdate) {
          this.customConsole.error("Hospital not found");
          return;
        }
        this.customConsole.info("Please enter the new values, enter to skip");
        const {
          nameUpdate,
          addressUpdate,
          phoneUpdate,
          emailUpdate,
          websiteUpdate,
        } = await inquirer.prompt([
          {
            type: "input",
            name: "nameUpdate",
            message: "Enter the name of the hospital",
            default: hospitalToUpdate.name,
          },
          {
            type: "input",
            name: "addressUpdate",
            message: "Enter the address of the hospital",
            default: hospitalToUpdate.address,
          },
          {
            type: "input",
            name: "phoneUpdate",
            message: "Enter the phone of the hospital",
            default: hospitalToUpdate.phone,
          },
          {
            type: "input",
            name: "emailUpdate",
            message: "Enter the email of the hospital",
            default: hospitalToUpdate.email,
          },
          {
            type: "input",
            name: "websiteUpdate",
            message: "Enter the website of the hospital",
            default: hospitalToUpdate.website,
          },
        ]);
        const hospitalUpdated: Hospital = {
          id: idUpdate,
          name: nameUpdate,
          address: addressUpdate,
          phone: phoneUpdate,
          email: emailUpdate,
          website: websiteUpdate,
          created_at: hospitalToUpdate.created_at,
        };
        await this.hospitalService.updateHospital(idUpdate, hospitalUpdated);
        this.customConsole.success("Hospital updated");
        break;
      case "show":
        const hospitals = await this.hospitalService.getHospitals();
        console.log(hospitals);
        break;
      case "patients":
        const { id: idHospital } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter the id of the hospital",
        });
        const patients = await this.patientService.getPatientsByHospital(
          idHospital
        );
        console.log(patients);
      case "return":
        break;
      default:
        this.printHospitalOptions();
    }
    this.printMainOptions();
  }

  public async printPatientOptions() {
    const { option } = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Choose an option",
      choices: [
        { name: "Add a patient", value: "add" },
        { name: "Remove a patient", value: "remove" },
        { name: "Update a patient", value: "update" },
        { name: "Show all patients", value: "show" },
        { name: "Return to main menu", value: "return" },
      ],
    });

    switch (option) {
      case "add":
        const { name, lastName, age, identityNumber, birthDate, hospitalId } =
          await inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "Enter the name of the patient",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter the last name of the patient",
            },
            {
              type: "input",
              name: "age",
              message: "Enter the age of the patient",
            },
            {
              type: "input",
              name: "identityNumber",
              message: "Enter the identity number of the patient",
            },
            {
              type: "input",
              name: "birthDate",
              message: "Enter the birth date of the patient",
            },
            {
              type: "input",
              name: "hospitalId",
              message: "Enter the hospital id of the patient",
            },
          ]);
        const patient: Patient = {
          name,
          lastName,
          age,
          identityNumber,
          birthDate,
          hospitalId,
        };
        await this.patientService.createPatient(patient);
        break;
      case "remove":
        const { id } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter the id of the patient",
        });
        await this.patientService.deletePatient(id);
        break;
      case "update":
        const { id: idUpdate } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter the id of the patient",
        });
        const patientToUpdate = await this.patientService.getPatient(idUpdate);
        if (!patientToUpdate) {
          this.customConsole.error("Patient not found");
          return;
        }
        this.customConsole.info("Please enter the new values, enter to skip");
        const {
          nameUpdate,
          lastNameUpdate,
          ageUpdate,
          identityNumberUpdate,
          birthDateUpdate,
          hospitalIdUpdate,
        } = await inquirer.prompt([
          {
            type: "input",
            name: "nameUpdate",
            message: "Enter the name of the patient",
            default: patientToUpdate.name,
          },
          {
            type: "input",
            name: "lastNameUpdate",
            message: "Enter the last name of the patient",
            default: patientToUpdate.lastName,
          },
          {
            type: "input",
            name: "ageUpdate",
            message: "Enter the age of the patient",
            default: patientToUpdate.age,
          },
          {
            type: "input",
            name: "identityNumberUpdate",
            message: "Enter the identity number of the patient",
            default: patientToUpdate.identityNumber,
          },
          {
            type: "input",
            name: "birthDateUpdate",
            message: "Enter the birth date of the patient",
            default: patientToUpdate.birthDate,
          },
          {
            type: "input",
            name: "hospitalIdUpdate",
            message: "Enter the hospital id of the patient",
            default: patientToUpdate.hospitalId,
          },
        ]);
        const patientUpdated: Patient = {
          id: idUpdate,
          name: nameUpdate,
          lastName: lastNameUpdate,
          age: ageUpdate,
          identityNumber: identityNumberUpdate,
          birthDate: birthDateUpdate,
          hospitalId: hospitalIdUpdate,
          created_at: patientToUpdate.created_at,
        };
        await this.patientService.updatePatient(idUpdate, patientUpdated);
        this.customConsole.success("Patient updated");
        break;
      case "show":
        const patients = await this.patientService.getPatients();
        console.log(patients);
        break;
      case "return":
        break;
      default:
        this.printPatientOptions();
    }
    this.printMainOptions();
  }
}
