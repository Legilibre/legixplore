import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import DetailView from "../src/DetailView";
import DILABaseContext from "../src/DILABaseContext";

import {
  fetchSection,
  fetchTexteStructure
} from "../src/api";

class SectionPage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte);
    const section = await fetchSection(query.section);
    return { base, texte, section };
  }
  render() {
    const { base, texte, section } = this.props;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={texte} cid={texte.id}>
          <Head>
            <title>{texte.titre} - {section.titre} LEGI explorer</title>
          </Head>
          <DetailView parentId={texte.id} cid={texte.id} node={section} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default SectionPage;
