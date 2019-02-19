import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Conteneur from "../src/Conteneur";
import DILABaseContext from "../src/DILABaseContext";
import { fetchConteneurStructure } from "../src/api";

class ConteneurPage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const conteneur = await fetchConteneurStructure(query.conteneur, base);
    return { conteneur, base };
  }
  render() {
    const { conteneur, base } = this.props;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={conteneur.titre} structure={conteneur} texteId={conteneur.id} conteneurId={conteneur.id}>
          <Head>
            <title>{conteneur.titre} - LEGI explorer</title>
          </Head>
          <Conteneur
            conteneurId={conteneur.id}
            titre={conteneur.titre}
            structure={conteneur} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default ConteneurPage;
