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
  const response = await fetch(
    `https://bid-capture-backend.herokuapp.com/api-bids/bids`
  );
  if (response.status == 200) {
    const preparedResult = await response.json();
    return {
      props: {
        bids: preparedResult,
      },
    };
  } else {
    return {
      props: {
        bids: [],
      },
    };
  }
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
        {bids.length > 0 ? (
          bids.map((bid, key) => {
            return <BidContainer key={key} bidData={bid} />;
          })
        ) : (
          <h4>
            Não foi possível realizar a captura de informações no site.
            <br />
            Verifique se{" "}
            <a
              href={
                "https://www.bombinhas.sc.gov.br/licitacoes/index/index/codMapaItem/11152"
              }
            >
              https://www.bombinhas.sc.gov.br/licitacoes/index/index/codMapaItem/11152
            </a>
             está disponível.
          </h4>
        )}
      </main>

      <footer className={styles.footer}>
        <span>{"Cristiano C. Júnior"}</span>
      </footer>
    </div>
  );
}
