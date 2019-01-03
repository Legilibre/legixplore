import React from "react";
import { Typography } from "@material-ui/core";

import { Link } from "../src/routes";
import Layout from "../src/Layout";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  card: {
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

import Grid from "@material-ui/core/Grid";

const CodesGrid = ({ classes, codes, children }) => (
  <Grid
    style={{ marginTop: 20, justifyContent: "center" }}
    container
    justify="center"
    spacing={32}
  >
    {codes.map(code => (
      <Grid key={code.id} item>
        <Code classes={classes} {...code} />
      </Grid>
    ))}
  </Grid>
);

const Code = ({ classes, id, titre, description }) => (
  <Link route="code" params={{ code: id }}>
    <Card className={classes.card}>
      <CardActionArea>
        <div className={classes.colorStripe} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {titre}
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

//export default withStyles(styles)(MediaCard);

import codes from "../src/codes";

import Fuse from "fuse.js";

const DEFAULT_FUSE_OPTIONS = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  includeMatches: true,
  //findAllMatches: true,
  includeScore: true,
  threshold: 0.5,
  //location: 0,
  //distance: 100,
  maxPatternLength: 16,
  minMatchCharLength: 1,
  keys: ["titre"]
};

const getFuse = data => new Fuse(data, DEFAULT_FUSE_OPTIONS);

class Home extends React.Component {
  state = {
    query: "",
    items: this.props.items
  };
  componentDidMount() {
    this.fuse = getFuse(this.props.items);
  }
  onKeyDown = e => {
    const query = e.target.value;
    if (query.trim() === "") {
      this.setState({ query, items: this.props.items });
      return;
    }
    const items = this.fuse
      .search(query.trim())
      .filter(q => q.matches.length)
      .map(r => r.item)
      .slice(0, 25);

    this.setState({ query, items });
  };
  render() {
    const { classes } = this.props;
    const { query, items } = this.state;
    //const showCodes = this.props.items.filter(code => !!code.description);
    return (
      <Layout
        enableDrawer={false}
        title="legiXplore : Exploration de la base LEGI"
      >
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <TextField
            style={{ margin: "20px auto" }}
            inputProps={{ style: { fontSize: "1.3em" } }}
            placeholder="ex: code du travail"
            helperText={`Choisissez parmi les ${
              this.props.items.length
            } codes disponibles dans LEGI`}
            fullWidth
            onChange={this.onKeyDown}
            value={query}
            margin="normal"
          />
          <CodesGrid classes={classes} codes={items} />
        </div>
      </Layout>
    );
  }
}
Home.defaultProps = {
  items: codes.filter(code => !!code.description)
};
export default withStyles(styles)(Home);
