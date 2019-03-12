import React from "react";
import PropTypes from "prop-types";
import striptags from "striptags";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { CardMetadata } from "./Metadata";
import CardApi from "./CardApi";
import ButtonLegifrance from "./ButtonLegifrance";
import ButtonDetailArticle from "./ButtonDetailArticle";

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
    <Typography variant="h5" component="h2" style={{ marginBottom: 20 }}>
      {data.titre_ta}
    </Typography>
    <Typography
      component="p"
      dangerouslySetInnerHTML={{ __html: data.bloc_textuel }}
    />
    {(data.nota && striptags(data.nota).trim() !== "" && (
      <React.Fragment>
        <Divider style={{ margin: "20px 0" }} />
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: data.nota }}
        />
      </React.Fragment>
    )) ||
      null}
  </React.Fragment>
);

const Article = ({ classes, data, showPreview }) => (
  <React.Fragment>
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <ArticleContent data={data} />
      </CardContent>
      <CardActions>
        {(!showPreview && (
          <ButtonDetailArticle code={data.cid} article={data.id} />
        )) ||
          null}
        <ButtonLegifrance
          href={`https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${
            data.id
          }&cidTexte=${data.cid}`}
        />
      </CardActions>
    </Card>

    {(showPreview && (
      <React.Fragment>
        <CardMetadata classes={classes} data={data} currentId={data.id} />
        <CardApi
          classes={classes}
          url={`https://legi.now.sh/code/${data.cid}/article/${data.id}.json`}
        />
      </React.Fragment>
    )) ||
      null}
  </React.Fragment>
);

Article.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Article);
