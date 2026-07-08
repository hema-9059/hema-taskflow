import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Tasks",
    path: "/tasks",
  },
  {
    name: "Completed",
    path: "/completed",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#1e293b",
        color: "#fff",
        minHeight: "100vh",
        padding: "25px 0",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "700",
        }}
      >
        TaskFlow
      </h2>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "block",
              padding: "15px 30px",
              color: "#fff",
              textDecoration: "none",
              background: isActive ? "#2563eb" : "transparent",
              transition: ".3s",
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        © 2026 TaskFlow
      </div>
    </aside>
  );
}