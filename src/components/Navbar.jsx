import { Bell, Search } from "lucide-react";
import { logout } from "../services/authService";

function Navbar() {

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="navbar">

      <div>
        <h2>Good Morning 👋</h2>
        <p>Here's what's happening with your projects.</p>
      </div>

      <div className="nav-right">

        <div className="search">
          <Search size={18} />
          <input placeholder="Search..." />
        </div>

        <Bell size={22} />

        <div
          className="profile"
          onClick={handleLogout}
          title="Click to logout"
          style={{ cursor: "pointer" }}
        >
          <div className="avatar">S</div>
          <span>Surya</span>
        </div>

      </div>

    </header>
  );
}

export default Navbar;