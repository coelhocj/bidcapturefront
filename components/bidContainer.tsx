import useLocalStorage from "../hooks/useLocalStorage";
import { Bid } from "../pages";
import styles from "./styles.module.scss";

interface BidProps {
  bidData: Bid;
}

export default function BidContainer({ bidData: bid }: BidProps) {
  const [checked, setChecked] = useLocalStorage(bid.id.toString(), false);

  return (
    <div className={styles.container}>
      <div className={styles.id}>{bid.id}</div>
      <div className={styles.top}>{bid.name}</div>
      <div
        onClick={() => {
          window.open(bid.link);
        }}
        className={styles.bottom}
      >
        {bid.link}
      </div>
      <span
        className={styles.date}
      >{`${bid.day}/${bid.month}/${bid.year}`}</span>
      <span className={styles.read}>
        <input
          onChange={() => setChecked(!checked)}
          type="checkbox"
          id={bid.id.toString()}
          name={bid.id.toString()}
          checked={checked}
        />
        <label htmlFor={bid.id.toString()}>Lido</label>
      </span>
    </div>
  );
}
