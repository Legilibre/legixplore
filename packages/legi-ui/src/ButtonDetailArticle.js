import React from "react";

import Button from "@material-ui/core/Button";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

import DocumentLink from "./DILABaseLink";

const ButtonDetailArticle = ({ article, texteId, conteneurId }) => (
  <DocumentLink type="article" id={article} texteId={texteId} conteneurId={conteneurId}>
    <Button color="primary" variant="outlined" size="small">
      <ZoomInIcon style={{ marginRight: 5 }} />
      Voir l'article en détail
    </Button>
  </DocumentLink>
);

export default ButtonDetailArticle;
