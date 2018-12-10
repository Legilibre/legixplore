import React from "react";
import { Link } from "./routes";
/*

  <React.Fragment>
    <div className={classes.toolbarIcon}>
      <IconButton onClick={onToggle}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <List>
      <Typography color="inherit">Entry 1</Typography>
      <Typography color="inherit">Entry 1</Typography>
      <Typography color="inherit">Entry 1</Typography>
      <Typography color="inherit">Entry 1</Typography>
      <Typography color="inherit">Entry 1</Typography>
      <Typography color="inherit">Entry 1</Typography>
    </List>
    <Divider />
    <List>
      <Typography color="inherit">Entry 1</Typography>
    </List>
  </React.Fragment>
  */

import { Typography } from "@material-ui/core";

const TreeNode = ({
  id,
  cid,
  titre_ta,
  type,
  onClick,
  isActive,
  isOpened,
  children,
  depth = 0
}) => {
  const expand = isOpened(id);
  console.log("type, id", type, id, cid);
  return (
    <div
      key={id}
      style={{
        marginLeft: Math.max(10, Math.min(6, depth + 1) * (5 - depth)) + "px"
      }}
    >
      <Typography color="inherit" noWrap={true}>
        <Link route={type} params={{ code: cid, [type]: id }}>
          <a
            title={titre_ta}
            style={{ cursor: "pointer" }}
            onClick={e => {
              onClick({ id, titre_ta, type });
            }}
          >
            {titre_ta}
          </a>
        </Link>
      </Typography>
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
    const { cid, id, titre_ta, children } = this.props;
    return (
      <TreeNode
        id={id}
        cid={cid}
        titre_ta={titre_ta}
        onClick={this.onToggle}
        isActive={this.isActive}
        isOpened={this.isOpened}
      >
        {children}
      </TreeNode>
    );
  }
}

export default Tree;
