import React from 'react';
import { Gender } from '../types';


const GenderIcon = ({ gender }: { gender: Gender | undefined }) => { 
    switch (gender) {
        case 'female':
            return <i className="venus big icon"></i>;
        case 'male':
            return <i className="mars big icon"></i>;
        default:
            return <i className="genderless big icon"></i>;
    }
};

export default GenderIcon;