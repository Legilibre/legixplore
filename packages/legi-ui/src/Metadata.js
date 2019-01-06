import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { default as LinkIcon } from "@material-ui/icons/Link";

import { Link } from "./routes";
import ArticleMeta from "./ArticleMeta";

const Lien = ({ src_id, dst_cid, dst_id, dst_titre, typelien }) => (
  <div>
    {dst_titre || dst_id}-{src_id}
  </div>
);

import {
  EventAvailable as EventAvailableIcon,
  Delete as DeleteIcon,
  Subject as SubjectIcon
} from "@material-ui/icons";

const MetaCard = ({ classes, title, children }) => (
  <Card className={classes.card} style={{ marginTop: 10 }}>
    <CardContent>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

const BlocLinks = ({ title, links, Icon, render }) =>
  (links &&
    links.length && (
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6">{title}</Typography>
        {links.map(link => (
          <Typography
            key={link.src_id + link.dst_id + link.typelien}
            style={{ marginTop: 5, marginLeft: 15 }}
            variant="body1"
          >
            {Icon && (
              <Icon
                style={{
                  marginRight: 5,
                  marginTop: -3,
                  verticalAlign: "middle"
                }}
              />
            )}
            {render(link)}
          </Typography>
        ))}
      </div>
    )) ||
  null;

export const CardMetadata = ({ classes, data }) => {
  const metadata = (
    <MetaCard classes={classes} title="Métadonnées">
      <ArticleMeta data={data} />
    </MetaCard>
  );

  if (!data.liens || !data.liens.length) {
    return metadata;
  }

  const creePar = data.liens.filter(lien => lien.typelien === "CREATION");
  const abrogePar = data.liens.filter(lien => lien.typelien === "ABROGATION");
  const modifiePar = data.liens.filter(
    lien => lien.typelien === "MODIFICATION"
  );
  const cite = data.liens.filter(lien => lien.typelien === "CITATION");
  const citePar = data.liens.filter(lien => lien.typelien === "CITATION_R");
  return (
    <React.Fragment>
      <MetaCard classes={classes} title="Liens">
        <BlocLinks
          title="Créé par"
          links={creePar}
          Icon={EventAvailableIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: link.dst_cid, article: link.dst_id }}
            >
              <a>{link.dst_titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Abrogé par"
          links={abrogePar}
          Icon={DeleteIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: link.dst_cid, article: link.dst_id }}
            >
              <a>{link.dst_titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Citations"
          links={cite}
          Icon={SubjectIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: link.dst_cid, article: link.dst_id }}
            >
              <a>{link.dst_titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Citations par"
          links={citePar}
          Icon={SubjectIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: "xxx", article: link.src_id }}
            >
              <a>{link.dst_titre || link.dst_id}</a>
            </Link>
          )}
        />
      </MetaCard>
      {metadata}
    </React.Fragment>
  );
};

export const CardApi = ({ classes, url, style }) => (
  <Card className={classes.card} style={{ marginTop: 10, ...style }}>
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
