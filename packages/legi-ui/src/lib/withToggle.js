import React from "react";

class Toggled extends React.Component {
  state = {
    opened: true
  };
  onToggle = () => {
    this.setState(curState => ({ opened: !curState.opened }));
  };
  render() {
    const { Component, ...props } = this.props;
    return (
      <Component
        {...props}
        opened={this.state.opened}
        onToggle={this.onToggle}
      />
    );
  }
}

export const withToggle = Component => props => (
  <Toggled {...props} Component={Component} />
);

export default withToggle;
