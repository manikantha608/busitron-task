import React, { useState } from 'react';
import "../src/App.css"
import WelcomeScreen from './components/WelcomeScreen';
import UserDetailsForm from './components/UserDetailsForm';
import ContentPreference from './components/ContentPreference';
import CategoryRecommendations from './components/CategoryRecommendations';
import FinalScreen from './components/FinalScreen';

const App = () => {
  const [step, setStep] = useState(1);  

  const nextStep = () => setStep(step + 1);  

  const skipStep = () => setStep(step + 1);
  return (
    <div className="App">
     
      {step === 1 && <WelcomeScreen onNext={nextStep} />}  
      {step === 2 && <UserDetailsForm onNext={nextStep} />} 
      {step === 3 && <ContentPreference onNext={nextStep} onSkip={skipStep} />} 
      {step === 4 && <CategoryRecommendations onNext={nextStep} />} 
      {step === 5 && <FinalScreen />}  
    </div>
  );
};

export default App;
