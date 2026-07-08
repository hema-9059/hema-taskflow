import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "90px",
            color: "#2563eb",
            margin: 0,
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          style={{
            background: "#2563eb",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}