import React from "react";

import Button from "@material-ui/core/Button";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

import Link from "./DILABaseLink";

const ButtonDetailSection = ({ code, section, title = "Détails" }) => (
  <Link
    route="section"
    params={{ texte: code, section }}
  >
    <Button color="primary" variant="outlined" size="small">
      <ZoomInIcon style={{ marginRight: 5 }} />
      {title}
    </Button>
  </Link>
);

//child.data.titre_ta

export default ButtonDetailSection;
