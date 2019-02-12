import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import BreadCrumbs from "../src/BreadCrumbs";
import DetailView from "../src/DetailView";
import Code from "../src/Code";
import DILABaseContext from "../src/DILABaseContext";

import {
  fetchArticle,
  fetchTetier,
  fetchTexte,
  fetchSection,
  fetchCodeStructure,
  fetchConteneurStructure,
  fetchCodes,
  fetchConteneurs
} from "../src/api";

const getCodeTitle = cid => codes.find(code => code.id === cid).titre;

class CodePage extends React.Component {
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    let structure, codes;
    if (base == 'LEGI') {
      structure = await fetchCodeStructure(query.texte);
      codes = await fetchCodes();
    } else {
      structure = await fetchConteneurStructure(query.texte);
      codes = await fetchConteneurs();
    }
    let detailData = {};
    if (query.article) {
      detailData = await fetchArticle(query.article);
    }
    if (query.tetier) {
      detailData = await fetchTetier(query.tetier);
    }
    if (query.section) {
      detailData = await fetchSection(query.section);
    }
    return {
      query,
      codes,
      structure,
      detailData,
      base
    };
  }
  render() {
    const { structure, detailData, query, codes, base } = this.props;
    const codeTitle = codes.find(code => code.id === query.texte).titre;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={codeTitle} structure={structure} cid={query.texte}>
          <Head>
            <title>{codeTitle} - LEGI explorer</title>
          </Head>
          {(detailData.data && (
            <div style={{ marginTop: 20 }}>
              {/*<BreadCrumbs
                title={codeTitle}
                cid={query.texte}
                items={[{ titre_ta: codeTitle }, ...detailData.parents]}
                onClick={() => {}}
              />*/}
              <DetailView parentId={query.texte} cid={query.texte} node={detailData} />
            </div>
          )) || <Code cid={query.texte} titre={codeTitle} structure={structure} />}
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default CodePage;
