import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";

function ProjectCard({
  name = "E-Commerce Website",
  description = "Build a modern e-commerce platform with secure payments.",
  progress = 65,
  deadline = "Oct 25, 2026",
  risk = 72,
  tasks = 18,
  status = "Active",
  onClick,
}) {
  // Risk level
  const getRiskLevel = () => {
    if (risk >= 70) return "High Risk";
    if (risk >= 40) return "Medium Risk";
    return "Low Risk";
  };

  const getRiskClass = () => {
    if (risk >= 70) return "risk-high";
    if (risk >= 40) return "risk-medium";
    return "risk-low";
  };

  return (
    <div className="project-card" onClick={onClick}>

      {/* Top section */}
      <div className="project-card-top">

        <div className="project-icon">
          {name.charAt(0).toUpperCase()}
        </div>

        <button
          className="project-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={18} />
        </button>

      </div>

      {/* Project information */}
      <div className="project-card-content">

        <div className="project-title-row">

          <h3>{name}</h3>

          <span className="project-status">
            {status}
          </span>

        </div>

        <p>{description}</p>

      </div>

      {/* Progress */}
      <div className="project-progress-section">

        <div className="project-progress-header">

          <span>Progress</span>

          <strong>{progress}%</strong>

        </div>

        <div className="project-progress-bar">

          <div
            className="project-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

      </div>

      {/* Project details */}
      <div className="project-details">

        <div className="project-detail">

          <Calendar size={14} />

          <div>
            <span>Deadline</span>
            <strong>{deadline}</strong>
          </div>

        </div>

        <div className="project-detail">

          <CheckCircle2 size={14} />

          <div>
            <span>Tasks</span>
            <strong>{tasks}</strong>
          </div>

        </div>

      </div>

      {/* Risk */}
      <div className="project-risk">

        <div className="risk-info">

          <AlertTriangle size={15} />

          <span>{getRiskLevel()}</span>

        </div>

        <strong className={getRiskClass()}>
          {risk}/100
        </strong>

      </div>

      {/* View project */}
      <div className="project-view">

        <span>View project</span>

        <ArrowUpRight size={15} />

      </div>

    </div>
  );
}

export default ProjectCard;