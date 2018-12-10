import React from "react";
import AsyncFetch from "../src/AsyncFetch";
import fetch from "node-fetch";
import memoize from "memoizee";
import Head from "next/head";

import Tree from "../src/Tree";
import Layout from "../src/Layout";

import { Link } from "../src/routes";
import Article from "../src/Article";
import Section from "../src/Section";
import BreadCrumbs from "../src/BreadCrumbs";
import Autocomplete from "../src/Autocomplete";

// import "../src/styles.css";
// import "../src/code.css";

const fetchStructure = memoize(code =>
  fetch(`http://127.0.0.1:3005/texte/${code}/structure`).then(r => r.json())
);

const fetchSection = memoize((code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/section/${id}`).then(r => r.json())
);

const fetchArticle = memoize((code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/article/${id}`).then(r => r.json())
);

const fetchNode = (code, node) => {
  if (node.type === "article") {
    return fetchArticle(code, node.id);
  } else if (node.type === "section") {
    return fetchSection(code, node.id);
  }
};

// const Article = ({ data }) => (
//   <div>
//     <h1>
//       {data.titre}
//       <a
//         href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
//           data.id
//         }&cidTexte=${data.cid}`}
//         style={{ fontSize: "1rem", margin: "0 20px" }}
//       >
//         Voir sur Légifrance
//       </a>
//     </h1>

//     <div dangerouslySetInnerHTML={{ __html: data.bloc_textuel }} />
//     <div dangerouslySetInnerHTML={{ __html: data.nota }} />
//   </div>
// );

const previewComponents = {
  article: Article,
  section: Section
};

const Preview = ({ code, node, onSectionClick }) => {
  const PreviewComponent = node && previewComponents[node.type];
  return (
    <AsyncFetch
      fetch={() => fetchNode(code, node)}
      autoFetch={true}
      render={({ status, result }) => {
        if (result) {
          return (
            <div className="code">
              <BreadCrumbs items={result.parents} onClick={onSectionClick} />
              <PreviewComponent {...result} />
            </div>
          );
        }
        return "loading...";
      }}
    />
  );
};

class Browser extends React.Component {
  state = {
    active: null
  };
  onSelectCode = code => {
    this.setState({
      active: null
    });
  };
  onToggle = (node, isOpened) => {
    if (!node.type || node.type === "text") return;
    this.setState({
      active: isOpened ? node : null
    });
  };
  onSectionClick = section => {
    this.setState({
      active: { ...section, type: "section" }
    });
  };
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            background: "#eaeaea",
            flex: "0 0 350px",
            padding: 20,
            maxWidth: 350
          }}
        >
          <Autocomplete
            items={require("../src/codes.json")}
            onSelect={this.onSelectCode}
          />
          <Tree {...this.props.structure} onToggle={this.onToggle} />
        </div>
        <div style={{ background: "#efefef", flex: "1 0 0", padding: 20 }}>
          {(this.state.active && (
            <Preview
              onSectionClick={this.onSectionClick}
              code={this.state.code}
              node={this.state.active}
            />
          )) ||
            "Bienvenue"}
        </div>
      </div>
    );
  }
}

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
    const PreviewComponent = detailData && previewComponents[detailData.type];
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
            <PreviewComponent {...detailData} />
          </div>
        )}
      </Layout>
    );
  }
}

export default CodePage;
