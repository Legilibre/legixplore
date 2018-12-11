import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  cellHeader: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const ArticleMeta = ({ classes, data }) => {
  const hiddenMetas = ["bloc_textuel", "nota"];
  const rows = Object.keys(data)
    .filter(key => hiddenMetas.indexOf(key) === -1)
    .map(key => ({ key, value: data[key] }));
  return (
    <Paper className={classes.root}>
      <Table padding="dense" className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell className={classes.cellHeader}>
              Clé
            </CustomTableCell>
            <CustomTableCell className={classes.cellHeader}>
              Valeur
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.key}
              </CustomTableCell>
              <CustomTableCell>{row.value}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default withStyles(styles)(ArticleMeta);
