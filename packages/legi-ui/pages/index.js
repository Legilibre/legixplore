import { withStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";

import withToggle from "../src/lib/withToggle";

import {
  CircularProgress,
  IconButton,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar
} from "@material-ui/core";

import cx from "classnames";

import Drawer from "../src/Drawer";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
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

const _Layout = ({ title, classes, opened, onToggle, children }) => (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="absolute"
      className={cx(classes.appBar, opened && classes.appBarShift)}
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
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer classes={classes} onToggle={onToggle} opened={opened} />
    <main className={classes.content}>{children}</main>
  </div>
);

const Layout = withToggle(_Layout);

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Layout classes={classes} title="LEGI-explorer">
        <Typography variant="h1" color="inherit">
          Home
        </Typography>
      </Layout>
    );
  }
}

export default withStyles(styles)(Home);
