import React from "react";
import { default as MaterialButton } from "@material-ui/core/Button";
import { OpenInNew as OpenInNewIcon } from "@material-ui/icons";

const ButtonLegifrance = ({
  label = "Voir sur Légifrance",
  href = "https://www.legifrance.gouv.fr"
}) => (
  <MaterialButton
    target="_blank"
    color="primary"
    variant="outlined"
    href={href}
    size="small"
  >
    <OpenInNewIcon style={{ marginRight: 5 }} />
    {label}
  </MaterialButton>
);

export default ButtonLegifrance;

// `https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
//       data.id
//     }&cidTexte=${data.cid}`}
