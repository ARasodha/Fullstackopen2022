export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<Patient, 'id'>;
export type PatientsOmitSsn = Omit<Patient, 'ssn'>;