import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import {
  ZoomIn as ZoomInIcon,
  OpenInNew as OpenInNewIcon
} from "@material-ui/icons";

import ArticleMeta from "./ArticleMeta";
import { Link } from "./routes";

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

import { CardMetadata, CardApi } from "./Metadata";

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

const Article = ({ classes, data, showPreview }) => (
  <React.Fragment>
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <ArticleContent data={data} />
      </CardContent>
      <CardActions>
        {(!showPreview && (
          <Link route="article" params={{ code: data.cid, article: data.id }}>
            <Button color="primary" variant="outlined" size="small">
              <ZoomInIcon style={{ marginRight: 5 }} />
              Détails
            </Button>
          </Link>
        )) ||
          null}

        <Button
          variant="outlined"
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

    {(showPreview && (
      <React.Fragment>
        <Card className={classes.card} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Métadonnées
            </Typography>
            <ArticleMeta data={data} />
          </CardContent>
        </Card>

        <Card className={classes.card} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              API
            </Typography>

            <TextField
              defaultValue={`https://1.2.3.4/code/${data.cid}/article/${
                data.id
              }.json`}
              margin="normal"
              style={{ width: "100%" }}
              InputProps={{
                readOnly: true
              }}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    )) ||
      null}
  </React.Fragment>
);

export const ArticlePreview = ({ classes, data }) => (
  <React.Fragment>
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <ArticleContent data={data} />
      </CardContent>
      <CardActions>
        <Link route="article" params={{ code: data.cid, article: data.id }}>
          <Button color="primary" variant="outlined" size="small">
            <ZoomInIcon style={{ marginRight: 5 }} />
            Détails
          </Button>
        </Link>
        <Button
          variant="outlined"
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

    <CardMetadata classes={classes} data={data} />
    <CardApi
      classes={classes}
      url={`https://1.2.3.4/code/${data.cid}/article/${data.id}.json`}
    />
  </React.Fragment>
);

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
