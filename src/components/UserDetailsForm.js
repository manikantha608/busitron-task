import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/UserDetailsForm.css";
import ProgressBar from "./ProgressBar";

const UserDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({ name: "", age: "", preferences: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.age || formData.age < 1) newErrors.age = "Valid age is required.";
    if (!formData.preferences.trim()) newErrors.preferences = "At least one interest is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(); 
    }
  };

  return (
    <div className="form-container">
      <ProgressBar currentStep={2} totalSteps={5}/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="user-details-form"
      >
        <h2>Tell us about yourself</h2>
        <form>
          <motion.div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </motion.div>
          <motion.div className="form-group">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="error-message">{errors.age}</p>}
          </motion.div>
          <motion.div className="form-group">
            <input
              type="text"
              name="preferences"
              placeholder="Interests"
              value={formData.preferences}
              onChange={handleChange}
            />
            {errors.preferences && <p className="error-message">{errors.preferences}</p>}
          </motion.div>
          <motion.button
            type="button"
            className="motion-button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            Next
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserDetailsForm;
