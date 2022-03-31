import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";
import styles from "../styles/SavedSearchCard.module.css";

export default function SavedSearchCard({
  url,
  useFilters,
  limit,
  setLinks,
  setLoading,
}: SavedSearchCardProps) {

  const handleCardClick = async () => {
    try {
      setLoading(true);
      setLinks([]);

      const response = await fetch(`/api/get-links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          useFilters,
          limit,
        }),
      });

      const result = await response.json();

      setLoading(false);
      setLinks(result.links);
    } catch (error) {
      console.error(error);
    };
  };


  return (
    <div onClick={handleCardClick} className={`${styles.wrapper} card side`}>
      <div>
        <span className="material-icons icon-circle">
          search
        </span>
        <p>
          {url}
        </p>
      </div>
      <div className={styles.options}>
        <p>
          Limit: {limit}
        </p>
        <p>
          Use filters: {useFilters ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

interface SavedSearchCardProps {
  url: string;
  useFilters: boolean;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>;
};