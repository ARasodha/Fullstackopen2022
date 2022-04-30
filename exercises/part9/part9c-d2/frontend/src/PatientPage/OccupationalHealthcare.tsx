import React from 'react';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
    
  return (
    <div>
    <p>{entry.date} {entry.description}</p> {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => (
        <ul key={code}>
          <li>
            {code} {diagnosis[code].name}
          </li>
        </ul>
      )) : null}
    <p>diagnose by {entry.specialist}</p>
  </div>
  );
};

export default OccupationalHealthcare;