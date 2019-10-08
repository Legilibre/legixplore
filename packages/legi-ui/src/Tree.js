import React from "react";
import cx from "classnames";
import { withRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { Folder, FolderOpen, Subject } from "@material-ui/icons";

import DocumentLink from "./DILABaseLink";

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
  conteneurId,
  texteId,
  sectionId,
  titre,
  type,
  onClick,
  children,
  query,
  isExpanded,
  depth = 0
}) => {
  const expand = isExpanded({ id, depth });
  return (
    <div
      key={id}
      className={classes.nodeRow}
      style={{
        marginLeft: Math.max(10, Math.min(6, depth + 1) * (5 - depth)) + "px"
      }}
    >
      {depth > 0 && (
        <DocumentLink type={type} id={id} conteneurId={conteneurId} texteId={texteId} sectionId={sectionId}>
          <Typography
            onClick={e => onClick(id, expand)}
            className={cx(
              classes.nodeLabel,
              isActive(query, id) && classes.underlined
            )}
            color="inherit"
            noWrap={true}
            title={titre}
          >
            {["section", "texte", "tetier"].includes(type) ? (
              expand ? (
                <FolderOpen className={classes.icon} />
              ) : (
                <Folder className={classes.icon} />
              )
            ) : (
              <Subject className={classes.icon} />
            )}
            {titre}
          </Typography>
        </DocumentLink>
      )}
      <div>
        {children &&
          expand &&
          children.map(child => (
            // recursive component
            <TreeNode
              classes={classes}
              key={child.id}
              conteneurId={conteneurId}
              texteId={texteId}
              sectionId={sectionId}
              {...child}
              onClick={onClick}
              depth={depth + 1}
              query={query}
              isExpanded={isExpanded}
            />
          ))}
      </div>
    </div>
  );
};

TreeNode.defaultProps = {
  isExpanded: ({ id, depth }) => true
};

// handle local state
class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: [
      props.conteneurId,
      props.texteId,
      props.sectionId,
    ] };
  }
  onClick = (id, opened) => {
    this.setState(state => {
      if (opened) {
        return {
          opened: this.state.opened.filter(x => x !== id)
        };
      }
      return {
        opened: [...this.state.opened, id]
      };
    });
  };
  isExpanded = ({ id, depth }) => {
    return depth < 2 || this.state.opened.indexOf(id) > -1;
  };
  render() {
    const { classes, conteneurId, texteId, sectionId, id, titre, children, router } = this.props;
    return (
      <TreeNode
        id={id}
        texteId={texteId}
        conteneurId={conteneurId}
        sectionId={sectionId}
        onClick={this.onClick}
        classes={classes}
        titre={titre}
        query={router.query}
        isExpanded={this.isExpanded}
      >
        {children}
      </TreeNode>
    );
  }
}

export default withRouter(withStyles(styles)(Tree));
