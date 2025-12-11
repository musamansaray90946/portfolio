import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 75 },
        { name: "TypeScript", level: 70 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 },
        { name: "MongoDB", level: 70 },
        { name: "Firebase", level: 75 },
        { name: "REST APIs", level: 80 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "Figma", level: 60 },
        { name: "Responsive Design", level: 85 },
        { name: "Problem Solving", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-container">
          {skillCategories.map((category) => (
            <div key={category.category} className="skill-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;