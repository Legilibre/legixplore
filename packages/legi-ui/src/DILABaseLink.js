import React from "react";
import { Link } from "./routes";
import DILABaseContext from './DILABaseContext';

/*
  Simple wrapper over the Link component to automatically add the
  DILA base param (LEGI or KALI) that comes from the context
*/


class DILABaseLink extends React.Component {
  static contextType = DILABaseContext;
  render() {
    const { type, id, conteneurId, texteId } = this.props;
    const base = this.context;
    if (type === "conteneur") {
      return <Link route="conteneur" params={{ conteneur: id, base }}>
        {this.props.children}
      </Link>
    } else if (type === "tetier") {
      return <Link route="tetier" params={{ tetier: id, conteneur: conteneurId, base }}>
        {this.props.children}
      </Link>
    } else if (type === "texte") {
      return <Link route="texte" params={{ texte: id, base }}>
        {this.props.children}
      </Link>
    } else {
      return <Link route={type} params={{ [type]: id, texte: texteId, base }}>
        {this.props.children}
      </Link>
    }
  }
}

export default DILABaseLink;
