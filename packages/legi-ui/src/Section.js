import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ButtonDetailSection from "./ButtonDetailSection";
import ButtonLegifrance from "./ButtonLegifrance";
import Link from "./DILABaseLink";
import AsyncArticle from "./AsyncArticle";
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

const SectionTitle = ({ title, variant = "h3", linkParams }) => (
  <Link route="section" params={linkParams}>
    <Typography
      component="span"
      style={{ marginTop: 10, cursor: "pointer" }}
      variant={variant}
    >
      {title}
    </Typography>
  </Link>
);

const DefaultEmptyMessage = ({ children }) =>
  children &&
  children.length === 0 && (
    <Typography>
      Le présent chapitre ne comprend pas de dispositions réglementaires.
    </Typography>
  );

export const SectionChildLink = ({ parentId, id, titre_ta }) => (
  <div style={{ marginLeft: 10 }}>
    <Link
      route="section"
      params={{ code: parentId, section: id }}
      >
      <Typography
        variant="subtitle1"
        style={{
          cursor: "pointer",
          textDecoration: "underline"
        }}
      >
        {titre_ta}
      </Typography>
    </Link>
  </div>
);

const Section = ({ parentId, classes, data, children, depth = 0 }) => {
  // content of the current section
  const content = (
    <React.Fragment>
      <SectionTitle
        linkParams={{ code: parentId, section: data.id }}
        variant={getMaxH(depth + 5)}
        title={data.titre_ta || data.titre_tm || data.titre}
      />
      <DefaultEmptyMessage>{children}</DefaultEmptyMessage>
      {children &&
        children.map(child => {
          if (child.data && child.type === "article") {
            if (depth < MAX_DEPTH) {
              return (
                <AsyncArticle
                  key={child.data.id}
                  cid={parentId}
                  id={child.data.id}
                />
              );
            } else {
              return (
                <h4>Article {child.data.num} {child.data.titre}</h4>
              );
            }
          } else if (child.data && ["section", "texte"].includes(child.type)) {
            return (
              (
                <div key={child.data.id} style={{ marginTop: 20 }}>
                  {(depth < MAX_DEPTH && (
                    // recursive component
                    <Section
                      parentId={parentId}
                      classes={classes}
                      depth={depth + 1}
                      data={child.data}
                    >
                      {child.children}
                    </Section>
                  )) || (
                    <SectionChildLink
                      parentId={parentId}
                      id={child.data.id}
                      titre_ta={child.data.titre_ta}
                    />
                  )}
                </div>
              ) || null
            );
          }
        })}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card className={classes.card} style={{ marginTop: 10 }}>
        <CardContent>{content}</CardContent>
        <CardActions>
          {(depth > 0 && (
            false && <ButtonDetailSection code={parentId} section={data.id} />
          )) ||
            null}
          <ButtonLegifrance
            href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
              data.id
            }&cidTexte=${parentId}`}
          />
        </CardActions>
      </Card>
      {(depth === 0 && (
        // show metadata for main section only
        <React.Fragment>
          <CardMetadata data={data} classes={classes} currentId={data.id} />
          <CardApi
            url={`https://legi.now.sh/code/${parentId}/section/${data.id}.json`}
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
