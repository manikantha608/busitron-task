import React from "react";
import { motion } from "framer-motion";
import "../styles/FinalScreen.css";
import { useCategory } from "../context/CategoryContext"; 
import ProgressBar from "./ProgressBar";

const FinalScreen = () => {
  const { selectedCategories } = useCategory(); 
  console.log(selectedCategories,"SELECT")
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="final-screen"
    >
      <ProgressBar currentStep={5} totalSteps={5}/>
      <h2>Welcome to Your Personalized Experience!</h2>
      <p>Here are your selected categories:</p>
      <div className="selected-categories">
        {selectedCategories && selectedCategories.length > 0 ? (
          // selectedCategories[1].map((category, index) => (
          //   <motion.div
          //     key={index}
          //     className="category-chip"
          //     initial={{ x: -50, opacity: 0 }}
          //     animate={{ x: 0, opacity: 1 }}
          //     transition={{ delay: index * 0.1 }}
          //   >
          //     {category.icon}
          //     {category.name}
          //   </motion.div>
          // ))
          selectedCategories[1] && selectedCategories[1].length >0?(
            selectedCategories[1].map((category, index) => (
              <motion.div
                key={index}
                className="category-chip"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {category.icon}
                {category.name}
              </motion.div>
            ))
          ):(
            selectedCategories.map((category, index) => (
              <motion.div
                key={index}
                className="category-chip"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {category.icon}
                {category.name}
              </motion.div>
            ))
          )
        ) :
         (
          <p>No categories selected. You can update your preferences later.</p>
        )}
      </div>
      <motion.button
        className="finish-btn"
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        Finish
      </motion.button>
    </motion.div>
  );
};

export default FinalScreen;
