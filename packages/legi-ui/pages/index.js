//import { Treebeard, decorators } from "react-treebeard";
import React from "react";
import styled from "styled-components";
//import Tree from "react-ui-tree";
import AsyncFetch from "../src/AsyncFetch";
import map from "unist-util-map";
import cx from "classnames";

import Tree from "../src/Tree";
import Autocomplete from "../src/Autocomplete";

import "../src/styles.css";
import "../src/code.css";
import "../src/tree.css";

const fetchStructure = code =>
  fetch(`http://127.0.0.1:3005/texte/${code}/structure`).then(r => r.json());

const fetchSection = (code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/section/${id}`).then(r =>
    r.json()
  );

const fetchArticle = (code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/article/${id}`).then(r =>
    r.json()
  );

const fetchNode = (code, node) => {
  if (node.type === "article") {
    return fetchArticle(code, node.id);
  } else if (node.type === "section") {
    return fetchSection(code, node.id);
  }
};

const BreadcrumbsContainer = styled.div`
  span {
    border-right: 1px solid silver;
    padding: 0 10px;
  }
`;

const Breadcrumbs = ({ items, onClick }) => (
  <BreadcrumbsContainer>
    {items &&
      items.map(p => (
        <span
          style={{ borderRight: "1px solid silver", padding: "0 10px" }}
          key={p.id}
        >
          <a href="#" onClick={() => onClick(p)}>
            {p.titre_ta}
          </a>
        </span>
      ))}
  </BreadcrumbsContainer>
);

const Article = ({ parents, data, onSectionClick }) => (
  <div>
    <h1>
      {data.titre}
      <a
        href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
          data.id
        }&cidTexte=${data.cid}`}
        style={{ fontSize: "1rem", margin: "0 20px" }}
      >
        Voir sur Légifrance
      </a>
    </h1>

    <Breadcrumbs items={parents} onClick={onSectionClick} />
    <div dangerouslySetInnerHTML={{ __html: data.bloc_textuel }} />
    <div dangerouslySetInnerHTML={{ __html: data.nota }} />
  </div>
);

const H = ({ depth, ...props }) =>
  [
    <h1 {...props} />,
    <h2 {...props} />,
    <h3 {...props} />,
    <h4 {...props} />,
    <h5 {...props} />,
    <h6 {...props} />,
    <h7 {...props} />,
    <h8 {...props} />
  ][depth] || null;

const MAX_DEPTH = 3;

const Section = ({ children, data, titre_ta, depth = 0 }) =>
  (depth < MAX_DEPTH && (
    <div>
      <H depth={depth}>{titre_ta}</H>
      {(depth === 0 &&
        data.cid && (
          <a
            href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
              data.id
            }&cidTexte=${data.cid}`}
          >
            Légifrance
          </a>
        )) ||
        null}
      {children &&
        children.map(child => {
          if (child.type === "article") {
            return <li key={child.data.id}>{child.data.titre}</li>;
          } else if (child.type === "section") {
            return (
              (
                <div key={child.data.id}>
                  <H depth={depth + 1}>{child.data.titre_ta}</H>
                  <Section depth={depth + 1}>{child.children}</Section>
                </div>
              ) || null
            );
          }
        })}
    </div>
  )) ||
  null;

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
              <PreviewComponent {...result} onSectionClick={onSectionClick} />
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
    active: null,
    code: "LEGITEXT000006072665"
  };
  onSelectCode = code => {
    this.setState({
      code: code.id,
      active: null
    });
  };
  onToggle = (node, isOpened) => {
    if (!node.type || node.type === "text") return;
    this.setState({
      active: isOpened ? node : null
    });
  };
  onSectionClick = section => {};
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
          <AsyncFetch
            fetch={() => fetchStructure(this.state.code)}
            fetchKey={this.state.code}
            autoFetch={true}
            render={({ status, result }) =>
              (result && <Tree {...result} onToggle={this.onToggle} />) ||
              "loading..."
            }
          />
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

export default () => <Browser />;
