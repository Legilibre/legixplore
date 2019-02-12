import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import { IconButton, Typography, AppBar, Toolbar } from "@material-ui/core";

import Link from "./DILABaseLink";
import withToggle from "./lib/withToggle";
import Drawer from "./Drawer";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    overflow: "hidden"  // avoid long titles horizontal overflow
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-center",
    padding: "0 8px",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 6,
    marginRight: 6
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    background: "#fcfcfc",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop: 40,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  }
});

const ToolbarTitle = ({ classes, style, title }) => (
  <Typography
    style={style}
    component="h1"
    variant="h6"
    color="inherit"
    noWrap
    className={classes.title}
  >
    {title}
  </Typography>
);

const _Layout = ({
  cid,
  title,
  classes,
  opened,
  onToggle,
  children,
  structure,
  enableDrawer,
  router
}) => (
  <div className={classes.root}>
    <AppBar
      position="absolute"
      className={cx(
        classes.appBar,
        opened && enableDrawer && classes.appBarShift
      )}
    >
      <Toolbar className={classes.toolbar} disableGutters={!opened}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onToggle}
          className={cx(classes.menuButton, opened && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        {(cid && (
          <Link route="texte" params={{ texte: cid }}>
            <div>
              <ToolbarTitle
                classes={classes}
                title={title}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Link>
        )) || <ToolbarTitle classes={classes} title={title} />}
      </Toolbar>
    </AppBar>
    {(enableDrawer && (
      <Drawer
        cid={cid}
        structure={structure}
        classes={classes}
        onToggle={onToggle}
        opened={opened}
      />
    )) ||
      null}
    <main className={classes.content}>{children}</main>
  </div>
);
_Layout.defaultProps = {
  enableDrawer: true
};
const Layout = withStyles(styles)(withToggle(_Layout));

export default Layout;
