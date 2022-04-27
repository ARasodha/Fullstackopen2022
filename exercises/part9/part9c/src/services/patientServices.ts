import patients from "../../data/patients";
import { Patient, PatientsOmitSsn, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
} 

const getPatientsOmitSsn = (): Array<PatientsOmitSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

export default {
  getPatients,
  getPatientsOmitSsn,
  addPatient
}
