import { supabase } from "../lib/supabase";

export async function getRecommendations(projectId) {
  const { data, error } = await supabase
    .from("ai_recommendations")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function updateRecommendation(id, status) {
  const { data, error } = await supabase
    .from("ai_recommendations")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}