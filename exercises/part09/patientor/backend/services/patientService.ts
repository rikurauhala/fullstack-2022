import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatients = (): Array<Patient> => {
  return patients;
};

export default {
  addPatient,
  findById,
  getNonSensitivePatients,
  getPatients
};
