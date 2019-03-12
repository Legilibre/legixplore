import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { default as LinkIcon } from "@material-ui/icons/Link";

export const CardApi = ({ className, url, style }) => (
  <Card className={className} style={{ marginTop: 10, ...style }}>
    <CardContent>
      <Typography variant="h5" component="h2">
        API{" "}
        <a href={url} target="_blank" style={{ color: "inherit" }}>
          <LinkIcon style={{ verticalAlign: "middle", cursor: "pointer" }} />
        </a>
      </Typography>
      <TextField
        defaultValue={url}
        margin="normal"
        style={{ width: "100%" }}
        InputProps={{
          readOnly: true
        }}
      />
    </CardContent>
  </Card>
);

export default CardApi;
