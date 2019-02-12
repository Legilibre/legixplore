import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Code from "../src/Code";
import DILABaseContext from "../src/DILABaseContext";
import { fetchTexteStructure } from "../src/api";

class TextePage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte);
    return { texte, base };
  }
  render() {
    const { texte, base } = this.props;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={texte} cid={texte.id}>
          <Head>
            <title>{texte.titre} - LEGI explorer</title>
          </Head>
          <Code cid={texte.id} titre={texte.titre} structure={texte} />}
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default TextePage;
