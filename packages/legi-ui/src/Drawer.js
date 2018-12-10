import React from "react";
import cx from "classnames";

import {
  Hidden,
  Divider,
  IconButton,
  Drawer as MaterialDrawer,
  List,
  Typography
} from "@material-ui/core";

import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";

const DrawerContent = ({ classes, onToggle }) => (
  <React.Fragment>
    <div className={classes.toolbarIcon}>
      <IconButton onClick={onToggle}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <List>
      <Typography color="inherit">Entry 1</Typography>
    </List>
    <Divider />
    <List>
      <Typography color="inherit">Entry 1</Typography>
    </List>
  </React.Fragment>
);

const Drawer = ({ classes, onToggle, opened }) => (
  <div style={{ alignItems: "start" }}>
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
        <DrawerContent classes={classes} onToggle={onToggle} />
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
        <DrawerContent classes={classes} onToggle={onToggle} />
      </MaterialDrawer>
    </Hidden>
  </div>
);

export default Drawer;
