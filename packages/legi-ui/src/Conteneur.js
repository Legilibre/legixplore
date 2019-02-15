import React from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";

import ButtonLegifrance from "./ButtonLegifrance";
import DocumentLink from "./DILABaseLink";

const styles = {
  card: {
    minWidth: 275
  }
};

const Conteneur = ({ classes, conteneurId, titre, structure }) => (
  <React.Fragment>
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <Typography variant="h4">{titre}</Typography>
        {structure.children.map(tetier => (
          <Card
            key={tetier.id}
            className={classes.card}
            style={{ marginTop: 10 }}
          >
            <CardContent>
              <Typography variant="h5">{tetier.titre}</Typography>
              <List>
                {tetier.children.map(texte =>
                  <div style={{ marginLeft: 10 }}>
                    <DocumentLink type="texte" id={texte.id} conteneurId={conteneurId}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline"
                        }}
                      >
                        {texte.titre}
                      </Typography>
                    </DocumentLink>
                  </div>
                )}
              </List>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardActions>
        <ButtonLegifrance
          href={`https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${conteneurId}`}
        />
      </CardActions>
    </Card>
  </React.Fragment>
);

export default withStyles(styles)(Conteneur);
