import React from "react";
import cx from "classnames";
import { withRouter } from "next/router";

import {
  Hidden,
  Divider,
  Chip,
  IconButton,
  Drawer as MaterialDrawer,
  List,
  Typography
} from "@material-ui/core";

import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";
import Tree from "./Tree";

const DrawerContent = withRouter(({ classes, structure, onToggle, router }) => (
  <Tree {...structure} cid={router.query.code} query={router.query} />
));

const Drawer = ({ classes, onToggle, opened, structure }) => (
  <div style={{ alignItems: "start" }}>
    <div className={classes.toolbarIcon} />
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
