import styles from '../styles/Layout.module.css';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1>get-list-of-links</h1>
        <p>Enter a URL into the input below and get a list of all the links on that page.</p>
        <span>
          Note that some pages are generated dynamically and may not return all visible results.
        </span>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
};
