import React from 'react';

const TwoColumnPreview = ({ data, template }) => {
  return (
    <div className="bg-white p-8 shadow-2xl min-h-[842px] max-w-[595px] mx-auto">
      {/* Modern Two-Column Template */}
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-blue-50 p-6">
          {/* Profile Section */}
          {data.personalInfo.photo && (
            <div className="mb-6">
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white"
              />
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">CONTACT</h2>
            {data.personalInfo.email && (
              <div className="mb-2">
                <div className="font-medium">Email</div>
                <div className="text-sm">{data.personalInfo.email}</div>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="mb-2">
                <div className="font-medium">Phone</div>
                <div className="text-sm">{data.personalInfo.phone}</div>
              </div>
            )}
          </div>
          
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4">SKILLS</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="mb-2">
                    <div className="font-medium">{skill.name}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="w-2/3 p-6">
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {data.personalInfo.name || 'Your Name'}
            </h1>
            <h2 className="text-xl text-blue-600">
              {data.personalInfo.title || 'Professional Title'}
            </h2>
          </div>
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-3">PROFILE</h2>
              <p className="text-gray-600">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">EXPERIENCE</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-blue-600">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-2">{exp.company}</div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">EDUCATION</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-blue-600">{edu.year}</span>
                  </div>
                  <div className="text-gray-600">{edu.institution}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnPreview;