import React from "react";

import { Typography } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

import { Link } from "./routes";

const Breadcrumbs = ({ classes = {}, title, cid, items, onClick }) => (
  <div>
    {items &&
      items.map((p, i, all) => (
        <React.Fragment key={p.id + i}>
          <Typography
            component="div"
            color="inherit"
            noWrap
            style={{
              textDecoration: "underline",
              display: "inline-block",
              maxWidth: `calc(${100 / items.length + "%"} - 24px)`,
              cursor: "pointer"
            }}
            className={classes.title}
          >
            {p.id ? (
              <Link route="section" params={{ code: cid, section: p.id }}>
                <span
                  style={{ textDecoration: "underline" }}
                  title={p.titre_ta}
                  href="#"
                  onClick={() => onClick(p)}
                >
                  {p.titre_ta}
                </span>
              </Link>
            ) : (
              <Link route="code" params={{ code: cid }}>
                <span>{p.titre_ta}</span>
              </Link>
            )}
          </Typography>
          {(i < all.length - 1 && (
            <ChevronRight
              key={`chevron${p.id}`}
              color="primary"
              style={{ verticalAlign: "top", marginRight: 5 }}
            />
          )) ||
            null}
        </React.Fragment>
      ))}
  </div>
);

export default Breadcrumbs;
