import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import JssProvider from "react-jss/lib/JssProvider";
import { withRouter } from "next/router";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import getPageContext from "../src/getPageContext";
import RouterProgress from "../src/RouterProgress";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
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
            <RouterProgress router={this.props.router} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRouter(MyApp);
