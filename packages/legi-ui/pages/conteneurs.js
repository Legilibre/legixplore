import React from "react";
import PropTypes from "prop-types";
import getFuse from "../src/lib/getFuse"
import { format } from "date-fns";

import Link from 'next/link'
import Layout from "../src/Layout";
import { fetchConteneurs } from "../src/api";

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
  conteneurCard: {
    width: 400,
    height: "100%"
  },
  colorStripe: {
    height: 30,
    background: `linear-gradient(to right bottom, ${
      theme.palette.primary.main
    }, ${theme.palette.primary.main})`
  }
});

const ConteneurItem = ({ classes, base, id, titre, description, date_publi }) => (
  <Link href={{ pathname: "/conteneur", query: { base: base, conteneur: id } }}>
    <Card className={classes.conteneurCard}>
      <CardActionArea>
        <div className={classes.colorStripe} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {titre}
          </Typography>
          <Typography component="p">
            <b>Date de publication : </b>
            {format(date_publi, "DD/MM/YYYY")}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
);

ConteneurItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const visibleConteneurs = {
  'KALI': [
    "KALICONT000018563755", // 2596 CCN de la coiffure
    "KALICONT000005635221", // 1596 CCN du bâtiment (- de 10 salariés)
    "KALICONT000005635953", // 1043 CCN des gardiens concierges et employés d'immeubles
    "KALICONT000005635534", // 1979 CCN des hôtels  cafés restaurants HCR
    "KALICONT000005635173", // 1486 CCN des bureaux d'études techniques...
    "KALICONT000005635191", // 1090 CCN de l'automobile ...
  ]
};

class Home extends React.Component {
  state = {
    query: "",
    conteneurs: this.props.conteneurs.filter(code =>
      visibleConteneurs[this.props.base].indexOf(code.id) > -1
    )
  };
  static async getInitialProps({ query }) {
    const { base } = query;
    if (base !== "KALI") throw new Error("conteneurs pages only accessible for KALI");
    const conteneurs = await fetchConteneurs();
    return { conteneurs, base };
  }
  componentDidMount() {
    this.fuse = getFuse(this.props.conteneurs);
  }
  onKeyDown = e => {
    const query = e.target.value;
    if (query.trim() === "") {
      this.setState({ query, conteneurs: this.props.conteneurs });
      return;
    }
    const conteneurs = this.fuse
      .search(query.trim())
      .filter(q => q.matches.length)
      .map(r => r.item)
      .slice(0, 25);

    this.setState({ query, conteneurs });
  };

  render() {
    const { classes, base } = this.props;
    const { query, conteneurs } = this.state;

    return (
      <Layout
        enableDrawer={false}
        title={`legiXplore : Exploration de la base ${base}`}
      >
        <div style={{ margin: "20px auto", maxWidth: 900 }}>
          <TextField
            style={{ margin: "20px auto" }}
            inputProps={{ style: { fontSize: "1.3em" } }}
            placeholder="ex: convention du bâtiment"
            helperText={`Choisissez parmi les ${this.props.conteneurs.length} conteneurs disponibles dans ${base}`}
            fullWidth
            onChange={this.onKeyDown}
            value={query}
            margin="normal"
          />
          <Grid
            style={{ marginTop: 20, justifyContent: "center" }}
            container
            justify="center"
            spacing={32}
          >
            {conteneurs.map(conteneur => (
              <Grid key={conteneur.id} item>
                <ConteneurItem classes={classes} base={base} {...conteneur} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    );
  }
}
Home.defaultProps = {
  conteneurs: []
};
export default withStyles(styles)(Home);
