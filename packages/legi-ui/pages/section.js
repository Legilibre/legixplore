import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import Section from "../src/Section";
import DILABaseContext from "../src/DILABaseContext";

import {
  fetchSection,
  fetchTexteStructure,
  fetchConteneurStructure
} from "../src/api";

class SectionPage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    const texte = await fetchTexteStructure(query.texte, base);
    const section = await fetchSection(query.section, base);
    let conteneur;
    if (query.conteneur) {
      conteneur = await fetchConteneurStructure(query.conteneur, base);
    }
    return { base, texte, conteneur, section };
  }
  render() {
    const { base, texte, conteneur, section } = this.props;
    const structure = conteneur || texte;
    const conteneurId = conteneur && conteneur.id || null;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={texte.titre} structure={structure} texteId={texte.id} conteneurId={conteneurId} sectionId={section.data.id}>
          <Head>
            <title>{texte.titre} - {section.titre} LEGI explorer</title>
          </Head>
          <Section
            texteId={texte.id}
            conteneurId={conteneurId}
            showPreview={true}
            {...section} />
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default SectionPage;
