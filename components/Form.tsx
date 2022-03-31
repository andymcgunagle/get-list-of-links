import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";
import React, { useState } from "react";
import { SavedSearch } from "../pages";
import styles from "../styles/Form.module.css";

export default function Form({
  setLinks,
  setLoading,
  setSavedSearches,
}: FormProps) {
  const [input, setInput] = useState("");
  const [useFilters, setUseFilters] = useState(true);
  const [limit, setLimit] = useState(10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.length === 0) return;
    if (limit === NaN) setLimit(1000);

    try {
      setLoading(true);
      setLinks([]);

      const response = await fetch(`/api/get-links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: input,
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

  const handleSaveButtonClick = () => {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches") || "[]");
    const newSearchToSave = { url: input, useFilters, limit, };
    localStorage.setItem("savedSearches", JSON.stringify([...savedSearches, newSearchToSave]));
    setSavedSearches([...savedSearches, newSearchToSave]);
  };

  return (
    <div className="titled-section-wrapper">
      <h2>Get links from...</h2>
      <form onSubmit={handleSubmit} className="card">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={e => e.target.select()}
          placeholder="Enter a URL (e.g. https://techcrunch.com/)"
        />
        <div className={styles.options}>
          <div>
            <label htmlFor="limit">
              Limit results
            </label>
            <input type="number" name="limit" id="limit" value={limit} onChange={e => setLimit(parseInt(e.target.value))} onFocus={e => e.target.select()} />
          </div>
          <div>
            <label htmlFor="filter-results">
              Filter low quality results
            </label>
            <input type="checkbox" name="filter-results" id="filter-results" checked={useFilters} onChange={e => setUseFilters(e.target.checked)} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="submit">
            Get links
          </button>
          <button onClick={handleSaveButtonClick} type="button" className="outlined">
            Save search
          </button>
        </div>
      </form>
    </div>
  );
};

interface FormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>,
  setSavedSearches: React.Dispatch<React.SetStateAction<SavedSearch[]>>,
};