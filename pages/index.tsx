import { ReactElement, useState } from "react";

import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";

import Layout from "../components/Layout";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [links, setLinks] = useState<LinkObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [useFilters, setUseFilters] = useState(true);
  const [limit, setLimit] = useState(10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.length === 0) return;
    if (limit === NaN) setLimit(1000);

    try {
      setLoading(true);
      setLinks([]);

      const response = await fetch(`/api/fetch-links`, {
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
      setInput("");
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <section className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className={styles.options}>
          <div className={styles.limitWrapper}>
            <label htmlFor="limit">
              Limit results
            </label>
            <input
              type="number"
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.useFilterWrapper}>
            <label htmlFor="filter-results">
              Filter low quality results
            </label>
            <input
              type="checkbox"
              name="filter-results"
              id="filter-results"
              checked={useFilters}
              onChange={(e) => setUseFilters(e.target.checked)}
            />
          </div>
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
      <div>
        <div className={styles.loading}>
          {loading && <p>Loading...</p>}
        </div>
        <div className={styles.linkList}>
          {links.map((link, index) => {
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{index + 1}.</span>
                <span>{link.text}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
