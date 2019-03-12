import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import { Link } from "../routes";

const styles = theme => ({
  codeCard: {
    width: 400,
    height: "100%"
  },
  codeHeader: {
    color: theme.palette.primary.contrastText,
    height: 30,
    background: `linear-gradient(to right bottom, ${
      theme.palette.primary.light
    }, ${theme.palette.primary.light})`
  },
  codeHeaderVigueur: {
    color: theme.palette.primary.contrastText,
    height: 30,
    background: `linear-gradient(to right bottom, ${
      theme.palette.primary.main
    }, ${theme.palette.primary.main})`
  },
  codeHeaderAbroge: {
    color: theme.palette.secondary.contrastText,
    height: 30,
    background: `linear-gradient(to right bottom, ${
      theme.palette.secondary.dark
    }, ${theme.palette.secondary.dark})`
  }
});

const getLabel = label =>
  ({
    VIGUEUR: "En vigueur",
    ABROGE: "Abrogé",
    MODIFIE: "Modifié",
    VIGUEUR_DIFF: "Version à venir"
  }[label] || label);

const getColor = label =>
  ({ VIGUEUR: "primary", ABROGE: "error" }[label] || "inherit");

const getClassName = label =>
  ({ VIGUEUR: "codeHeaderVigueur", ABROGE: "codeHeaderAbroge" }[label] ||
  "codeHeader");

const Code = ({
  classes,
  id,
  cid,
  titrefull,
  description,
  derniere_modification,
  etat
}) => (
  <Link route="code" params={{ code: cid }}>
    <Card className={classes.codeCard}>
      <CardActionArea>
        <div className={classes[getClassName(etat)]}>
          <Typography
            color="inherit"
            variant="caption"
            style={{ fontSize: "1.4em", padding: "3px 5px" }}
            align="right"
          >
            {getLabel(etat)}
          </Typography>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {titrefull}
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

export default withStyles(styles)(Code);
