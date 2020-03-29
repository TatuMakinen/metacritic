import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import YearSelect from "./YearSelect";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import blue from "@material-ui/core/colors/blue";

import rawData from "./metacritic.json";

interface MetaCriticDataRecord {
  title: string;
  meta_score: number;
  user_score: number;
  release_date_ts: number;
  year: number;
}

const fullData = rawData as Array<MetaCriticDataRecord>;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  head: {
    backgroundColor: theme.palette.primary.light
  },
  container: {
    maxHeight: "89vh"
  },
  appBarSpacer: theme.mixins.toolbar
}));

function generalRenderTableHeader() {
  let header = Object.keys(fullData[0]);
  return header.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
}

function renderTableRow(data: MetaCriticDataRecord) {
  let date = new Date(data.release_date_ts * 1000);
  return (
    <tr key={data.title}>
      <td>{data.title}</td>
      <td>{data.meta_score}</td>
      <td>{data.user_score}</td>
      <td>
        {date.toLocaleString("default", { day: "numeric", month: "long" })}
      </td>
    </tr>
  );
}

function renderTableRows(data: Array<MetaCriticDataRecord>) {
  return <tbody>{data.map(s => renderTableRow(s))}</tbody>;
}

function filterYear(data: Array<MetaCriticDataRecord>, year: number) {
  return data.filter(entry => entry.year === year);
}

//function filterPlatform(data: Array<MetaCriticDataRecord>, platform: string) {
//  return data.filter(entry => entry.platform === platform);
//}

function filterData(data: Array<MetaCriticDataRecord>, year: number) {
  return filterYear(data, year);
}

const OwnTable: React.FC = () => {
  const classes = useStyles();

  const initialYear = Math.max(...fullData.map(d => d.year));
  const availableYears = Array.from(new Set(fullData.map(d => d.year)))
    .sort()
    .reverse();
  const [year, setYear] = React.useState(initialYear);

  //const availablePlatforms = Array.from(
  //  new Set(fullData.map(d => d.platform))
  //).sort();
  //const initialPlatform = availablePlatforms[0];
  //const [platform, setPlatform] = React.useState(initialPlatform);

  interface OrderManager {
    order: "meta_score" | "user_score" | "release_date_ts";
    direction: 1 | -1;
  }
  const initialOrderManager: OrderManager = {
    order: "meta_score",
    direction: 1
  };
  const [orderManager, setOrder] = React.useState(initialOrderManager);

  const filteredData = filterData(fullData, year).sort((a, b) => {
    if (a[orderManager.order] > b[orderManager.order]) {
      return -1 * orderManager.direction;
    }
    if (a[orderManager.order] < b[orderManager.order]) {
      return 1 * orderManager.direction;
    }
    return 0;
  });

  return (
    <Paper className={classes.root}>
      <AppBar>
        METACRITIC - PC GAMES BY YEAR
        <div />
        <YearSelect values={availableYears} value={year} setValue={setYear} />
      </AppBar>
      <div className={classes.appBarSpacer} />
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" className={classes.appBarSpacer}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>TITLE</TableCell>
              <TableCell className={classes.head} align="center">
                <TableSortLabel
                  direction={orderManager.direction === 1 ? "asc" : "desc"}
                  onClick={() =>
                    orderManager.order === "meta_score"
                      ? setOrder({
                          order: "meta_score",
                          direction: orderManager.direction === -1 ? 1 : -1
                        })
                      : setOrder({ order: "meta_score", direction: 1 })
                  }
                >
                  META SCORE
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.head} align="center">
                <TableSortLabel
                  direction={orderManager.direction === 1 ? "asc" : "desc"}
                  onClick={() =>
                    orderManager.order === "user_score"
                      ? setOrder({
                          order: "user_score",
                          direction: orderManager.direction === -1 ? 1 : -1
                        })
                      : setOrder({ order: "user_score", direction: 1 })
                  }
                >
                  USER SCORE
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.head} align="left">
                <TableSortLabel
                  direction={orderManager.direction === 1 ? "asc" : "desc"}
                  onClick={() =>
                    orderManager.order === "release_date_ts"
                      ? setOrder({
                          order: "release_date_ts",
                          direction: orderManager.direction === -1 ? 1 : -1
                        })
                      : setOrder({ order: "release_date_ts", direction: 1 })
                  }
                >
                  RELEASE DATE
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(row => (
              <TableRow key={row.title}>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center">{row.meta_score}</TableCell>
                <TableCell align="center">{row.user_score}</TableCell>
                <TableCell align="left">
                  {new Date(row.release_date_ts * 1000).toLocaleString(
                    "default",
                    {
                      day: "numeric",
                      month: "long"
                    }
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default OwnTable;

//<Container>
//<AppBar position="static">
//  FILTERABLE METACRITIC PC GAMES BY YEAR
//  <YearSelect values={availableYears} value={year} setValue={setYear} />
//</AppBar>
//<Paper>
//  <table id="metacritic-table">
//    <tr key={"header"}>
//      <th>
//        <Button variant="contained" endIcon={<Icon>send</Icon>}>
//          TITLE
//        </Button>
//      </th>
//      <th>META_SCORE</th>
//      <th>USER SCORE</th>
//      <th>DATE</th>
//    </tr>
//    {renderTableRows(filteredData)}
//  </table>
//</Paper>
//</Container>
