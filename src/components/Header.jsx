import LogoIcon from "../assets/images/chef-icon.png";
import LightIcon from "../assets/images/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import DarkIcon from "../assets/images/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import React from "react";

export default function Header() {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [darkMode, setDarkMode] = React.useState(systemPrefersDark);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <header className="header">
      <img className="icon" src={LogoIcon} alt="Chef icon" />
      <h1 className="icon-title">Ai Chef</h1>
      <button
        className="darkmode-button"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        <img
          src={darkMode ? LightIcon : DarkIcon}
          alt={darkMode ? "Light Mode" : "Dark Mode"}
        />
      </button>
    </header>
  );
}
