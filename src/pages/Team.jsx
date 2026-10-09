import { useEffect, useState } from "react";
import { Users, Mail, Plus } from "lucide-react";

import { getTeamMembers } from "../services/teamService";
import NewTeamMember from "../components/NewTeamMember";

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await getTeamMembers();
        setMembers(data || []);
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTeam();
  }, []);

  const handleMemberCreated = (newMember) => {
    setMembers((currentMembers) => [
      newMember,
      ...currentMembers,
    ]);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Team</h1>
          <p>Monitor team workload and availability.</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <NewTeamMember
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleMemberCreated}
      />

      {loading && <p>Loading team members...</p>}

      {!loading && members.length === 0 && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <h3>No team members found</h3>
          <p>Add team members to start managing your team.</p>
        </div>
      )}

      {!loading && members.length > 0 && (
        <div className="projects-grid">
          {members.map((member, index) => {
            const workload = Math.min(
              Math.max(Number(member.workload) || 0, 0),
              100
            );

            const initials =
              member.initials ||
              (member.name
                ? member.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "?");

            return (
              <div
                className="project-card"
                key={
                  member.id ||
                  member.email ||
                  `${member.name}-${index}`
                }
              >
                <div
                  style={{
                    display: "flex",
                    gap: "13px",
                    alignItems: "center",
                  }}
                >
                  <div className="avatar">
                    {initials}
                  </div>

                  <div>
                    <h3>
                      {member.name || "Unnamed Member"}
                    </h3>

                    <p>
                      {member.role || "Team Member"}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: "25px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "7px",
                    }}
                  >
                    <span>Workload</span>
                    <strong>{workload}%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${workload}%`,
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    color: "#6b7280",
                    fontSize: "12px",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Users size={13} />
                    {member.tasks || 0} tasks
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Mail size={13} />
                    {member.email || "Contact"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Team;