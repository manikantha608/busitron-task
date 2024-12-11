
import React from 'react';
import { motion } from 'framer-motion';
import "../styles/WelcomeScreen.css";  
import ProgressBar from './ProgressBar';

const WelcomeScreen = ({ onNext }) => (
  <div className="welcome-screen">
    <ProgressBar currentStep={1} totalSteps={5}/>
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Welcome to Our Platform!</h1>
      <p>Explore, learn, and grow with us.</p>
      <button className="get-started" onClick={onNext}>
        Get Started
      </button>
    </motion.div>
    
  </div>
);

export default WelcomeScreen;
