import React from "react";
import Button from "@material-ui/core/Button";
import { OpenInNew as OpenInNewIcon } from "@material-ui/icons";

const ButtonLegifrance = ({
  label = "Voir sur Légifrance",
  href = "https://www.legifrance.gouv.fr"
}) => (
  <Button
    style={{ margin: "0 10px" }}
    target="_blank"
    variant="outlined"
    href={href}
    size="small"
  >
    <OpenInNewIcon style={{ marginRight: 5 }} />
    {label}
  </Button>
);

export default ButtonLegifrance;
