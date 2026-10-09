import { supabase } from "../lib/supabase";

// Get all tasks
export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }

  return data || [];
}

// Get tasks for a specific project
export async function getTasksByProject(projectId) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching project tasks:", error);
    throw error;
  }

  return data || [];
}

// Create a new task
export async function createTask(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw error;
  }

  return data;
}

// Update a task
export async function updateTask(taskId, updates) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task:", error);
    throw error;
  }

  return data;
}

// Delete a task
export async function deleteTask(taskId) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    throw error;
  }

  return true;
}

// Mark a task as completed
export async function completeTask(taskId) {
  return updateTask(taskId, {
    status: "done",
  });
}

// Get only pending tasks
export async function getPendingTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .neq("status", "done")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending tasks:", error);
    throw error;
  }

  return data || [];
}