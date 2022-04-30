import React from 'react';
import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';

const HealthCheck: React.FC<{entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <div>
    <p>{entry.date} {entry.description}</p>
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => (
        <ul key={code}>
          <li>
            {code} {diagnosis[code].name}
          </li>
          <li>
            diagnose by {entry.specialist}
          </li>
        </ul>
      )) : null}
  </div>
  );
};

export default HealthCheck;