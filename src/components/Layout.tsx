import { Outlet, Link } from "react-router-dom";
import { BookOpen, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage for saved theme, default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-offwhite shadow-2xl shadow-ink/5 relative overflow-hidden transition-colors duration-300">
      <header className="px-6 py-8 flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2 text-ink">
          <BookOpen className="w-5 h-5" />
          <span className="font-serif text-lg font-medium tracking-wide">Tim Keller's Prayer</span>
        </Link>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-ink/5 text-ink transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>
      
      <main className="flex-1 px-6 pb-12 z-10 flex flex-col">
        <Outlet />
      </main>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-20%] w-[70%] h-[50%] rounded-full bg-paper blur-3xl opacity-70 transition-colors duration-300" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-paper blur-3xl opacity-70 transition-colors duration-300" />
      </div>
    </div>
  );
}
