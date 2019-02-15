import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { default as LinkIcon } from "@material-ui/icons/Link";

import DocumentLink from "./DILABaseLink";
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

  const filterBy = type =>
    data.liens.filter(lien => lien.typelien === type && lien.dst_id);

  const creePar = filterBy("CREATION");
  const abrogePar = filterBy("ABROGATION");
  const modifiePar = filterBy("MODIFICATION");
  const cite = filterBy("CITATION").filter(lien => lien.dst_id !== currentId);
  const citePar = filterBy("CITATION_R");
  const codifiePar = filterBy("CODIFICATION");
  const anciensTextes = filterBy("CONCORDANCE");
  const rattachements = filterBy("RATTACHEMENT");

  return (
    <React.Fragment>
      <MetaCard classes={classes} title="Liens">
        <BlocLinks
          title="Créé par"
          links={creePar}
          Icon={EventAvailableIcon}
          render={link => (
            <DocumentLink
              type="article"
              id={link.dst_id}
              texteId={link.dst_cid || "unknown"}
            >
              <a>{link.dst_titre || link.titre}</a>
            </DocumentLink>
          )}
        />
        <BlocLinks
          title="Abrogé par"
          links={abrogePar}
          Icon={DeleteIcon}
          render={link => (
            <DocumentLink
              type="article"
              id={link.dst_id}
              texteId={link.dst_cid || "unknown"}
            >
              <a>{link.dst_titre || link.titre}</a>
            </DocumentLink>
          )}
        />
        <BlocLinks
          title="Cité"
          links={cite}
          Icon={SubjectIcon}
          render={link => (
            <DocumentLink
              type="article"
              id={link.dst_id}
              texteId={link.dst_cid || "unknown"}
            >
              <a>{link.dst_titre || link.titre}</a>
            </DocumentLink>
          )}
        />
        <BlocLinks
          title="Cité par"
          links={citePar}
          Icon={SubjectIcon}
          render={link => (
            <DocumentLink
              type="article"
              params={{ texte: link.article_cid, article: link.src_id }}
            >
              <a>{link.dst_titre || link.titre || link.dst_id}</a>
            </DocumentLink>
          )}
        />
        <BlocLinks
          title="Codifié par"
          links={codifiePar}
          Icon={SubjectIcon}
          render={link => (
            <DocumentLink type="texte" id={link.dst_cid}>
              <a>{link.dst_titre || link.titre}</a>
            </DocumentLink>
          )}
        />
        <BlocLinks
          title="Anciens textes"
          links={anciensTextes}
          Icon={SubjectIcon}
          render={link => link.dst_titre || link.titre || link.dst_id}
        />
        <BlocLinks
          title="Rattachés"
          links={rattachements}
          Icon={EventAvailableIcon}
          render={link => (
            <DocumentLink
              type="article" id={link.dst_id} texteId={link.dst_cid}
            >
              <a>{link.dst_titre || link.titre}</a>
            </DocumentLink>
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
