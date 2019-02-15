import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Article from "../src/Article";
import DILABaseContext from "../src/DILABaseContext";

import {
  fetchArticle,
  fetchTexteStructure,
  fetchConteneurStructure
} from "../src/api";

class ArticlePage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte);
    const article = await fetchArticle(query.article);
    let conteneur;
    if (query.conteneur) {
      conteneur = await fetchConteneurStructure(query.conteneur);
    }
    return { base, conteneur, texte, article };
  }
  render() {
    const { base, conteneur, texte, article } = this.props;
    const structure = conteneur || texte;
    const conteneurId = conteneur && conteneur.id || null;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={structure} texteId={texte.id} conteneurId={conteneurId}>
          <Head>
            <title>{texte.titre} - {article.titre} LEGI explorer</title>
          </Head>
          <Article parentId={texte.id} conteneurId={conteneurId} cid={texte.id} {...article} showPreview={true} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default ArticlePage;
