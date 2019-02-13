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
    if (type === "conteneur") {
      return { id: conteneurId, base }
    } else if (type === "tetier") {
      return { tetier: id, conteneur:  conteneurId, base};
    } else if (type === "texte") {
      return { texte: id, base };
    } else {
      return { [type]: id, texte: texteId, base };
    }
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
