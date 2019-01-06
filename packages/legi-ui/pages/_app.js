import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import { withRouter } from "next/router";
import getPageContext from "../src/getPageContext";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  routerProgress: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "4px",
    zIndex: 9999
  }
};

class _RouterLinearProgress extends React.Component {
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
        <div className={this.props.classes.routerProgress}>
          {<LinearProgress />}
        </div>
      )) ||
      null
    );
  }
}

const RouterLinearProgress = withStyles(styles)(
  withRouter(_RouterLinearProgress)
);

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }
  componentDidUpdate() {
    this.scrollTop();
  }
  scrollTop() {
    if (typeof document !== undefined) {
      window.scrollTo(0, 0);
      const main = document.querySelector("main");
      if (main) {
        main.scrollTop = 0;
      }
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>LEGI-explorer</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
        <RouterLinearProgress />
      </Container>
    );
  }
}

export default withRouter(MyApp);
