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
      structure = await fetchCodeStructure(query.code);
      codes = await fetchCodes();
    } else {
      structure = await fetchConteneurStructure(query.code);
      codes = await fetchConteneurs();
    }
    let detailData = {};
    if (query.article) {
      detailData = await fetchArticle(query.code, query.article);
    }
    if (query.tetier) {
      detailData = await fetchTetier(query.code, query.tetier);
    }
    if (query.texte) {
      detailData = await fetchTexte(query.code, query.texte);
    }
    if (query.section) {
      detailData = await fetchSection(query.code, query.section);
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
    const codeTitle = codes.find(code => code.id === query.code).titre;
    return (
      <DILABaseContext.Provider value={base}>
        <Layout title={codeTitle} structure={structure} cid={query.code}>
          <Head>
            <title>{codeTitle} - LEGI explorer</title>
          </Head>
          {(detailData.data && (
            <div style={{ marginTop: 20 }}>
              {/*<BreadCrumbs
                title={codeTitle}
                cid={query.code}
                items={[{ titre_ta: codeTitle }, ...detailData.parents]}
                onClick={() => {}}
              />*/}
              <DetailView parentId={query.code} cid={query.node} node={detailData} />
            </div>
          )) || <Code cid={query.code} titre={codeTitle} structure={structure} />}
        </Layout>
      </DILABaseContext.Provider>
    );
  }
}

export default CodePage;
