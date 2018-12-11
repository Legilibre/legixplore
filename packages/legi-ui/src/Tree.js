import React from "react";
import find from "unist-util-find";
import { Link } from "./routes";

import { Typography } from "@material-ui/core";

import { Folder, FolderOpen, Subject } from "@material-ui/icons";

const isParentOf = (id, type, children, filters) => {
  const child = find({ children }, node => {
    if (filters.section) {
      if (id == filters.section && type === "section") {
        return true;
      }
      return node.type === "section" && node.id === filters.section;
    } else if (filters.article) {
      if (id == filters.article && type === "article") {
        return true;
      }
      return node.type === "article" && node.id === filters.article;
    }
  });
  return child;
};

const TreeNode = ({
  id,
  cid,
  titre_ta,
  type,
  onClick,
  isActive,
  isOpened,
  children,
  query,
  depth = 0
}) => {
  const expand =
    isOpened(id) ||
    isParentOf(id, type, children, {
      section: query.section,
      article: query.article
    });

  return (
    <div
      key={id}
      style={{
        marginTop: 5,
        marginBottom: 5,
        marginLeft: Math.max(10, Math.min(6, depth + 1) * (5 - depth)) + "px"
      }}
    >
      {depth > 0 && (
        <Link route={type} params={{ code: cid, [type]: id }}>
          <Typography
            style={{ cursor: "pointer" }}
            color="inherit"
            noWrap={true}
            onClick={e => {
              onClick({ id, titre_ta, type });
            }}
            title={titre_ta}
          >
            {type === "section" ? (
              expand ? (
                <FolderOpen
                  style={{ verticalAlign: "bottom", marginRight: 5 }}
                />
              ) : (
                <Folder style={{ verticalAlign: "bottom", marginRight: 5 }} />
              )
            ) : (
              <Subject style={{ verticalAlign: "bottom", marginRight: 5 }} />
            )}
            {titre_ta}
          </Typography>
        </Link>
      )}
      <div>
        {children &&
          expand &&
          children.map(child => (
            <TreeNode
              key={child.id}
              cid={cid}
              {...child}
              onClick={onClick}
              isActive={isActive}
              isOpened={isOpened}
              depth={depth + 1}
              query={query}
            />
          ))}
      </div>
    </div>
  );
};

// update state tree when toggling some tree node
const getNewTreeState = (state, node) => {
  const newState = {
    activeId: state.activeId === node.id ? null : node.id,
    opened: state.opened
  };
  if (state.opened.indexOf(node.id) === -1) {
    newState.opened = [...newState.opened, node.id];
  } else {
    newState.opened = newState.opened.filter(item => item !== node.id);
  }
  return newState;
};

class Tree extends React.Component {
  state = {
    activeId: null,
    opened: []
  };
  onToggle = node => {
    if (node.type === "text") return;
    this.setState(
      state => getNewTreeState(state, node),
      () => {
        if (this.props.onToggle) {
          this.props.onToggle(node, this.state.opened);
        }
      }
    );
  };
  isActive = id => {
    return this.state.activeId === id;
  };
  isOpened = id => {
    return !id || this.state.opened.indexOf(id) > -1;
  };

  render() {
    const { cid, id, titre_ta, children, query } = this.props;
    return (
      <TreeNode
        id={id}
        cid={cid}
        titre_ta={titre_ta}
        onClick={this.onToggle}
        isActive={this.isActive}
        isOpened={this.isOpened}
        query={query}
      >
        {children}
      </TreeNode>
    );
  }
}

export default Tree;
