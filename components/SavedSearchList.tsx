import { useEffect } from "react";

import { SavedSearch } from "../pages";
import SavedSearchCard from "./SavedSearchCard";

import styles from "../styles/SavedSearchList.module.css";
import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";

export default function SavedSearchList({
  savedSearches,
  setSavedSearches,
  setLoading,
  setLinks,
}: SavedSearchListProps) {

  useEffect(() => {
    setSavedSearches(JSON.parse(localStorage.getItem("savedSearches") || "[]"));
  }, [setSavedSearches]);

  return (
    <div className={`${styles.wrapper} section-wrapper`}>
      <h2>Saved searches</h2>
      <ul>
        {savedSearches.map((search, index) => <SavedSearchCard key={index} {...search} setLinks={setLinks} setLoading={setLoading} />)}
      </ul>
    </div>
  );
};

interface SavedSearchListProps {
  savedSearches: SavedSearch[];
  setSavedSearches: (savedSearches: SavedSearch[]) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>;
};
