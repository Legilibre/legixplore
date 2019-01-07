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

export const CardMetadata = ({ classes, data, currentId }) => {
  const metadata = (
    <MetaCard classes={classes} title="Métadonnées">
      <ArticleMeta data={data} />
    </MetaCard>
  );

  if (!data.liens || !data.liens.length) {
    return metadata;
  }

  const filterBy = type => data.liens.filter(lien => lien.typelien === type);

  const creePar = filterBy("CREATION");
  const abrogePar = filterBy("ABROGATION");
  const modifiePar = filterBy("MODIFICATION");
  const cite = filterBy("CITATION").filter(lien => lien.dst_id !== currentId);
  const citePar = filterBy("CITATION_R");
  const codifiePar = filterBy("CODIFICATION");
  const anciensTextes = filterBy("CONCORDANCE");

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
              params={{ code: link.dst_cid || "unknown", article: link.dst_id }}
            >
              <a>{link.dst_titre || link.titre}</a>
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
              params={{ code: link.dst_cid || "unknown", article: link.dst_id }}
            >
              <a>{link.dst_titre || link.titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Cité"
          links={cite}
          Icon={SubjectIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: link.dst_cid || "unknown", article: link.dst_id }}
            >
              <a>{link.dst_titre || link.titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Cité par"
          links={citePar}
          Icon={SubjectIcon}
          render={link => (
            <Link
              route="article"
              params={{ code: link.article_cid, article: link.src_id }}
            >
              <a>{link.dst_titre || link.titre || link.dst_id}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Codifié par"
          links={codifiePar}
          Icon={SubjectIcon}
          render={link => (
            <Link route="code" params={{ code: link.dst_cid }}>
              <a>{link.dst_titre || link.titre}</a>
            </Link>
          )}
        />
        <BlocLinks
          title="Anciens textes"
          links={anciensTextes}
          Icon={SubjectIcon}
          render={link => link.dst_titre || link.titre || link.dst_id}
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
