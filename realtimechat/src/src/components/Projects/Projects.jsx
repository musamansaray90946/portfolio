import React from 'react';
import { projects } from '../../projects-data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image || "/assets/images/project-placeholder.png"} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-external-link-alt"></i> Live
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fab fa-github"></i> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;