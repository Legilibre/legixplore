import React from "react";

import { Typography } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

import { Link } from "./routes";

const Breadcrumbs = ({ classes = {}, title, cid, items, onClick }) => (
  <div>
    {items &&
      items.map((p, i, all) => (
        <React.Fragment key={p.id}>
          <Typography
            key={p.id}
            component="div"
            color="inherit"
            noWrap
            style={{
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
              p.titre_ta
            )}
          </Typography>
          {(i < all.length - 1 && (
            <ChevronRight
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
