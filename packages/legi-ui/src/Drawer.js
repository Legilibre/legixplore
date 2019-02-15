import React from "react";
import cx from "classnames";

import Link from "next/link";
import Tree from "./Tree";

import {
  Hidden,
  Divider,
  Drawer as MaterialDrawer,
  Typography
} from "@material-ui/core";

const Drawer = ({
  classes, texteId, conteneurId, sectionId, onToggle, opened, structure
}) => (
  <div style={{ alignItems: "start" }}>
    <div className={classes.toolbarIcon}>
      <Link href="/index">
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
        <Tree conteneurId={conteneurId} texteId={texteId} sectionId={sectionId} {...structure} />
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
        <Tree conteneurId={conteneurId} texteId={texteId} sectionId={sectionId} {...structure} />
      </MaterialDrawer>
    </Hidden>
  </div>
);

export default Drawer;
