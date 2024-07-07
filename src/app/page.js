import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Project Management Tool</h1>
      <nav>
        <ul>
          <li>
            <Link
              href="/projects"
              style={{ textDecoration: "none", color: "#0070f3" }}
            >
              View Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
