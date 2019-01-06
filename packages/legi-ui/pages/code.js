import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import BreadCrumbs from "../src/BreadCrumbs";
import DetailView from "../src/DetailView";
import Code from "../src/Code";

import {
  fetchArticle,
  fetchSection,
  fetchStructure,
  fetchCodes
} from "../src/api";

const getCodeTitle = cid => codes.find(code => code.id === cid).titre;

class CodePage extends React.Component {
  static async getInitialProps({ query }) {
    const structure = await fetchStructure(query.code);
    const codes = await fetchCodes();
    let detailData = {};
    if (query.article) {
      detailData = await fetchArticle(query.code, query.article);
    }
    if (query.section) {
      detailData = await fetchSection(query.code, query.section);
    }
    return {
      query,
      codes,
      structure,
      detailData
    };
  }
  render() {
    const { structure, detailData, query, codes } = this.props;
    const codeTitle = codes.find(code => code.id === query.code).titre;
    return (
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
            <DetailView cid={query.code} node={detailData} />
          </div>
        )) || <Code cid={query.code} titre={codeTitle} structure={structure} />}
      </Layout>
    );
  }
}

export default CodePage;
