import React from "react";

import Button from "@material-ui/core/Button";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

import DocumentLink from "./DILABaseLink";

const ButtonDetailArticle = ({ texteId, article }) => (
  <DocumentLink type="article" id={article} texteId={texteId}>
    <Button color="primary" variant="outlined" size="small">
      <ZoomInIcon style={{ marginRight: 5 }} />
      Détails
    </Button>
  </DocumentLink>
);

export default ButtonDetailArticle;
