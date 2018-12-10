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

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  redBook: {
    height: 30,
    background:
      "linear-gradient(to right bottom, rgb(242,57,71), rgb(178,38,42))"
  }
};

import Grid from "@material-ui/core/Grid";

const CodesGrid = ({ codes, children }) => (
  <Grid style={{ marginTop: 20 }} container justify="center" spacing={32}>
    {codes.map(code => (
      <Grid key={code.id} item sm={12} md={6} lg={3}>
        <Code {...code} />
      </Grid>
    ))}
  </Grid>
);
/*rial-ui/core/Paper";

{codes.map(code => (
            <Code {...code} key={code.id} />
          ))}

class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="Spacing"
                  value={spacing}
                  onChange={this.handleChange('spacing')}
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="8" control={<Radio />} label="8" />
                  <FormControlLabel value="16" control={<Radio />} label="16" />
                  <FormControlLabel value="24" control={<Radio />} label="24" />
                  <FormControlLabel value="32" control={<Radio />} label="32" />
                  <FormControlLabel value="40" control={<Radio />} label="40" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

const _Code = ({ classes, id, titre, description }) => (
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
      <Link route="code" params={{ code: id }}>
        <Button size="small" color="primary">
          Consulter
        </Button>
      </Link>
    </CardActions>
  </Card>
);

_Code.propTypes = {
  classes: PropTypes.object.isRequired
};

const Code = withStyles(styles)(_Code);
//export default withStyles(styles)(MediaCard);

import codes from "../src/codes";

class Home extends React.Component {
  render() {
    console.log("codes", codes);
    return (
      <Layout
        enableDrawer={false}
        title="legiXplore : Exploration de la base LEGI"
      >
        <CodesGrid codes={codes} />
      </Layout>
    );
  }
}

export default Home;
