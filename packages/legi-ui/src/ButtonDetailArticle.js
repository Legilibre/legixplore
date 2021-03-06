import React from "react";

import Button from "@material-ui/core/Button";
import { ZoomIn as ZoomInIcon } from "@material-ui/icons";

import { Link } from "./routes";

const ButtonDetailArticle = ({ code, article }) => (
  <Link route="article" params={{ code, article }}>
    <Button color="primary" variant="outlined" size="small">
      <ZoomInIcon style={{ marginRight: 5 }} />
      Détails
    </Button>
  </Link>
);

export default ButtonDetailArticle;
