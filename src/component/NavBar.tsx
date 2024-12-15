import { useEffect, useState } from "react";
import "./NavBar.css";

interface NavBarProps {
  activeFilter: string | null;  // activeFilter peut être null aussi
  setActiveFilter: (filter: string | null) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeFilter, setActiveFilter }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    setActiveButton(activeFilter);
  }, [activeFilter]);

  const handleButtonClick = (type: string) => {
    if (activeButton === type) {
      setActiveButton(null);
      setActiveFilter(null);  // On remet à null pour désactiver le filtre
    } else {
      setActiveButton(type);
      setActiveFilter(type);  // On applique le filtre
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
            id="Electricite"
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
