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

const Base = ({ classes, id, titre, description, pathname }) => (
  <Link href={{ pathname , query: { base: id } }}>
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

Base.propTypes = {
  classes: PropTypes.object.isRequired
};


class Bases extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout enableDrawer={false} title={`legiXplore`}>
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <Grid
            style={{ marginTop: 20, justifyContent: "center" }}
            container
            justify="center"
            spacing={32}
          >
            <Grid key="LEGI" item>
              <Base classes={classes} id="LEGI" titre="LEGI" description="Le droit" pathname="/codes" />
            </Grid>
            <Grid key="KALI" item>
              <Base classes={classes} id="KALI" titre="KALI" description="Les conventions collectives nationales" pathname="/conteneurs" />
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}
export default withStyles(styles)(Bases);
