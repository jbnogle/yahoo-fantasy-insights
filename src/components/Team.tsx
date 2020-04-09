import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { testData } from "../test-data";
import { makeStyles } from "@material-ui/core/styles";
import AppHeader from "./AppHeader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  teamName: {
    fontWeight: "bold",
    marginTop: "25px",
    marginLeft: "5%",
  },
  grid: {
    backgroundColor: "whitesmoke",
    width: "90%",
    marginLeft: "5%",
    marginTop: "10px",
  },
  buttonGroupPrimary: {
    backgroundColor: "darkorchid",
    borderColor: "black !important",
    "&:hover": {
      backgroundColor: "rgba(153,50,204, 0.75)",
    },
  },
}));

function Team() {
  const classes = useStyles();

  const statMethodChanged = () => {
    console.log("blah");
  };

  return (
    <Paper style={{ height: "100%" }}>
      <AppHeader />
      <TableContainer component={Paper} style={{ height: "100%" }}>
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          className={classes.teamName}
        >
          Team Name
        </Typography>
        <div style={{ marginTop: "25px", marginLeft: "5%" }}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="positionbutton group"
            classes={{
              groupedContainedPrimary: classes.buttonGroupPrimary,
            }}
          >
            <Button disableRipple>Batters</Button>
            <Button disableRipple>Pitchers</Button>
          </ButtonGroup>
          {/* <ToggleButtonGroup
            exclusive
            onChange={statMethodChanged}
            aria-label="text alignment"
          >
            <ToggleButton value="totals" aria-label="totals">
              Stat Totals
            </ToggleButton>
            <ToggleButton value="averages" aria-label="averages">
              Stats Per At Bat
            </ToggleButton>
          </ToggleButtonGroup> */}
          <FormControlLabel
            style={{ float: "right", marginRight: "5%" }}
            control={<Switch color="primary" name="averagesOn" />}
            label="Show Stats Per AB"
          />
        </div>
        <Paper variant="outlined" className={classes.grid}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Team</TableCell>
                <TableCell align="right">R</TableCell>
                <TableCell align="right">H</TableCell>
                <TableCell align="right">2B</TableCell>
                <TableCell align="right">HR</TableCell>
                <TableCell align="right">RBI</TableCell>
                <TableCell align="right">SB</TableCell>
                <TableCell align="right">AVG</TableCell>
                <TableCell align="right">OBP</TableCell>
                <TableCell align="right">SLG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testData.map((player) => (
                <TableRow key={player.name}>
                  <TableCell component="th" scope="row">
                    {player.name}
                  </TableCell>
                  <TableCell align="right">{player.position}</TableCell>
                  <TableCell align="right">{player.team}</TableCell>
                  <TableCell align="right">{player.runs}</TableCell>
                  <TableCell align="right">{player.hits}</TableCell>
                  <TableCell align="right">{player.doubles}</TableCell>
                  <TableCell align="right">{player.homeruns}</TableCell>
                  <TableCell align="right">{player.rbis}</TableCell>
                  <TableCell align="right">{player.sbs}</TableCell>
                  <TableCell align="right">{player.avg}</TableCell>
                  <TableCell align="right">{player.obp}</TableCell>
                  <TableCell align="right">{player.slg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>
    </Paper>
  );
}

export default Team;
