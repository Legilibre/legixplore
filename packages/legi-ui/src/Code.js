import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";
import map from "unist-util-map";

import AsyncArticle from "./AsyncArticle";
import { CardApi } from "./Metadata";
import ButtonLegifrance from "./ButtonLegifrance";
import ButtonDetailSection from "./ButtonDetailSection";
import { SectionChildLink } from "./Section";
//import Section from "./Section";

const styles = {
  card: {
    minWidth: 275
  }
};

const structureToSection = structure =>
  map(structure, node => ({
    ...node,
    cid: "pouet",
    data: {
      ...node,
      children: undefined
    },
    children:
      (node.children &&
        node.children.map(child => ({
          ...child,
          data: {
            ...child,
            type: "section"
          }
        }))) ||
      []
  }));

const Code = ({ classes, cid, titre, structure }) => (
  <React.Fragment>
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <Typography variant="h4">{titre}</Typography>
        {structure.children.map(child => (
          <Card
            key={child.id}
            className={classes.card}
            style={{ marginTop: 10 }}
          >
            <CardContent>
              <Typography variant="h5">{child.titre_ta}</Typography>
              <List>
                {child.children.map(child2 => {
                  if (child2.type === "section") {
                    return (
                      <SectionChildLink
                        key={child2.id}
                        cid={cid}
                        id={child2.id}
                        titre_ta={child2.titre_ta}
                      />
                    );
                  } else if (child2.type === "article") {
                    return <AsyncArticle cid={cid} id={child2.id} />;
                  }
                })}
              </List>
            </CardContent>
            <CardActions>
              <ButtonDetailSection code={cid} section={child.id} />
              <ButtonLegifrance
                href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
                  child.id
                }&cidTexte=${child.cid}`}
              />
            </CardActions>
          </Card>
        ))}
      </CardContent>
      <CardActions>
        <ButtonLegifrance
          href={`https://www.legifrance.gouv.fr/affichCode.do?cidTexte=${cid}`}
        />
      </CardActions>
    </Card>
    <CardApi classes={classes} url={`https://legi.now.sh/code/${cid}.json`} />
  </React.Fragment>
);

export default withStyles(styles)(Code);
