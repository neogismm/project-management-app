import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Project Management Tool</h1>
      <p>This is your project and task management application built with the MERN stack and Next.js.</p>
      
      <nav>
        <ul>
          <li>
            <Link href="/projects" style={{ textDecoration: 'none', color: '#0070f3' }}>
              View Projects
            </Link>
          </li>
          {/* 
            You can add more navigation links here if needed.
            For example, links to user profiles, settings, etc.
          */}
        </ul>
      </nav>
    </div>
  );
};