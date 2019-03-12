import React from "react";
import Fuse from "fuse.js";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Code from "./Code";

const featuredCodes = [
  "LEGITEXT000006070933",
  "LEGITEXT000031366350",
  "LEGITEXT000023086525",
  "LEGITEXT000006072050",
  "LEGITEXT000006070719",
  "LEGITEXT000006071367"
];

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

class CodeSearch extends React.Component {
  state = {
    query: "",
    codes: this.props.codes.filter(code => featuredCodes.indexOf(code.cid) > -1)
  };
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
    const { classes } = this.props;
    const { query, codes } = this.state;
    return (
      <React.Fragment>
        <TextField
          style={{ margin: "20px auto" }}
          inputProps={{ style: { fontSize: "1.3em" } }}
          placeholder="ex: code du travail"
          helperText={`Choisissez parmi les ${
            this.props.codes.length
          } codes disponibles dans LEGI`}
          fullWidth
          onChange={this.onKeyDown}
          value={query}
          margin="normal"
        />
        <CodesGrid classes={classes} codes={codes} />
      </React.Fragment>
    );
  }
}
CodeSearch.defaultProps = {
  codes: []
};

export default withStyles()(CodeSearch);
