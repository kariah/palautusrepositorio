import React from 'react';

import { HealthCheckRating } from '../types';

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <i className="heart small green icon"></i>;
      case HealthCheckRating.LowRisk:
        return <i className="heart small yellow icon"></i>;
      case HealthCheckRating.HighRisk:
        return <i className="heart small blue icon"></i>;
      case HealthCheckRating.CriticalRisk:
        return <i className="heart small red icon"></i>;
      default:
        return <></>;
    }
  };

  export default HealthCheckRatingIcon;