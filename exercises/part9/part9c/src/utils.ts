import { NewPatientEntry, Gender} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
}

const parseDob = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return  Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation } : Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDob(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
}

export default toNewPatientEntry;