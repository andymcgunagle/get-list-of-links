import SearchResults from './../components/SearchResults';
import Form from './../components/Form';
import { ReactElement, useState } from "react";

import { LinkObject } from "get-array-of-links/dist/parseHTML/getLinkObjects";

import Layout from "../components/Layout";

import styles from "../styles/Home.module.css";
import SavedSearchList from "../components/SavedSearchList";
import Intro from '../components/Intro';


export default function Home() {
  const [links, setLinks] = useState<LinkObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  return (
    <div className={styles.wrapper}>
      <Intro />

      <main>
        <Form
          setLinks={setLinks}
          setLoading={setLoading}
          setSavedSearches={setSavedSearches}
        />
        <SearchResults
          loading={loading}
          links={links}
        />
      </main>

      <SavedSearchList
        savedSearches={savedSearches}
        setSavedSearches={setSavedSearches}
        setLinks={setLinks}
        setLoading={setLoading}
      />

    </div >
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export interface SavedSearch {
  url: string;
  useFilters: boolean;
  limit: number;
};
