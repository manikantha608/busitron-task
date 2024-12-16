import React, { useContext, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchRecommendations } from "../api/recommendations";
import "../styles/CategoryRecommendations.css";
import ProgressBar from "./ProgressBar";
import { CategoryContext } from "../context/CategoryContext";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CategoryRecommendations = ({ onNext }) => {
  const { selectedCategories, setSelectedCategories } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const output = selectedCategories.length
        ? selectedCategories.map((obj) => obj.name).join(",")
        : "";
      const data = await fetchRecommendations(output);
      data.pop();
      const newData = data.map((item, index) => ({ id: index, name: item }));
      setCategories(newData);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [selectedCategories]);

  useEffect(() => {
    debouncedFetchData();
  }, []);

  const toggleCategorySelection = (category) => {
    console.log(category.id);
    setSelectedCategories((prev) =>
      prev.some((item) => item.id === category.id)
        ? prev.filter((item) => item.id !== category.id)
        : [...prev, category]
    );
  };

  const handleSelectAll = () => {
    setSelectedCategories((prev) => [...prev, ...categories]);
  };

  const handleNext = () => {
    if (onNext) onNext(selectedCategories);
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
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <motion.div
          className="recommendations"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className={`recommendation-card ${
                selectedCategories.some((item) => item.id === cat.id) ? "selected" : ""
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
              <div className="name">{cat.name}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
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
