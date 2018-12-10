import React from "react";
import cx from "classnames";
import { withRouter } from "next/router";

import { Link } from "./routes";

import {
  Hidden,
  Divider,
  Drawer as MaterialDrawer,
  Typography
} from "@material-ui/core";

import Tree from "./Tree";

const DrawerContent = withRouter(({ classes, structure, onToggle, router }) => (
  <Tree {...structure} cid={router.query.code} query={router.query} />
));

const Drawer = ({ classes, onToggle, opened, structure }) => (
  <div style={{ alignItems: "start" }}>
    <div className={classes.toolbarIcon}>
      <Link route="index">
        <Typography
          color="inherit"
          variant="h4"
          align="center"
          style={{ width: "100%", cursor: "pointer" }}
        >
          legiXplorer
        </Typography>
      </Link>
    </div>
    <Divider />
    <Hidden smUp initialWidth="lg">
      <MaterialDrawer
        variant="temporary"
        classes={{
          paper: cx(classes.drawerPaper, !opened && classes.drawerPaperClose)
        }}
        open={opened}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <DrawerContent
          structure={structure}
          classes={classes}
          onToggle={onToggle}
        />
      </MaterialDrawer>
    </Hidden>
    <Hidden xsDown initialWidth="lg">
      <MaterialDrawer
        classes={{
          paper: cx(classes.drawerPaper, !opened && classes.drawerPaperClose)
        }}
        variant="permanent"
        open={opened}
      >
        <DrawerContent
          structure={structure}
          classes={classes}
          onToggle={onToggle}
        />
      </MaterialDrawer>
    </Hidden>
  </div>
);

export default Drawer;
