import { supabase } from "../lib/supabase";

export async function getTeamMembers() {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }

  return data || [];
}

export async function getTeamMember(id) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching team member:", error);
    throw error;
  }

  return data;
}

export async function createTeamMember(member) {
  const { data, error } = await supabase
    .from("team_members")
    .insert([member])
    .select()
    .single();

  if (error) {
    console.error("Error creating team member:", error);
    throw error;
  }

  return data;
}

export async function updateTeamMember(id, updates) {
  const { data, error } = await supabase
    .from("team_members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating team member:", error);
    throw error;
  }

  return data;
}

export async function deleteTeamMember(id) {
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }

  return true;
}