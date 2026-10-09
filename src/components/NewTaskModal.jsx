import { useEffect, useState } from "react";
import { createTask } from "../services/taskService";

export default function NewTaskModal({
  isOpen,
  onClose,
  onCreated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("4");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("todo");
      setAssignee("");
      setDueDate("");
      setEstimatedHours("4");
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const task = await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        assignee: assignee.trim() || null,
        due_date: dueDate || null,
        estimated_hours:
          Number(estimatedHours) || 4,
      });

      onCreated?.(task);
      onClose();
    } catch (err) {
      console.error("Create task error:", err);

      setError(
        err?.message ||
          "Unable to create task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="project-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Header */}
        <div className="modal-header">
          <h2>Create New Task</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Task Title *</label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Describe the task..."
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              disabled={loading}
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>

              <option value="critical">
                Critical
              </option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={loading}
            >
              <option value="todo">
                To Do
              </option>

              <option value="in_progress">
                In Progress
              </option>

              <option value="done">
                Done
              </option>
            </select>
          </div>

          {/* Assignee */}
          <div className="form-group">
            <label>Assignee</label>

            <input
              value={assignee}
              onChange={(e) =>
                setAssignee(
                  e.target.value
                )
              }
              placeholder="Enter assignee name"
              disabled={loading}
            />
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label>Deadline</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              disabled={loading}
            />
          </div>

          {/* Estimated Hours */}
          <div className="form-group">
            <label>
              Estimated Hours
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              value={estimatedHours}
              onChange={(e) =>
                setEstimatedHours(
                  e.target.value
                )
              }
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}