import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import DILABaseContext from "../src/DILABaseContext";
import Tetier from "../src/Tetier";

import { fetchTetier, fetchConteneurStructure } from "../src/api";

class SectionPage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const conteneur = await fetchConteneurStructure(query.conteneur);
    const tetier = await fetchTetier(query.tetier);
    return { base, conteneur, tetier };
  }
  render() {
    const { base, conteneur, tetier } = this.props;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={conteneur.titre} structure={conteneur} conteneurId={conteneur.id}>
          <Head>
            <title>{conteneur.titre} - {tetier.titre} LEGI explorer</title>
          </Head>
          <Tetier conteneurId={conteneur.id} {...tetier} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default SectionPage;
