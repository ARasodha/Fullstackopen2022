import patients from "../../data/patients";
import { Patients, PatientsOmitSsn } from '../types';

const getPatients = (): Array<Patients> => {
  return patients
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
  getPatientsOmitSsn
}
