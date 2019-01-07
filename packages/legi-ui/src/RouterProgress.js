import LinearProgress from "@material-ui/core/LinearProgress";

class RouterProgress extends React.Component {
  state = {
    loading: false
  };
  handleRouteChangeStart = url => {
    this.setState({ loading: true });
  };
  handleRouteChangeComplete = url => {
    this.setState({ loading: false });
  };
  handleRouteChangeError = url => {
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.props.router.events.on(
      "routeChangeStart",
      this.handleRouteChangeStart
    );
    this.props.router.events.on(
      "routeChangeComplete",
      this.handleRouteChangeComplete
    );
    this.props.router.events.on(
      "routeChangeError",
      this.handleRouteChangeError
    );
  }
  componentWillUnmount() {
    this.props.router.events.off(
      "routeChangeStart",
      this.handleRouteChangeStart
    );
    this.props.router.events.off(
      "routeChangeComplete",
      this.handleRouteChangeComplete
    );
    this.props.router.events.off(
      "routeChangeError",
      this.handleRouteChangeError
    );
  }
  render() {
    return (
      (this.state.loading && (
        <LinearProgress
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            height: "4px",
            zIndex: 9999
          }}
        />
      )) ||
      null
    );
  }
}

export default RouterProgress;
