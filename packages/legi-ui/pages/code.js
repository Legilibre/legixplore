import React from "react";
import Head from "next/head";

import Layout from "../src/Layout";
import DetailView from "../src/DetailView";
import Code from "../src/Code";
import ContentNotFound from "../src/ContentNotFound";

import {
  fetchArticle,
  fetchSection,
  fetchStructure,
  fetchCodes
} from "../src/api";

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
    const notFound = (query.article || query.section) && detailData === null;
    return (
      <Layout title={codeTitle} structure={structure} cid={query.code}>
        <Head>
          <title>{codeTitle} - legiXplore</title>
        </Head>
        {notFound ? (
          <ContentNotFound />
        ) : detailData ? (
          <div style={{ marginTop: 20 }}>
            {/*<BreadCrumbs
              title={codeTitle}
              cid={query.code}
              items={[{ titre_ta: codeTitle }, ...detailData.parents]}
              onClick={() => {}}
            />*/}
            <DetailView cid={query.code} node={detailData} />
          </div>
        ) : (
          <Code cid={query.code} titre={codeTitle} structure={structure} />
        )}
      </Layout>
    );
  }
}

export default CodePage;
