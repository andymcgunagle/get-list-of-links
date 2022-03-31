import React from "react";

import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";

import styles from "../styles/SearchResults.module.css";

export default function SearchResults({
  loading,
  links,
}: SearchResultsProps) {
  return (
    <>
      {loading && <p className={styles.loading}>Loading...</p>}
      {links.length !== 0 && <div className={`${styles.wrapper} titled-section-wrapper`}>
        <h2>Results</h2>
        <div className="card">
          {<ul className={styles.list}>
            {links.map((link, index) => {
              return <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <span>{index + 1}.</span>
                <span>{link.text}</span>
              </a>;
            })}
          </ul>}
        </div>
      </div>}
    </>
  );
};

interface SearchResultsProps {
  loading: boolean,
  links: LinkObject[],
}
