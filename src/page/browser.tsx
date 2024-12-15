import type React from "react";
import { useState } from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import NavBar from "../component/NavBar";
import ProgressBar from "../component/progressBar/ProgressBar";

const Browser: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);

  // Valeurs de fallback pour éviter les `null`
  const activeFilterValue = activeFilter ?? "";
  const activeSiteIdValue = activeSiteId ?? "";

  return (
    <div>
      {/* Passer les valeurs gérées avec les fallback */}
      <NavBar setActiveFilter={setActiveFilter} activeFilter={activeFilterValue} />
      <Maps
        activeFilter={activeFilter}
        setActiveSiteId={setActiveSiteId}
        activeSiteId={activeSiteIdValue}
      />
      <ProgressBar activeSiteId={activeSiteIdValue} />
    </div>
  );
};

export default Browser;
