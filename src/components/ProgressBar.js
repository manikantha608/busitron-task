
import React from 'react';
import "../styles/ProgressBar.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">

      <div className="progress-bar-background">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>
      </div>

      {/* Dotted Progress Indicator */}
      <div className="progress-dots">
        {[...Array(totalSteps)].map((_, index) => (
          <span
            key={index}
            className={`progress-dot ${
              index < currentStep ? 'dot-active' : ''
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
