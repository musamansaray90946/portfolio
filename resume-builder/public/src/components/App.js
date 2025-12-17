import React, { useState } from 'react';
import { Download, Printer, Save, Share2, Columns, User, Briefcase, GraduationCap, Award, Code, Globe, Mail, Phone, MapPin, Linkedin, Github, Plus, Trash2 } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      title: 'Software Developer',
      email: 'john.doe@example.com',
      phone: '+1 (123) 456-7890',
      address: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Experienced software developer with 5+ years of expertise in building web applications. Passionate about clean code and user-centered design.',
    experience: [
      {
        id: 1,
        position: 'Senior Frontend Developer',
        company: 'Tech Corp Inc.',
        startDate: '2020',
        endDate: 'Present',
        description: 'Led a team of 5 developers in building responsive web applications using React and Node.js.'
      },
      {
        id: 2,
        position: 'Web Developer',
        company: 'Digital Solutions',
        startDate: '2018',
        endDate: '2020',
        description: 'Developed and maintained client websites using modern web technologies.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'State University',
        year: '2018'
      }
    ],
    skills: [
      { id: 1, name: 'React', level: 90 },
      { id: 2, name: 'JavaScript', level: 95 },
      { id: 3, name: 'Node.js', level: 85 },
      { id: 4, name: 'Tailwind CSS', level: 88 },
      { id: 5, name: 'Git', level: 92 }
    ],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce solution with React and Express'
      }
    ]
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isTwoColumn, setIsTwoColumn] = useState(true);

  // Update personal information
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Update summary
  const updateSummary = (value) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  };

  // Add new experience
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  // Update experience
  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Delete experience
  const deleteExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Add new skill
  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 50
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  // Update skill
  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  // Delete skill
  const deleteSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  // Download PDF function
  const handleDownload = () => {
    alert('PDF download feature would be implemented with jsPDF library');
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved to browser storage!');
  };

  // Export as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'resume-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Load from JSON
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setResumeData(data);
          alert('Resume data loaded successfully!');
        } catch (error) {
          alert('Error loading file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ResumeBuilder Pro</h1>
                <p className="text-sm text-gray-600">Create Professional Resumes For Free</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsTwoColumn(!isTwoColumn)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${isTwoColumn ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
              >
                <Columns size={18} />
                <span>{isTwoColumn ? 'Two Columns' : 'Single Column'}</span>
              </button>
              
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2 border border-green-600"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 flex items-center space-x-2 border border-blue-600"
              >
                <Download size={18} />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2 border border-gray-700"
              >
                <Printer size={18} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Template Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Choose a Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['modern', 'classic', 'executive', 'creative'].map((template) => (
              <button
                key={template}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${selectedTemplate === template ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className={`h-24 rounded-lg mb-3 flex items-center justify-center ${
                  template === 'modern' ? 'bg-gradient-to-r from-blue-500 to-blue-700' :
                  template === 'classic' ? 'bg-gradient-to-r from-gray-600 to-gray-800' :
                  template === 'executive' ? 'bg-gradient-to-r from-green-500 to-green-700' :
                  'bg-gradient-to-r from-purple-500 to-purple-700'
                }`}>
                  <span className="text-white font-bold text-lg">CV</span>
                </div>
                <div className="font-medium text-gray-700">
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <div className="space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <User className="mr-2" size={24} />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Professional Title</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                    placeholder="e.g., Software Developer"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center">
                      <Mail size={16} className="mr-2" /> Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center">
                      <Phone size={16} className="mr-2" /> Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Professional Summary</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    placeholder="Write a brief summary of your professional experience..."
                  />
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Briefcase className="mr-2" size={24} />
                  Work Experience
                </h2>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Experience</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-700">Experience #{exp.id}</h3>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600">Position</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="e.g., Senior Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600">Company</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company name"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600">Start Date</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="e.g., 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600">End Date</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="Present or Year"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-600">Description</label>
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded min-h-[80px]"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Code className="mr-2" size={24} />
                  Skills
                </h2>
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Skill</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex justify-between items-center mb-3">
                      <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded text-lg font-medium"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        placeholder="Skill name"
                      />
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-blue-600 font-bold w-12 text-right">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Live Preview</h2>
              
              {/* Resume Preview Container */}
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white">
                {/* Two-Column Resume Design */}
                <div className="flex">
                  {/* Left Column (Sidebar) */}
                  <div className="w-1/3 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6">
                    {/* Profile */}
                    <div className="mb-8">
                      <div className="w-32 h-32 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4 border-4 border-blue-300">
                        <User size={48} className="text-blue-200" />
                      </div>
                      <h1 className="text-2xl font-bold text-center mb-2">{resumeData.personalInfo.name}</h1>
                      <p className="text-blue-200 text-center">{resumeData.personalInfo.title}</p>
                    </div>
                    
                    {/* Contact */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-blue-700">CONTACT</h3>
                      <div className="space-y-3">
                        {resumeData.personalInfo.email && (
                          <div className="flex items-start">
                            <Mail size={16} className="text-blue-300 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{resumeData.personalInfo.email}</span>
                          </div>
                        )}
                        {resumeData.personalInfo.phone && (
                          <div className="flex items-start">
                            <Phone size={16} className="text-blue-300 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{resumeData.personalInfo.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-blue-700">SKILLS</h3>
                      <div className="space-y-3">
                        {resumeData.skills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-blue-300">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-blue-700 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-blue-300 to-blue-400 h-1.5 rounded-full"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column (Main Content) */}
                  <div className="w-2/3 p-6">
                    {/* Summary */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">PROFESSIONAL SUMMARY</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {resumeData.summary}
                      </p>
                    </div>
                    
                    {/* Experience */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        WORK EXPERIENCE
                      </h3>
                      <div className="space-y-6">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-lg text-gray-800">{exp.position}</h4>
                              <span className="text-blue-600 font-medium">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                            <p className="text-gray-700">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Education */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        EDUCATION
                      </h3>
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <div className="flex justify-between">
                            <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                            <span className="text-blue-600">{edu.year}</span>
                          </div>
                          <p className="text-gray-600">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Preview Status */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">Live Preview Active</p>
                    <p className="text-sm text-gray-500">All changes update in real-time</p>
                  </div>
                  <div className="flex space-x-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {isTwoColumn ? 'Two Columns' : 'Single Column'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Export Options Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Export Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleDownload}
                  className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 flex items-center justify-center space-x-2 transition"
                >
                  <Download size={20} />
                  <span>Download as PDF</span>
                </button>
                
                <button
                  onClick={handleExport}
                  className="p-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 flex items-center justify-center space-x-2 transition"
                >
                  <Share2 size={20} />
                  <span>Export as JSON</span>
                </button>
                
                <label className="p-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center space-x-2 transition cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                  <span>Import JSON</span>
                </label>
                
                <button
                  onClick={handlePrint}
                  className="p-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg hover:from-gray-700 hover:to-gray-900 flex items-center justify-center space-x-2 transition"
                >
                  <Printer size={20} />
                  <span>Print Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-blue-600 font-bold text-xl mb-3">Two-Column Design</div>
              <p className="text-gray-600">Professional two-column layout that stands out to employers.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="text-green-600 font-bold text-xl mb-3">Real-time Editing</div>
              <p className="text-gray-600">See changes instantly as you edit. No waiting, no reloading.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="text-purple-600 font-bold text-xl mb-3">Multiple Templates</div>
              <p className="text-gray-600">Choose from various professional templates for any industry.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Free Online Resume Builder</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Create professional resumes for free. Perfect for job seekers, students, and professionals.
              No sign-up required. Built with React and Tailwind CSS.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-400 hover:text-blue-300">GitHub</a>
              <a href="#" className="text-blue-400 hover:text-blue-300">Portfolio</a>
              <a href="#" className="text-blue-400 hover:text-blue-300">Contact</a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Perfect for your portfolio project • 100% Free • No Ads
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;