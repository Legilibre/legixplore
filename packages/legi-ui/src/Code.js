import React from "react";
import map from "unist-util-map";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";

import AsyncArticle from "./AsyncArticle";
import { CardApi } from "./Metadata";
import ButtonLegifrance from "./ButtonLegifrance";
import ButtonDetailSection from "./ButtonDetailSection";
import { SectionChildLink } from "./Section";

const styles = {
  card: {
    minWidth: 275
  }
};

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
                  if (["section", "texte"].includes(child2.type)) {
                    return (
                      <SectionChildLink
                        key={child2.id}
                        parentId={cid}
                        id={child2.id}
                        titre={child2.titre}
                      />
                    );
                  } else if (child2.type === "article") {
                    return <AsyncArticle cid={cid} id={child2.id} />;
                  }
                })}
              </List>
            </CardContent>
            <CardActions>
              <ButtonDetailSection texteId={cid} section={child.id} />
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
