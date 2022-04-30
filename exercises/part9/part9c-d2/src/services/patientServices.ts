import patients from "../../data/patients";
import { Patient, NewPatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients
}

const getPatient = (id: string): PublicPatient | undefined => {
  return patients.find(patient => patient.id === id);
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
} 

const getPatientsOmitSsn = (): Array<Patient> => {
  return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
    entries,
  }))
}

export default {
  getPatients,
  getPatient,
  getPatientsOmitSsn,
  addPatient
}
