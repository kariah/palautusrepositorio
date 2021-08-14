import React from 'react';

const EntryIcon = ({ entryType }: { entryType: string }) => {
    switch (entryType) {
      case 'HealthCheck':
        return <i className="stethoscope big icon"></i>;
      case 'OccupationalHealthcare':
        return <i className="user md big icon"></i>;
      case 'Hospital':
        return <i className="hospital outline big icon"></i>;
      default:
        return <i className="genderless big icon"></i>;
    }
  }; 

  export default EntryIcon;