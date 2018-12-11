import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { OpenInNew as OpenInNewIcon } from "@material-ui/icons";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export const ArticleContent = ({ data }) => (
  <React.Fragment>
    <Typography variant="h5" component="h2">
      {data.titre}
    </Typography>
    <Typography
      component="p"
      dangerouslySetInnerHTML={{ __html: data.bloc_textuel }}
    />
    {(data.nota && (
      <div>
        <Divider />
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: data.nota }}
        />
      </div>
    )) ||
      null}
  </React.Fragment>
);

const Article = ({ classes, data }) => {
  return (
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <ArticleContent data={data} />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          target="_blank"
          href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
            data.id
          }&cidTexte=${data.cid}`}
          size="small"
        >
          <OpenInNewIcon style={{ marginRight: 5 }} />
          Voir sur Légifrance
        </Button>
      </CardActions>
    </Card>
  );
};

/*

// <a
//         href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
//           data.id
//         }&cidTexte=${data.cid}`}
//         style={{ fontSize: "1rem", margin: "0 20px" }}
//       >
//         Voir sur Légifrance
//       </a>

*/

Article.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Article);
