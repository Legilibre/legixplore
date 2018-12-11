import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import ArticleMeta from "./ArticleMeta";

export const CardMetadata = ({ classes, data }) => (
  <Card className={classes.card} style={{ marginTop: 10 }}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Métadonnées
      </Typography>
      <ArticleMeta data={data} />
    </CardContent>
  </Card>
);

export const CardApi = ({ classes, url }) => (
  <Card className={classes.card} style={{ marginTop: 10 }}>
    <CardContent>
      <Typography variant="h5" component="h2">
        API
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
