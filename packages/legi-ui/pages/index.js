import React from "react";
import { Typography } from "@material-ui/core";

import Layout from "../src/Layout";

class Home extends React.Component {
  render() {
    return (
      <Layout title="LEGI-explorer">
        <Typography variant="h1" color="inherit">
          Home
        </Typography>
      </Layout>
    );
  }
}

export default Home;
