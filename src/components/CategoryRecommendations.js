import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecommendations } from "../api/recommendations";  
import "../styles/CategoryRecommendations.css";
import { useCategory } from "../context/CategoryContext"; 
import ProgressBar from "./ProgressBar";

const CategoryRecommendations = ({ onNext, onSelectAll }) => {
  const { selectedCategories, updateSelectedCategories } = useCategory(); 
  console.log(selectedCategories, "Selected Categories");

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecommendations();
      setCategories(data);  
    };
    fetchData();
  }, []);

  // Handle selecting all categories
  const handleSelectAll = () => {
    updateSelectedCategories(categories);  
    if (onSelectAll) onSelectAll(categories); 
  };

  // Handle the Next button click
  const handleNext = () => {
    if (onNext) onNext(selectedCategories); 
  };

  // Toggle the selection of a category
  const toggleCategorySelection = (category) => {
    const isSelected = selectedCategories.some((cat) => cat.id === category.id);
    const updatedSelection = isSelected
      ? selectedCategories.filter((cat) => cat.id !== category.id)
      : [...selectedCategories, category];  

    updateSelectedCategories(updatedSelection); 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="category-recommendations"
    >
    
      <ProgressBar currentStep={4} totalSteps={5} />
      <h2>Recommended Categories</h2>
      <motion.div
        className="recommendations"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >

        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className={`recommendation-card ${
              selectedCategories.some((selected) => selected.id === cat.id) ? "selected" : ""
            }`}
            onClick={() => toggleCategorySelection(cat)}  
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="ai-tag">AI Suggested</div>
            <div className="icon">{cat.icon}</div>
            <div className="name">{cat.name}</div>
          </motion.div>
        ))}
      </motion.div>
      <div className="actions">
       
        <motion.button
          className="select-all-btn"
          onClick={handleSelectAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Select All
        </motion.button>
  
        <motion.button
          className="next-btn"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategoryRecommendations;
