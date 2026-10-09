import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import RiskCard from "../components/RiskCard";
import NewProjectModal from "../components/NewProjectModal";

import { supabase } from "../lib/supabase";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projectsResult, tasksResult, teamResult] =
          await Promise.all([
            supabase.from("projects").select("*"),
            supabase.from("tasks").select("*"),
            supabase.from("team_members").select("*"),
          ]);

        if (projectsResult.error) throw projectsResult.error;
        if (tasksResult.error) throw tasksResult.error;
        if (teamResult.error) throw teamResult.error;

        setProjects(projectsResult.data || []);
        setTasks(tasksResult.data || []);
        setTeamMembers(teamResult.data || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    }

    loadDashboardData();
  }, []);

  const activeTasks = tasks.filter(
    (task) => task.status !== "done"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  );

  const priorityTasks = tasks
    .filter((task) => task.status !== "done")
    .sort((a, b) => {
      const priorityOrder = {
        critical: 1,
        high: 2,
        medium: 3,
        low: 4,
      };

      return (
        (priorityOrder[a.priority?.toLowerCase()] || 5) -
        (priorityOrder[b.priority?.toLowerCase()] || 5)
      );
    })
    .slice(0, 4);

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  const availableMembers = teamMembers.filter(
    (member) => Number(member.availability) > 0
  );

  // Called after NewProjectModal successfully creates a project
  const handleProjectCreated = (project) => {
    if (!project) return;

    setProjects((currentProjects) => [
      project,
      ...currentProjects,
    ]);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Project Overview</h1>

          <p>
            Monitor your projects, team performance and upcoming deadlines.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowProjectModal(true)}
        >
          + New Project
        </button>
      </div>

      {/* Statistics */}
      <div className="stats">
        <StatCard
          title="Total Projects"
          value={String(projects.length).padStart(2, "0")}
          subtitle="Projects in workspace"
          icon="📁"
        />

        <StatCard
          title="Active Tasks"
          value={String(activeTasks.length).padStart(2, "0")}
          subtitle={`${completedTasks.length} completed`}
          icon="✓"
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle="Based on current tasks"
          icon="↗"
        />

        <StatCard
          title="Team Members"
          value={String(teamMembers.length)}
          subtitle={`${availableMembers.length} available`}
          icon="👥"
        />
      </div>

      {/* Dashboard content */}
      <div className="dashboard-grid">
        <RiskCard />

        <div className="recent-tasks">
          <h3>Today's Priorities</h3>

          {priorityTasks.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            priorityTasks.map((task) => {
              const priority = (
                task.priority || "medium"
              ).toLowerCase();

              return (
                <div className="task" key={task.id}>
                  <span>{task.title || "Untitled task"}</span>

                  <b className={priority}>
                    {priority.charAt(0).toUpperCase() +
                      priority.slice(1)}
                  </b>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onCreated={handleProjectCreated}
      />
    </div>
  );
}

export default Dashboard;