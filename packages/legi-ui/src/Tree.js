import React from "react";
import cx from "classnames";

const TreeNode = ({
  id,
  titre_ta,
  type,
  onClick,
  isActive,
  isOpened,
  children,
  depth = 0
}) => {
  const expand = isOpened(id);
  return (
    <div
      key={id}
      className={cx({
        node: true,
        "is-active": isActive(id),
        "is-opened": depth < 2 || expand
      })}
      style={{
        marginLeft: Math.max(10, Math.min(6, depth + 1) * (5 - depth)) + "px"
      }}
    >
      <div
        style={{
          margin: "5px 0",
          textOverflow: "ellipsis",
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        <a
          style={{ cursor: "pointer" }}
          onClick={e => {
            e.preventDefault();
            onClick({ id, titre_ta, type });
          }}
        >
          {titre_ta}
        </a>
      </div>
      <div>
        {children &&
          expand &&
          children.map(child => (
            <TreeNode
              key={child.id}
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
    const { id, titre_ta, children } = this.props;
    return (
      <TreeNode
        id={id}
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
