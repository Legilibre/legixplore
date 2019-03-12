import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  (links && links.length && (
    <div style={{ marginTop: 20 }}>
      <Typography variant="h6">{title}</Typography>
      {links
        .filter(link => link.article_cid)
        .map(link => (
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

const _Link = ({ code, article, children }) =>
  (code && code.match(/^LEGITEXT/) && (
    <Link route="article" params={{ code, article }}>
      <a>{children}</a>
    </Link>
  )) ||
  children;

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
            <_Link code={link.dst_cid} article={link.dst_id}>
              {link.dst_titre || link.titre}
            </_Link>
          )}
        />
        <BlocLinks
          title="Abrogé par"
          links={abrogePar}
          Icon={DeleteIcon}
          render={link => (
            <_Link code={link.dst_cid} article={link.dst_id}>
              {link.dst_titre || link.titre}
            </_Link>
          )}
        />
        <BlocLinks
          title="Cité"
          links={cite}
          Icon={SubjectIcon}
          render={link => (
            <_Link code={link.dst_cid} article={link.dst_id}>
              {link.dst_titre || link.titre}
            </_Link>
          )}
        />
        <BlocLinks
          title="Cité par"
          links={citePar}
          Icon={SubjectIcon}
          render={link => (
            <_Link code={link.article_cid} article={link.src_id}>
              {link.dst_titre || link.titre || link.dst_id}
            </_Link>
          )}
        />
        <BlocLinks
          title="Codifié par"
          links={codifiePar}
          Icon={SubjectIcon}
          render={link => (
            <_Link code={link.dst_cid}>{link.dst_titre || link.titre}</_Link>
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


