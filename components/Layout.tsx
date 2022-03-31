import styles from '../styles/Layout.module.css';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${styles.wrapper} titled-section-wrapper`}>
      <h1>Get a List of Links</h1>
      {children}
    </div>
  );
}

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
};
