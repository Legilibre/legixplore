import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import BreadCrumbs from "../src/BreadCrumbs";
import DetailView from "../src/DetailView";
import { fetchArticle, fetchSection, fetchStructure } from "../src/api";

import codes from "../src/codes";

const getCodeTitle = cid => codes.find(code => code.id === cid).titre;

class CodePage extends React.Component {
  static async getInitialProps({ query }) {
    const structure = await fetchStructure(query.code);
    let detailData = {};
    if (query.article) {
      detailData = await fetchArticle(query.code, query.article);
    }
    if (query.section) {
      detailData = await fetchSection(query.code, query.section);
    }
    return {
      query,
      structure,
      detailData
    };
  }
  render() {
    const { structure, detailData, query } = this.props;
    const codeTitle = getCodeTitle(query.code);
    return (
      <Layout title={codeTitle} structure={structure}>
        <Head>
          <title>{codeTitle} - LEGI explorer</title>
        </Head>
        {detailData.data && (
          <div style={{ marginTop: 20 }}>
            <BreadCrumbs
              cid={query.code}
              items={detailData.parents}
              onClick={() => {}}
            />
            <DetailView cid={query.code} node={detailData} />
          </div>
        )}
      </Layout>
    );
  }
}

export default CodePage;
