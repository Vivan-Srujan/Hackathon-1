import {
  Calendar,
  MoreHorizontal,
  Clock,
  User,
} from "lucide-react";

function TaskCard({
  title = "Payment Integration",
  description = "Integrate the payment gateway into the application.",
  priority = "High",
  status = "In Progress",
  assignee = "SS",
  deadline = "Oct 11",
  estimatedHours = 6,
  onClick,
}) {
  const priorityClass = priority.toLowerCase();

  return (
    <div
      className="task-card-component"
      onClick={onClick}
    >

      {/* Top */}
      <div className="task-card-top">

        <span className={`task-priority ${priorityClass}`}>
          {priority}
        </span>

        <button
          className="task-more"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={17} />
        </button>

      </div>

      {/* Content */}
      <div className="task-card-content">

        <h4>{title}</h4>

        <p>{description}</p>

      </div>

      {/* Footer */}
      <div className="task-card-footer">

        <div className="task-meta">

          <span>
            <Calendar size={13} />
            {deadline}
          </span>

          <span>
            <Clock size={13} />
            {estimatedHours}h
          </span>

        </div>

        <div
          className="task-assignee"
          title={`Assigned to ${assignee}`}
        >
          {assignee}
        </div>

      </div>

      {/* Status */}
      <div className="task-status">

        <User size={12} />

        <span>{status}</span>

      </div>

    </div>
  );
}

export default TaskCard;