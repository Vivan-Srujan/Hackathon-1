import { useState } from "react";
import { createTeamMember } from "../services/teamService";

export default function NewTeamMember({
  isOpen,
  onClose,
  onCreated,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [workload, setWorkload] = useState("0");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
      setError("");

      const member = await createTeamMember({
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        workload: workloadValue,
      });

      resetForm();

      onCreated?.(member);
      onClose?.();
    } catch (err) {
      console.error("Create team member error:", err);

      setError(
        err?.message ||
          "Unable to add team member. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
    >
      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Full Name *</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Email */}
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

          {/* Role */}
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

          {/* Workload */}
          <div className="form-group">
            <label>Workload (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
              placeholder="0"
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
              Enter the current workload from 0% to 100%.
            </small>
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
              onClick={handleClose}
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
              {loading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// ...Important
// ...This assumes your teamService.js has:

export async function createTeamMember(member) {
  const { data, error } = await supabase
    .from("team_members")
    .insert([member])
    .select()
    .single();

  if (error) throw error;

  return data;
}