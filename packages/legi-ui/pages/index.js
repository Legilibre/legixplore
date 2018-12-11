import React from "react";
import { Typography } from "@material-ui/core";

import { Link } from "../src/routes";
import Layout from "../src/Layout";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme =>
  console.log(theme) || {
    card: {
      maxWidth: 450
    },
    media: {
      height: 140
    },
    redBook: {
      height: 30,
      background: `linear-gradient(to right bottom, ${
        theme.palette.primary.main
      }, ${theme.palette.primary.main})`
    }
  };

import Grid from "@material-ui/core/Grid";

const CodesGrid = ({ codes, children }) => (
  <Grid
    style={{ marginTop: 20, justifyContent: "center" }}
    container
    justify="center"
    spacing={32}
  >
    {codes.map(code => (
      <Grid key={code.id} item>
        <Code {...code} />
      </Grid>
    ))}
  </Grid>
);

const _Code = ({ classes, id, titre, description }) => (
  <Link route="code" params={{ code: id }}>
    <Card className={classes.card}>
      <CardActionArea>
        <div className={classes.redBook} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {titre}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Consulter
        </Button>
      </CardActions>
    </Card>
  </Link>
);

_Code.propTypes = {
  classes: PropTypes.object.isRequired
};

const Code = withStyles(styles)(_Code);
//export default withStyles(styles)(MediaCard);

import codes from "../src/codes";

class Home extends React.Component {
  render() {
    const showCodes = codes.filter(code => !!code.description);
    return (
      <Layout
        enableDrawer={false}
        title="legiXplore : Exploration de la base LEGI"
      >
        <CodesGrid codes={showCodes} />
      </Layout>
    );
  }
}

export default Home;
