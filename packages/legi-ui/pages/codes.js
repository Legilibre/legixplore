import React from "react";
import PropTypes from "prop-types";
import getFuse from "../src/lib/getFuse"
import { format } from "date-fns";

import Link from 'next/link'
import Layout from "../src/Layout";
import { fetchCodes, fetchConteneurs } from "../src/api";
import { CardApi } from "../src/Metadata";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  card: {
    width: 400,
    height: "100%"
  },
  codeCard: {
    width: 400,
    height: "100%"
  },
  gridList: {
    width: 900
  },
  colorStripe: {
    height: 30,
    background: `linear-gradient(to right bottom, ${
      theme.palette.primary.main
    }, ${theme.palette.primary.main})`
  }
});

const CodesGrid = ({ classes, codes, children, base }) => (
  <Grid
    style={{ marginTop: 20, justifyContent: "center" }}
    container
    justify="center"
    spacing={32}
  >
    {codes.map(code => (
      <Grid key={code.id} item>
        <Code classes={classes} base={base} {...code} />
      </Grid>
    ))}
  </Grid>
);

const Code = ({ classes, base, id, titre, description, derniere_modification }) => (
  <Link href={{ pathname: "/code", query: { base: base, conteneur: id } }}>
    <Card className={classes.codeCard}>
      <CardActionArea>
        <div className={classes.colorStripe} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {titre}
          </Typography>
          <Typography component="p">
            <b>Dernière modification : </b>
            {format(derniere_modification, "DD/MM/YYYY")}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
);

Code.propTypes = {
  classes: PropTypes.object.isRequired
};

const visibleCodes = {
  'LEGI': [
    "LEGITEXT000006070933",
    "LEGITEXT000031366350",
    "LEGITEXT000023086525",
    "LEGITEXT000006072050",
    "LEGITEXT000006070719",
    "LEGITEXT000022197698"
  ]
};

class Home extends React.Component {
  state = {
    query: "",
    codes: this.props.codes.filter(code =>
      visibleCodes[this.props.base].indexOf(code.id) > -1
    )
  };
  static async getInitialProps({ query }) {
    const base = query.base || 'LEGI';
    if (base !== "LEGI") throw new Error("codes pages only accessible for LEGI");
    const codes = await fetchCodes();
    return { codes, base };
  }
  componentDidMount() {
    this.fuse = getFuse(this.props.codes);
  }
  onKeyDown = e => {
    const query = e.target.value;
    if (query.trim() === "") {
      this.setState({ query, codes: this.props.codes });
      return;
    }
    const codes = this.fuse
      .search(query.trim())
      .filter(q => q.matches.length)
      .map(r => r.item)
      .slice(0, 25);

    this.setState({ query, codes });
  };

  render() {
    const { classes, base } = this.props;
    const { query, codes } = this.state;

    return (
      <Layout
        enableDrawer={false}
        title={`legiXplore : Exploration de la base ${base}`}
      >
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <TextField
            style={{ margin: "20px auto" }}
            inputProps={{ style: { fontSize: "1.3em" } }}
            placeholder="ex: code du travail"
            helperText={`Choisissez parmi les ${this.props.codes.length} codes disponibles dans ${base}`}
            fullWidth
            onChange={this.onKeyDown}
            value={query}
            margin="normal"
          />
          <CodesGrid classes={classes} codes={codes} base={base} />
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
