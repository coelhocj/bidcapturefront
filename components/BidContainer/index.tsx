import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "./styles.module.scss";

type Doc = {
  date: string;
  title: string;
  link: string;
};

export type Bid = {
  id: number;
  name: string;
  year: number;
  month: string;
  day: number;
  link: string;
  description: string;
  status: string;
  docs?: Doc[];
  history?: String[];
};

interface BidProps {
  bidData: Bid;
}

export default function BidContainer({ bidData: bid }: BidProps):JSX.Element {
  const [checked, setChecked] = useLocalStorage(bid.id.toString(), false);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className={`${styles.modal} ${opened && styles.opened}`}>
        <div className={styles.id}>
          {bid.id}
          <span onClick={() => setOpened(false)}>X</span>
          <span>{bid.status}</span>
        </div>
        <div className={styles.top}>{bid.name}</div>
        <div className={styles.bottom}>
          <p>{bid.description}</p>
        </div>
        <span
          className={styles.date}
        >{`${bid.day}/${bid.month}/${bid.year}`}</span>
        <button onClick={() => window.open(bid.link)}>Ir para o site</button>
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
        <div className={styles.docs}>
          <h5>Documentos</h5>
          <ul>
            {bid?.docs?.map((bid, index) => {
              return (
                <li key={index} onClick={() => window.open(bid.link)}>
                  <span>{bid.date}</span>
                  <span>{bid.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.history}>
          <h5>Histórico</h5>
          <ul>
            {bid?.history?.map((history, index) => {
              return <li key={index}>{history}</li>;
            })}
          </ul>
        </div>
      </div>
      <div
        className={`${styles.container} ${opened && styles.opened}`}
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <div className={styles.id}>
          {bid.id}
          <span>{bid.status}</span>
        </div>
        <div className={styles.top}>{bid.name}</div>
        <div className={styles.bottom}>
          <p>{bid.description}</p>
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
    </>
  );
}
