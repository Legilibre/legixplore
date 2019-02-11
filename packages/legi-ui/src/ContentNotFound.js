import React from "react";
import { withRouter } from "next/router";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { default as ArrowBackIcon } from "@material-ui/icons/ArrowBack";

import ButtonLegifrance from "./ButtonLegifrance";

// todo: sentry
export const ContentNotFound = ({ className, url, style, router }) => (
  <Card className={className} style={{ marginTop: 10, ...style }}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Contenu non trouvé ;/
      </Typography>
      <Typography component="p" style={{ marginTop: 20 }}>
        L&apos;article {router.query.article} n&apos;a pas été trouvé.
      </Typography>
    </CardContent>
    <CardActions>
      <ButtonLegifrance
        href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
          router.query.article
        }&cidTexte=${router.query.code}`}
      />
      <Button
        style={{ margin: "0 10px" }}
        target="_blank"
        variant="outlined"
        color="primary"
        onClick={() => history.back()}
        size="small"
      >
        <ArrowBackIcon style={{ marginRight: 5 }} />
        page précédente
      </Button>
    </CardActions>
  </Card>
);

export default withRouter(ContentNotFound);
