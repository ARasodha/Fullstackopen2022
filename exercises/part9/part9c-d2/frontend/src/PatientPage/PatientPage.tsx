import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import PatientEntry from './PatientEntry';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();

  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  if (!patient) {
    return (
      <div>
        No patient with that id
      </div>
    );
  }

    return (
      <div>
        <h2>
          {patient.name} 
        </h2>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(entry => (
          <PatientEntry key={entry.id} entry={entry} />
        ))}
      </div>
    );

};

export default PatientPage;