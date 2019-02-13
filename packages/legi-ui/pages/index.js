import React from "react";
import PropTypes from "prop-types";

import Link from 'next/link';
import Layout from "../src/Layout";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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

const BasesGrid = ({ classes, bases }) => (
  <Grid
    style={{ marginTop: 20, justifyContent: "center" }}
    container
    justify="center"
    spacing={32}
  >
    {bases.map(base => (
      <Grid key={base.id} item>
        <Base classes={classes} {...base} />
      </Grid>
    ))}
  </Grid>
);

const Base = ({ classes, id, titre, description }) => (
  <Link href={{ pathname: "/codes", query: { base: id } }}>
    <Card className={classes.codeCard}>
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

Base.propTypes = {
  classes: PropTypes.object.isRequired
};


class Bases extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout enableDrawer={false} title={`legiXplore`}>
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <BasesGrid classes={classes} bases={[
            {id: "LEGI", titre: "LEGI", description: "Le droit"},
            {id: "KALI", titre: "KALI", description: "Les CCNs"}
          ]} />
        </div>
      </Layout>
    );
  }
}
Bases.defaultProps = {
  codes: []
};
export default withStyles(styles)(Bases);
