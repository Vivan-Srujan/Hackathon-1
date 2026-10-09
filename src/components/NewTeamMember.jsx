import { useState } from "react";
import { createTeamMember } from "../services/teamService";

function NewTeamMember({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [workload, setWorkload] = useState("0");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setWorkload("0");
    setError("");
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!role.trim()) {
      setError("Role is required.");
      return;
    }

    const workloadValue = Number(workload);

    if (
      Number.isNaN(workloadValue) ||
      workloadValue < 0 ||
      workloadValue > 100
    ) {
      setError("Workload must be between 0 and 100.");
      return;
    }

    try {
      setLoading(true);

      const member = await createTeamMember({
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        workload: workloadValue,
      });

      onCreated?.(member);

      resetForm();
      onClose?.();
    } catch (err) {
      console.error("Create team member error:", err);

      setError(
        err?.message || "Unable to add team member. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add Team Member</h2>

          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Email *</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Role *</label>

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Developer, Designer, Manager"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Workload (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
              disabled={loading}
            />

            <small
              style={{
                display: "block",
                marginTop: "5px",
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              Enter current workload from 0% to 100%.
            </small>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTeamMember;