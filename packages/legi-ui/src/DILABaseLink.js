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
    const { params, ...otherParams } = this.props;
    const newParams = {
      ...params,
      base: this.context
    };
    return <Link params={newParams} {...otherParams}></Link>;
  }
}

export default DILABaseLink;
