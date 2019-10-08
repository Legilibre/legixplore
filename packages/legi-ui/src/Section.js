import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ButtonDetailSection from "./ButtonDetailSection";
import ButtonLegifrance from "./ButtonLegifrance";
import DocumentLink from "./DILABaseLink";
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

const SectionTitle = ({ title, variant = "h3", sectionId, texteId, conteneurId }) => (
  <DocumentLink type="section" id={sectionId} texteId={texteId} conteneurId={conteneurId}>
    <Typography
      component="span"
      style={{ marginTop: 10, cursor: "pointer" }}
      variant={variant}
    >
      {title}
    </Typography>
  </DocumentLink>
);

const DefaultEmptyMessage = ({ children }) =>
  children &&
  children.length === 0 && (
    <Typography>
      Le présent chapitre ne comprend pas de dispositions réglementaires.
    </Typography>
  );

export const SectionChildLink = ({ conteneurId, texteId, id, titre }) => (
  <div style={{ marginLeft: 10 }}>
    <DocumentLink type="section" id={id} texteId={texteId} conteneurId={conteneurId}>
      <Typography
        variant="subtitle1"
        style={{
          cursor: "pointer",
          textDecoration: "underline"
        }}
      >
        {titre}
      </Typography>
    </DocumentLink>
  </div>
);

const Section = ({ conteneurId, texteId, classes, data, children, depth = 0 }) => {
  // content of the current section
  const content = (
    <React.Fragment>
      <SectionTitle
        sectionId={data.id}
        conteneurId={conteneurId}
        texteId={texteId}
        variant={getMaxH(depth + 5)}
        title={data.titre}
      />
      <DefaultEmptyMessage>{children}</DefaultEmptyMessage>
      {children &&
        children.map(child => {
          if (child.data && child.type === "article") {
            return (
              <AsyncArticle
                key={child.data.id}
                id={child.data.id}
                conteneurId={conteneurId}
                texteId={texteId}
              />
            );
          } else if (child.data && ["section", "texte"].includes(child.type)) {
            return (
              (
                <div key={child.data.id} style={{ marginTop: 20 }}>
                  {(depth < MAX_DEPTH && (
                    // recursive component
                    <Section
                      conteneurId={conteneurId}
                      texteId={texteId}
                      classes={classes}
                      depth={depth + 1}
                      data={child.data}
                    >
                      {child.children}
                    </Section>
                  )) || (
                    <SectionChildLink
                      conteneurId={conteneurId}
                      texteId={texteId}
                      id={child.data.id}
                      titre={child.data.titre}
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
            <ButtonDetailSection texteId={texteId} section={data.id} conteneurId={conteneurId} />
          )) ||
            null}
          <ButtonLegifrance
            href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
              data.id
            }&cidTexte=${texteId}`}
          />
        </CardActions>
      </Card>
      {(depth === 0 && (
        // show metadata for main section only
        <React.Fragment>
          <CardMetadata data={data} classes={classes} currentId={data.id} />
          <CardApi
            url={`https://legi.now.sh/code/${texteId}/section/${data.id}.json`}
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
