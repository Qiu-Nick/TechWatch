import { useState } from "react";
import Maps from "../component/map/maps";
import NavBar from "../component/NavBar";
import ProgressBar from "../component/progressBar/ProgressBar";

const Browser: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);

  return (
    <div>
      <NavBar setActiveFilter={setActiveFilter} activeFilter={activeFilter ?? ""} />
      <Maps
        activeFilter={activeFilter ?? ""}
        setActiveSiteId={setActiveSiteId}
        activeSiteId={activeSiteId ?? ""}
      />
      <ProgressBar activeSiteId={activeSiteId ?? ""} />
    </div>
  );
};

export default Browser;
