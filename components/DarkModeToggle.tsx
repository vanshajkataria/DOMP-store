// components/DarkModeToggle.tsx

import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the user's preferred color scheme and update the state accordingly
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(userPrefersDark);
  }, []);

  const toggleDarkMode = () => {
    // Toggle between dark and light mode
    setIsDarkMode(!isDarkMode);

    // Update CSS custom properties for dark mode
    if (!isDarkMode) {
      document.documentElement.style.setProperty('--foreground-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--background-start-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-end-rgb', '0, 0, 0');
    } else {
      // Update CSS custom properties for light mode (your original values)
      document.documentElement.style.setProperty('--foreground-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-start-rgb', '214, 219, 220');
      document.documentElement.style.setProperty('--background-end-rgb', '255, 255, 255');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`bg-gray-300 dark:bg-gray-700 px-2 rounded-full items-center ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}
    >
      {isDarkMode ? (
        <>
          <span className="material-symbols-outlined">light_mode</span>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined">dark_mode</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
