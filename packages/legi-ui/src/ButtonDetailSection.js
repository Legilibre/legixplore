import React from "react";

import Button from "@material-ui/core/Button";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

import DocumentLink from "./DILABaseLink";

const ButtonDetailSection = ({ texteId, section, title = "Détails" }) => (
  <DocumentLink type="section" id={section} texteId={texteId}>
    <Button color="primary" variant="outlined" size="small">
      <ZoomInIcon style={{ marginRight: 5 }} />
      {title}
    </Button>
  </DocumentLink>
);

export default ButtonDetailSection;
