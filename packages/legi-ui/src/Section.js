import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ButtonDetailSection from "./ButtonDetailSection";
import ButtonLegifrance from "./ButtonLegifrance";
import { Link } from "./routes";
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

export const SectionChildLink = ({ cid, id, titre_ta }) => (
  <div style={{ marginLeft: 10 }}>
    <Link
      route="section"
      params={{
        code: cid,
        section: id
      }}
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

// const SectionChild = ({
//   classes,
//   type,
//   cid,
//   id,
//   recurse = true,
//   depth = 0,
//   maxDepth = 1
// }) => {
//   if (child.data && child.type === "article") {
//     return <AsyncArticle cid={child.data.cid} id={child.data.id} />;
//   } else if (child.data && child.type === "section") {
//     if (depth < maxDepth) {
//       return (
//         <Section
//           classes={classes}
//           depth={depth + 1}
//           maxDepth={maxDepth}
//           data={child.data}
//         >
//           {child.children}
//         </Section>
//       );
//     }
//     return (
//       <SectionChildLink
//         cid={child.data.cid}
//         id={child.data.id}
//         titre_ta={child.data.titre_ta}
//       />
//     );
//   }
// };

/*
    return (
      (
        <div key={child.data.id}>
          {(depth < MAX_DEPTH && (
            // recursive component
            <Section classes={classes} depth={depth + 1} data={child.data}>
              {child.children}
            </Section>
          )) || (
            <SectionChildLink
              cid={child.data.cid}
              id={child.data.id}
              titre_ta={child.data.titre_ta}
            />
          )}
        </div>
      ) || null
    );
  }
};
*/
const Section = ({ classes, data, children, depth = 0 }) => {
  // content of the current section
  const content = (
    <React.Fragment>
      <SectionTitle
        linkParams={{ code: data.cid, section: data.id }}
        variant={getMaxH(depth + 5)}
        title={data.titre_ta}
      />
      <DefaultEmptyMessage>{children}</DefaultEmptyMessage>
      {children &&
        children.map(child => {
          if (child.data && child.type === "article") {
            return (
              <AsyncArticle
                key={child.data.id}
                cid={child.data.cid}
                id={child.data.id}
              />
            );
          } else if (child.data && child.type === "section") {
            return (
              (
                <div key={child.data.id}>
                  {(depth < MAX_DEPTH && (
                    // recursive component
                    <Section
                      classes={classes}
                      depth={depth + 1}
                      data={child.data}
                    >
                      {child.children}
                    </Section>
                  )) || (
                    <SectionChildLink
                      cid={child.data.cid}
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
        // show metadata for main section only
        <React.Fragment>
          <CardMetadata data={data} classes={classes} currentId={data.id} />
          <CardApi
            url={`https://legi.now.sh/code/${data.cid}/section/${data.id}.json`}
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
