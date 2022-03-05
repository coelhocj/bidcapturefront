import Head from "next/head";
import { useEffect, useState } from "react";
import BidContainer from "../components/BidContainer";
import PageSelector from "../components/PageSelector";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(false);
  const pages = Array.from({ length: 25 }, (_, i) => i + 1);
  const [selectedPage, setSelectedPage] = useState(1);

  async function getData(pageFrom: number, pageTo: number) {
    const response = await fetch(
      `https://bid-capture-backend.herokuapp.com/api-bids/bids?pageFrom=${pageFrom}&pageTo=${pageTo}`
    );
    if (response.status == 200) {
      const preparedResult = await response.json();
      setBids(preparedResult);
      setError(false);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    setError(false);
    setBids([]);
    const selectedTo = selectedPage * 5;
    getData(selectedPage * 5 - 4, selectedTo > 122 ? 122 : selectedTo);
  }, [selectedPage]);

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
        <div className={styles.paginatorTitle}>Página</div>
        <div className={styles.paginator}>
          {pages.map((page) => {
            return (
              <PageSelector
                key={page}
                pageNumber={page}
                selectedCallback={(select) => setSelectedPage(select)}
                selected={selectedPage === page}
              />
            );
          })}
        </div>
      </nav>

      <main className={styles.main}>
        {bids.length > 0 && error === false ? (
          bids.map((bid, index) => {
            return <BidContainer key={index} bidData={bid} />;
          })
        ) : error === true ? (
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
        ) : (
          <div className={styles.loading}>
            <p>Carregando informações...</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>{"Cristiano C. Júnior"}</span>
      </footer>
    </div>
  );
}
