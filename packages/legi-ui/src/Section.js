import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Link } from "./routes";
import { Link as LinkIcon } from "@material-ui/icons";
import { OpenInNew as OpenInNewIcon } from "@material-ui/icons";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

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

const MAX_DEPTH = 2;

const getMaxH = val => `h${Math.min(6, val)}`;

import Article from "./Article";
import withFetchNode from "./lib/withFetchNode";

import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncFetch from "./lib/AsyncFetch";
import { fetchArticle } from "./api";

const Section = ({ classes, data, children, depth = 0 }) => {
  const content = (
    <React.Fragment>
      <Link route="section" params={{ code: data.cid, section: data.id }}>
        <Typography
          component="span"
          style={{ marginTop: 10, cursor: "pointer" }}
          variant={getMaxH(depth + 5)}
        >
          {data.titre_ta}{" "}
        </Typography>
      </Link>

      <List>
        {children &&
          children.map(child => {
            if (child.type === "article") {
              return (
                <AsyncFetch
                  fetch={() => fetchArticle(child.data.cid, child.data.id)}
                  autoFetch={true}
                  render={({ status, result }) => {
                    if (result) {
                      return <Article key={child.data.id} {...result} />;
                    }
                    return <CircularProgress />;
                  }}
                />
              );
            } else if (child.type === "section") {
              return (
                (
                  <div key={child.data.id}>
                    {depth < MAX_DEPTH && (
                      <Section
                        classes={classes}
                        depth={depth + 1}
                        data={child.data}
                      >
                        {child.children}
                      </Section>
                    )}
                  </div>
                ) || null
              );
            }
          })}
      </List>
    </React.Fragment>
  );

  // if (depth === 0) {
  return (
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>{content}</CardContent>
      <CardActions>
        <Button
          target="_blank"
          color="primary"
          href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
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
  // }

  //return content;
};

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
