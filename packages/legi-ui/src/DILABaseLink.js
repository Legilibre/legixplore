import React from "react";
import Link from "next/link";
import DILABaseContext from './DILABaseContext';

/*
  Simple wrapper over the Link component to automatically add the
  DILA base param (LEGI or KALI) that comes from the context
*/


class DILABaseLink extends React.Component {
  static contextType = DILABaseContext;

  getPathname() {
    const { type } = this.props;
    return `/${type}`;
  }

  getQuery() {
    const { type, id, conteneurId, texteId } = this.props;
    const base = this.context;
    let q = { base };
    if (type === "conteneur") {
      q.id = conteneurId;
    } else if (type === "tetier") {
      q.tetier = id;
      q.conteneur = conteneurId;
    } else if (type === "texte") {
      q.texte = id;
      if (base === "KALI")
        q.conteneur = conteneurId;
    } else {
      q[type] = id;
      q.texte = texteId;
      if (base === "KALI")
        q.conteneur = conteneurId;
    }
    return q;
  }

  render() {
    const pathname = this.getPathname();
    const query = this.getQuery();
    return <Link href={{ pathname, query }}>
      {this.props.children}
    </Link>;
  }
}

export default DILABaseLink;
