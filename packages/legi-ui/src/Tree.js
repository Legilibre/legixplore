import React from "react";
import find from "unist-util-find";
import cx from "classnames";
import { withRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { Folder, FolderOpen, Subject } from "@material-ui/icons";

import { Link } from "./routes";

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

const isActive = (props, id) => {
  return props.article === id || props.section === id;
};

const styles = theme => ({
  nodeRow: {
    marginTop: 5,
    marginBottom: 5
  },
  nodeLabel: {
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  underlined: {
    textDecoration: "underline"
  },
  icon: {
    verticalAlign: "bottom",
    marginRight: 5
  }
});

const TreeNode = ({
  id,
  classes,
  cid,
  titre_ta,
  type,
  onClick,
  children,
  query,
  depth = 0
}) => {
  const expand =
    depth < 2 ||
    isParentOf(id, type, children, {
      section: query.section,
      article: query.article
    });

  return (
    <div
      key={id}
      className={classes.nodeRow}
      style={{
        marginLeft: Math.max(10, Math.min(6, depth + 1) * (5 - depth)) + "px"
      }}
    >
      {depth > 0 && (
        <Link route={type} params={{ code: cid, [type]: id }}>
          <Typography
            className={cx(
              classes.nodeLabel,
              isActive(query, id) && classes.underlined
            )}
            color="inherit"
            noWrap={true}
            title={titre_ta}
          >
            {type === "section" ? (
              expand ? (
                <FolderOpen className={classes.icon} />
              ) : (
                <Folder className={classes.icon} />
              )
            ) : (
              <Subject className={classes.icon} />
            )}
            {titre_ta}
          </Typography>
        </Link>
      )}
      <div>
        {children &&
          expand &&
          children.map(child => (
            // recursive component
            <TreeNode
              classes={classes}
              key={child.id}
              cid={cid}
              {...child}
              onClick={onClick}
              depth={depth + 1}
              query={query}
            />
          ))}
      </div>
    </div>
  );
};

class Tree extends React.Component {
  render() {
    const { classes, cid, id, titre_ta, children, router } = this.props;
    return (
      <TreeNode
        id={id}
        cid={cid}
        classes={classes}
        titre_ta={titre_ta}
        onClick={this.onToggle}
        query={router.query}
      >
        {children}
      </TreeNode>
    );
  }
}

export default withRouter(withStyles(styles)(Tree));
