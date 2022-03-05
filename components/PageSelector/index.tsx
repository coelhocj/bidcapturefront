import styles from "./styles.module.scss";

interface PageProps {
  pageNumber: number;
  selected: boolean;
  selectedCallback: (selected: number) => void;
}

export default function PageSelector({
  pageNumber,
  selected,
  selectedCallback,
}: PageProps) {
  return (
    <div
      onClick={() => selectedCallback(pageNumber)}
      className={`${styles.container} ${selected && styles.selected}`}
    >
      {pageNumber}
    </div>
  );
}
