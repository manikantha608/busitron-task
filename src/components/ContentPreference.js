import React from "react";
import { motion } from "framer-motion";
import { useCategory } from "../context/CategoryContext"; // Import the context
import ProgressBar from './ProgressBar';
import "../styles/ContentPreference.css"; 

const categories = [
  { id: 1, name: "Technology", icon: "💻" },
  { id: 2, name: "Health", icon: "🏋️" },
  { id: 3, name: "Travel", icon: "✈️" },
  { id: 4, name: "Education", icon: "📚" },
  { id: 5, name: "Entertainment", icon: "🎬" },
];

const ContentPreference = ({ onNext, onSkip }) => {
  const { selectedCategories, updateSelectedCategories } = useCategory(); // Use context

  const handleSelect = (category) => {
    updateSelectedCategories(category); // Pass full category object to update function
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="content-preference"
      >
        <ProgressBar currentStep={3} totalSteps={5} />
        <h2>Select Your Interests</h2>
        <motion.div
          className="categories"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`category-card ${selectedCategories.some(cat => cat.id === category.id) ? "selected" : ""}`}
              onClick={() => handleSelect(category)} // Pass full category object on select
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon">{category.icon}</span>
              <span className="name">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="actions">
          <button className="skip-btn" onClick={onSkip}>Skip</button>
          <button className="next-btn" onClick={onNext}>Next</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContentPreference;