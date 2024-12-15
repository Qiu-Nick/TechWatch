import type React from "react";
import { useState } from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import NavBar from "../component/NavBar";
import ProgressBar from "../component/progressBar/ProgressBar";

const Browser: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);

  // Utiliser des valeurs par défaut si activeFilter ou activeSiteId est null
  const activeFilterValue = activeFilter ?? "";
  const activeSiteIdValue = activeSiteId ?? "";

  return (
    <div>
      {/* Passer les valeurs par défaut pour activer un type string */}
      <NavBar setActiveFilter={setActiveFilter} activeFilter={activeFilterValue} />
      <Maps
        activeFilter={activeFilterValue}
        setActiveSiteId={setActiveSiteId}
        activeSiteId={activeSiteIdValue}
      />
      <ProgressBar activeSiteId={activeSiteIdValue} />
    </div>
  );
};

export default Browser;
