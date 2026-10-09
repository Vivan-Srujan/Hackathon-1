import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { Plus, MoreHorizontal } from "lucide-react";
import TaskCard from "../components/TaskCard";
import NewTaskModal from "../components/NewTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleTaskCreated = (task) => {
    if (!task) return;

    setTasks((currentTasks) => [
      task,
      ...currentTasks,
    ]);
  };

  const columns = [
    {
      title: "To Do",
      status: "todo",
      tasks: tasks.filter(
        (task) =>
          task.status === "todo" ||
          task.status === "pending" ||
          task.status === "to_do"
      ),
    },
    {
      title: "In Progress",
      status: "in_progress",
      tasks: tasks.filter(
        (task) =>
          task.status === "in_progress" ||
          task.status === "in progress"
      ),
    },
    {
      title: "Done",
      status: "done",
      tasks: tasks.filter(
        (task) => task.status === "done"
      ),
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Tasks</h1>
          <p>Track work across your project.</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setShowTaskModal(true)}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading tasks...</p>}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <h3>No tasks found</h3>
          <p>Create a task to get started.</p>
        </div>
      )}

      {/* Kanban Board */}
      {!loading && tasks.length > 0 && (
        <div className="kanban">
          {columns.map((column) => (
            <div
              className="kanban-column"
              key={column.status}
            >
              {/* Column Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>
                  {column.title} ({column.tasks.length})
                </h3>

                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>

              {/* Column Tasks */}
              {column.tasks.length === 0 ? (
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                    marginTop: "20px",
                  }}
                >
                  No tasks
                </p>
              ) : (
                column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={
                      task.title || "Untitled task"
                    }
                    priority={
                      task.priority || "medium"
                    }
                    assignee={
                      task.assignee ||
                      task.person ||
                      "Unassigned"
                    }
                    deadline={
                      task.due_date ||
                      task.date ||
                      "No deadline"
                    }
                    status={column.title}
                    description={
                      task.description ||
                      "Project task"
                    }
                    estimatedHours={
                      task.estimated_hours || 4
                    }
                  />
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onCreated={handleTaskCreated}
      />
    </div>
  );
}

export default Tasks;