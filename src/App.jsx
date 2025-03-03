import { useState } from "react";

const skillsData = {
  Frontend: ["React", "Angular", "Vue"],
  Backend: ["Node.js", "Django", "Spring Boot"],
  Cloud: ["AWS", "Azure", "GCP"],
};

export default function NestedCheckboxes() {
  const [selectedSkills, setSelectedSkills] = useState({});
  const [parentSelected, setParentSelected] = useState({});

  const toggleParent = (category) => {
    //updating the selected parent
    setParentSelected((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleChild = (category, skill) => {
    setSelectedSkills((prev) => {
      const prevSelected = prev[category] || [];
  
      // Check if skill is already selected
      const isSelected = prevSelected.includes(skill);
      const updatedSelection = isSelected
        ? prevSelected.filter((s) => s !== skill) // Remove skill
        : [...prevSelected, skill]; // Add skill
  
      // Check if all children are now selected
      if (updatedSelection.length === skillsData[category].length) {
        setParentSelected((prev) => ({ ...prev, [category]: true }));
        return { ...prev, [category]: [] }; // Deselect all children
      }
  
      // Otherwise, just update child selection
      setParentSelected((prev) => ({ ...prev, [category]: false }));
      return { ...prev, [category]: updatedSelection };
    });
  };
  

  return (
    <div className="p-4 w-96 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold mb-2">Select Skills</h2>
      {Object.keys(skillsData).map((category) => (
        <div key={category} className="mb-2">
          <label className="flex items-center space-x-2 font-semibold">
            <input
              type="checkbox"
              checked={parentSelected[category] || false}
              onChange={() => toggleParent(category)}
              className="accent-blue-500"
            />
            <span>{category}</span>
          </label>
          <div className="pl-6">
            {skillsData[category].map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSkills[category]?.includes(skill) || false}
                  onChange={() => toggleChild(category, skill)}
                  className="accent-blue-500"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}