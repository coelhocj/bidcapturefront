import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import BidContainer from "../components/bidContainer";
import styles from "../styles/Home.module.css";

export type Bid = {
  id: number;
  name: string;
  year: number;
  month: string;
  day: number;
  link: string;
};
interface BidInterface {
  bids: Bid[];
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<BidInterface>> {
  const result = await fetch(`http://localhost:8080/api-bids/bids`);
  const preparedResult = await result.json();
  return {
    props: {
      bids: preparedResult,
    },
  };
}

export default function Home({ bids }: BidInterface) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Licitações</title>
        <meta name="description" content="Service to list bids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <h3 className={styles.title}>
          Lista de licitações da Prefeitura de Bombinhas
        </h3>
      </nav>

      <main className={styles.main}>
        {bids.map((bid, key) => {
          return <BidContainer key={key} bidData={bid} />;
        })}
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>{"Cristiano C. Júnior"}</span>
      </footer>
    </div>
  );
}
