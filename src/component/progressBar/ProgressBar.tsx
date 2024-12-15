import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

interface Site {
	id: string;
	nom: string;
	type: string;
	densité: string;
	ressources: string;
	danger_alentour: string;
}

const ProgressBar: React.FC<{ activeSiteId: string | null }> = ({
	activeSiteId,
}) => {
	const [sites, setSites] = useState<Site[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Appeler l'API au chargement du composant
	useEffect(() => {
		const fetchSites = async () => {
			try {
				const response = await fetch(
					"https://proto-jam-api.vercel.app/items",
				);

				if (!response.ok) {
					throw new Error("Réponse du serveur incorrecte");
				}
				const data = await response.json();
				setSites(data.sites || []);
			} catch (error) {
				console.error("Erreur lors du fetch:", error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchSites();
	}, []);

	const selectedSite = sites.find((site) => site.id === activeSiteId);

	if (loading) {
		return <p>Chargement des données...</p>;
	}

	if (error) {
		return <p>Erreur lors du chargement des données. Veuillez réessayer plus tard.</p>;
	}

	if (!selectedSite) {
		return <p>Aucun site sélectionné. Veuillez en choisir un.</p>;
	}

	const density = Number.parseInt(selectedSite.densité) || 0;
	const resources = Number.parseInt(selectedSite.ressources) || 0;
	const danger = Number.parseInt(selectedSite.danger_alentour) || 0;

	return (
		<div style={{ marginBottom: "20px" }}>
			<h2>
				{selectedSite.nom} ({selectedSite.type})
			</h2>
			<div className="w3-light-grey w3-round-xlarge" style={{ marginBottom: "5px" }}>
				<div
					className="w3-container w3-blue w3-round-xlarge"
					style={{ width: `${density}%` }}
					role="progressbar"
					aria-valuenow={density}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					Densité: {density}%
				</div>
			</div>
			<div className="w3-light-grey w3-round-xlarge" style={{ marginBottom: "5px" }}>
				<div
					className="w3-container w3-green w3-round-xlarge"
					style={{ width: `${resources}%` }}
					role="progressbar"
					aria-valuenow={resources}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					Ressources: {resources}%
				</div>
			</div>
			<div className="w3-light-grey w3-round-xlarge">
				<div
					className="w3-container w3-red w3-round-xlarge"
					style={{ width: `${danger}%` }}
					role="progressbar"
					aria-valuenow={danger}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					Danger Alentour: {danger}%
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
