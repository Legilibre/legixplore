import React from "react";

import Layout from "../src/Layout";
import { fetchCodes } from "../src/api";
import CardApi from "../src/CardApi";

import { withStyles } from "@material-ui/core/styles";

import CodeSearch from "../src/home/CodeSearch";

const styles = theme => ({
  card: {
    width: 400,
    height: "100%"
  }
});

class Home extends React.Component {
  static async getInitialProps({ query }) {
    const codes = await fetchCodes();
    return { codes };
  }

  render() {
    return (
      <Layout
        enableDrawer={false}
        title="legiXplore : Exploration de la base LEGI"
      >
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <CodeSearch codes={this.props.codes} />
          <CardApi
            classes={this.props.classes}
            style={{ width: "100%", marginTop: 40 }}
            url={`https://legi.now.sh/codes.json`}
          />
        </div>
      </Layout>
    );
  }
}
Home.defaultProps = {
  codes: []
};
export default withStyles(styles)(Home);
