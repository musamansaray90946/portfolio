import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

const EditorPanel = ({ resumeData, updateResumeData }) => {
  const sections = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoForm },
    { id: 'summary', title: 'Professional Summary', component: () => (
      <div>
        <label className="block mb-2 font-medium">Summary</label>
        <textarea 
          className="w-full p-3 border rounded-lg"
          rows="4"
          value={resumeData.summary}
          onChange={(e) => updateResumeData('summary', e.target.value)}
          placeholder="Enter your professional summary..."
        />
      </div>
    )},
    { id: 'experience', title: 'Work Experience', component: ExperienceForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Your Resume</h2>
      
      <div className="space-y-8">
        {sections.map((section) => {
          const SectionComponent = section.component;
          return (
            <div key={section.id} className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {section.title}
              </h3>
              <SectionComponent 
                data={resumeData[section.id] || resumeData[section.id + 'Info']}
                updateData={(data) => updateResumeData(section.id, data)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorPanel;