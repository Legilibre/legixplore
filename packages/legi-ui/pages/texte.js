import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Texte from "../src/Texte";
import DILABaseContext from "../src/DILABaseContext";
import {
  fetchTexteStructure,
  fetchConteneurStructure
} from "../src/api";

class TextePage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte);
    let conteneur;
    if (query.conteneur) {
      conteneur = await fetchConteneurStructure(query.conteneur);
    }
    return { texte, conteneur, base };
  }
  render() {
    const { texte, conteneur, base } = this.props;
    const structure = conteneur || texte;
    const conteneurId = conteneur && conteneur.id || null;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={structure} texteId={texte.id} conteneurId={conteneurId}>
          <Head>
            <title>{texte.titre} - LEGI explorer</title>
          </Head>
          <Texte
            texteId={texte.id}
            conteneurId={conteneurId}
            titre={texte.titre}
            titrefull={texte.titrefull}
            structure={texte} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default TextePage;
