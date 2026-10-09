import { useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import AIAssistant from "./pages/AIAssistant";

function App() {
  const [page, setPage] = useState("dashboard");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check whether a user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Wait while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, show Login page
  if (!session) {
    return <Login />;
  }

  // Main application
  return (
    <div className="app">
      <Sidebar setPage={setPage} page={page} />

      <main className="main">
        <Navbar />

        {page === "dashboard" && <Dashboard />}

        {page === "projects" && <Projects />}

        {page === "tasks" && <Tasks />}

        {page === "team" && <Team />}

        {page === "ai" && <AIAssistant />}
      </main>
    </div>
  );
}

export default App;