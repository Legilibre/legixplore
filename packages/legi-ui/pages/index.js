//import { Treebeard, decorators } from "react-treebeard";
import React from "react";
import styled from "styled-components";
import Tree from "react-ui-tree";
import AsyncFetch from "../src/AsyncFetch";
import map from "unist-util-map";

import Autocomplete from "../src/Autocomplete";

import "../src/styles.css";
import "../src/code.css";
import "../src/tree.css";
//import structure from "../structure.json";

// const myDecorators = {
//   ...decorators,
//   Header: ({ style, node }) => {
//     const hasChildren = node.children && node.children.length;
//     const isArticle = node.type === "article";

//     return (
//       <div style={style.base}>
//         <div
//           style={{
//             ...style.title,
//             textDecoration: "underline",
//             cursor: "pointer"
//           }}
//         >
//           {node.title}
//         </div>
//       </div>
//     );
//   },
//   Toggle: ({ style, node, children }) =>
//     (node && node.children && node.children.length && <div>pouet</div>) ||
//     decorators.Toggle({ style, node, children })
// };
// // Example: Customising The Header Decorator To Include Icons

// const animations = {
//   toggle: ({ node: { toggled } }) => ({
//     animation: { rotateZ: toggled ? 90 : 0 },
//     duration: 50
//   }),
//   drawer: (/* props */) => ({
//     enter: {
//       animation: "slideDown",
//       duration: 50
//     },
//     leave: {
//       animation: "slideUp",
//       duration: 50
//     }
//   })
// };

//const code = "LEGITEXT000006072665";

const fetchStructure = code =>
  fetch(`http://127.0.0.1:3005/texte/${code}/structure`)
    .then(r => r.json())
    .then(json => map(json, data => ({ ...data, collapsed: true })))
    .then(json => ({
      ...json,
      // toggle root by default
      collapsed: false,
      children: json.children.map(child => ({ ...child, collapsed: true }))
    }));

const fetchSection = (code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/section/${id}`).then(r =>
    r.json()
  );

const fetchArticle = (code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/article/${id}`).then(r =>
    r.json()
  );

// class Structure extends React.Component {
//   // state = {
//   //   active: null
//   // };
//   // onToggle = (node, toggled) => {
//   //   console.log("onToggle", node);
//   //   if (node.children) {
//   //     node.toggled = toggled;
//   //   }
//   //   this.forceUpdate();
//   //   if (this.props.onToggle) {
//   //     this.props.onToggle(node, toggled);
//   //   }
//   // };
//   onClickNode = node => {
//     this.setState({
//       active: node
//     });
//   };
//   renderNode = node => {
//     return (
//       <span
//         className={`node ${node === this.state.active ? "is-active" : ""}`}
//         onClick={this.onClickNode}
//       >
//         {node.title}
//       </span>
//     );
//   };

//   render() {
//     //const data = structure;
//     return (
//       result && (
//         <Tree
//           paddingLeft={20}
//           tree={result}
//           onChange={this.onToggle}
//           renderNode={this.renderNode}
//         />
//       )
//     );
//   }
// }

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

const Article = ({
  parents,
  titre,
  id,
  cid,
  date_debut,
  date_fin,
  bloc_textuel,
  onSectionClick
}) => (
  <div>
    <h1>
      {titre}

      <a
        href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${id}&cidTexte=${cid}`}
        style={{ fontSize: "1rem", margin: "0 20px" }}
      >
        Voir sur Légifrance
      </a>
    </h1>

    <Breadcrumbs items={parents} onClick={onSectionClick} />
    <div dangerouslySetInnerHTML={{ __html: bloc_textuel }} />
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

const Section = ({ children, id, cid, titre_ta, depth = 0 }) =>
  (depth < MAX_DEPTH && (
    <div>
      <H depth={depth}>{titre_ta}</H>
      {(depth === 0 &&
        cid && (
          <a
            href={`https://www.legifrance.gouv.fr/affichCode.do?idArticle=&idSectionTA=${id}&cidTexte=${cid}`}
          >
            Légifrance
          </a>
        )) ||
        null}
      {children.map(child => {
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

const PreviewNode = ({ type, parents, data, children, onSectionClick }) => {
  if (type === "article") {
    return (
      <Article parents={parents} onSectionClick={onSectionClick} {...data} />
    );
  } else if (type === "section") {
    return (
      <Section parents={parents} onSectionClick={onSectionClick} {...data}>
        {children}
      </Section>
    );
  }
  return data.titre_ta;
};

const Preview = ({ code, node, onSectionClick }) => (
  <AsyncFetch
    fetch={() => fetchNode(code, node)}
    autoFetch={true}
    render={({ status, result }) => {
      if (result) {
        return (
          <div className="code">
            <PreviewNode {...result} onSectionClick={onSectionClick} />
          </div>
        );
      }
      return "loading...";
    }}
  />
);

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
  onToggle = node => {
    if (node.type === "text") return;
    this.setState({
      active: node
    });
    node.collapsed = !node.collapsed;
  };
  onSectionClick = section => {};
  renderNode = node => {
    return (
      <div
        className={`node ${
          this.state.active && node.id === this.state.active.id
            ? "is-active"
            : ""
        }`}
        onClick={() => this.onToggle(node)}
      >
        {node.titre_ta || node.titre}
      </div>
    );
  };
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ background: "#eaeaea", flex: "0 0 350px", padding: 20 }}>
          <Autocomplete
            items={require("../src/codes.json")}
            onSelect={this.onSelectCode}
          />
          <AsyncFetch
            fetch={() => fetchStructure(this.state.code)}
            fetchKey={this.state.code}
            autoFetch={true}
            render={({ status, result }) => {
              return (
                (result && (
                  <Tree
                    paddingLeft={20}
                    isNodeCollapsed={true}
                    tree={result}
                    renderNode={this.renderNode}
                  />
                )) ||
                "loading..."
              );
            }}
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
