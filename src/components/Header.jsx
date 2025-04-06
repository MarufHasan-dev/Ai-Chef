import React from "react";
import LogoIcon from "../assets/images/chef-icon.png";
import LightIcon from "../assets/images/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import DarkIcon from "../assets/images/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import HelpLogo from "../assets/images/help_24dp_FAFAF8_FILL0_wght400_GRAD0_opsz24.svg";
import CrossIcon from "../assets/images/close_32dp_D17557_FILL0_wght400_GRAD0_opsz40.png";

export default function Header() {
  const [popup, setPopup] = React.useState(true);

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
      {popup ? (
        <div className="overlay">
          <p className="description">
            This is a recipe generation app. You can get a recipe with the
            ingredients you have. Just add them and click "Get a recipe." You
            will need at least four ingredients to generate a recipe. Enjoy!
            <button className="popup-close-btn" onClick={() => setPopup(false)}>
              <img src={CrossIcon} alt="close" />
            </button>
          </p>
        </div>
      ) : null}
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
      <button className="help" onClick={() => setPopup((prev) => !prev)}>
        <img src={HelpLogo} alt="help" />
      </button>
    </header>
  );
}
