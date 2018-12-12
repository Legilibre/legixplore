import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ButtonDetailSection from "./ButtonDetailSection";
import ButtonLegifrance from "./ButtonLegifrance";
import { Link } from "./routes";
import Article from "./Article";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncFetch from "./lib/AsyncFetch";
import { fetchArticle } from "./api";
import { CardMetadata, CardApi } from "./Metadata";

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

const MAX_DEPTH = 1;

const getMaxH = val => `h${Math.min(6, val)}`;

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
        {(children &&
          children.length === 0 && (
            <Typography>
              Le présent chapitre ne comprend pas de dispositions
              réglementaires.
            </Typography>
          )) ||
          null}
        {children &&
          children.map(child => {
            if (child.type === "article") {
              return (
                <AsyncFetch
                  key={child.data.id}
                  fetch={() => fetchArticle(child.data.cid, child.data.id)}
                  autoFetch={true}
                  render={({ status, result }) =>
                    (result && (
                      <Article
                        showDetails={false}
                        key={child.data.id}
                        {...result}
                      />
                    )) || (
                      <CircularProgress
                        style={{ display: "block", margin: 10 }}
                      />
                    )
                  }
                />
              );
            } else if (child.type === "section") {
              return (
                (
                  <div key={child.data.id}>
                    {(depth < MAX_DEPTH && (
                      <Section
                        classes={classes}
                        depth={depth + 1}
                        data={child.data}
                      >
                        {child.children}
                      </Section>
                    )) || (
                      <li>
                        <Link
                          route="section"
                          params={{
                            code: child.data.cid,
                            section: child.data.id
                          }}
                        >
                          <Typography
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline"
                            }}
                          >
                            {child.data.titre_ta}
                          </Typography>
                        </Link>
                      </li>
                    )}
                  </div>
                ) || null
              );
            }
          })}
      </List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card className={classes.card} style={{ marginTop: 10 }}>
        <CardContent>{content}</CardContent>
        <CardActions>
          {(depth > 0 && (
            <ButtonDetailSection code={data.cid} section={data.id} />
          )) ||
            null}
          <ButtonLegifrance
            href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
              data.id
            }&cidTexte=${data.cid}`}
          />
        </CardActions>
      </Card>
      {(depth === 0 && (
        <React.Fragment>
          <CardMetadata data={data} classes={classes} />
          <CardApi
            url={`https://1.2.3.4/code/${data.cid}/section/${data.id}.json`}
            classes={classes}
          />
        </React.Fragment>
      )) ||
        null}
    </React.Fragment>
  );
};

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
