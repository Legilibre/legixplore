import React from "react";

import { Typography } from "@material-ui/core";

import { Link } from "./routes";

const Breadcrumbs = ({ classes = {}, cid, items, onClick }) => (
  <div>
    {items &&
      items.map((p, i, all) => (
        <Typography
          key={p.id}
          component="div"
          color="inherit"
          noWrap
          style={{
            marginRight: 5,
            display: "inline-block",
            maxWidth: 100 / items.length + "%",
            cursor: "pointer"
          }}
          className={classes.title}
        >
          <Link to="section" params={{ code: cid, section: p.id }}>
            <span
              style={{ textDecoration: "underline" }}
              title={p.titre_ta}
              href="#"
              onClick={() => onClick(p)}
            >
              {p.titre_ta}
            </span>
          </Link>
          {(i < all.length - 1 && " > ") || null}
        </Typography>
      ))}
  </div>
);

export default Breadcrumbs;
