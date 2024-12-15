import { useEffect, useState } from "react";
import "./NavBar.css";

interface NavBarProps {
  activeFilter: string | null;  // activeFilter peut être null aussi
  setActiveFilter: (filter: string | null) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeFilter, setActiveFilter }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Synchronisation de activeButton avec activeFilter
  useEffect(() => {
    setActiveButton(activeFilter);
  }, [activeFilter]);

  const handleButtonClick = (type: string) => {
    // Si le bouton cliqué est déjà actif, on désactive le filtre
    if (activeButton === type) {
      setActiveButton(null);
      setActiveFilter(null);  // Désactivation du filtre
    } else {
      setActiveButton(type);
      setActiveFilter(type);  // Application du filtre
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <button
            type="button"
            className={`btn ${activeButton === "Bunker" ? "active" : ""}`}
            id="Bunker"
            onClick={() => handleButtonClick("Bunker")}
          >
            Bunker
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`btn ${activeButton === "Eau" ? "active" : ""}`}
            id="Eau"
            onClick={() => handleButtonClick("Eau")}
          >
            Eau
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`btn ${activeButton === "Electricité" ? "active" : ""}`}
            id="Electricité"
            onClick={() => handleButtonClick("Electricité")}
          >
            Electricité
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
