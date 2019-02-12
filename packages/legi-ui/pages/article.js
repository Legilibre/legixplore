import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Article from "../src/Article";
import DILABaseContext from "../src/DILABaseContext";

import {
  fetchArticle,
  fetchTexteStructure
} from "../src/api";

class ArticlePage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte);
    const article = await fetchArticle(query.article);
    return { base, texte, article };
  }
  render() {
    const { base, texte, article } = this.props;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={texte} cid={texte.id}>
          <Head>
            <title>{texte.titre} - {article.titre} LEGI explorer</title>
          </Head>
          <Article parentId={texte.id} cid={texte.id} {...article} showPreview={true} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default ArticlePage;
