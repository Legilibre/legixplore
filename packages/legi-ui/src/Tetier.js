import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DocumentLink from "./DILABaseLink";

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

const TetierTitle = ({ title, variant = "h3", tetierId, conteneurId }) => (
  <DocumentLink type="tetier" id={tetierId} conteneurId={conteneurId}>
    <Typography
      component="span"
      style={{ marginTop: 10, cursor: "pointer" }}
      variant={variant}
    >
      {title}
    </Typography>
  </DocumentLink>
);

export const TetierChildLink = ({ parentId, id, titre }) => (
  <div style={{ marginLeft: 10 }}>
    <DocumentLink type="texte" id={id}>
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

const DefaultEmptyMessage = ({ children }) =>
  children &&
  children.length === 0 && (
    <Typography>
      Le présent têtier est vide.
    </Typography>
  );

const Tetier = ({ parentId, classes, data, children, depth = 0 }) => {
  // content of the current section
  const content = (
    <React.Fragment>
      <TetierTitle
        tetierId={data.id}
        conteneurId={parentId}
        title={data.titre}
      />
      <DefaultEmptyMessage>{children}</DefaultEmptyMessage>
      {children &&
        children.map(child =>
          child.data &&
          ["texte"].includes(child.type) &&
          <div key={child.data.id} style={{ marginTop: 20 }}>
            <TetierChildLink
              parentId={parentId}
              id={child.data.id}
              titre={child.data.titre}
            />
          </div>
        )
      }
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card className={classes.card} style={{ marginTop: 10 }}>
        <CardContent>{content}</CardContent>
      </Card>
    </React.Fragment>
  );
};

Tetier.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tetier);
