import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { testData } from "../test-data-juiced-balls";
import { makeStyles } from "@material-ui/core/styles";
import AppHeader from "./AppHeader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  teamName: {
    // fontWeight: "bold",
    marginTop: "25px",
    marginLeft: "5%",
  },
  grid: {
    backgroundColor: "whitesmoke",
    width: "90%",
    marginLeft: "5%",
    marginTop: "10px",
    marginBottom: "10px",
  },
  buttonGroupPrimary: {
    backgroundColor: "darkorchid",
    borderColor: "black !important",
    "&:hover": {
      backgroundColor: "rgba(153,50,204, 0.75)",
    },
  },
}));

interface PlayerStats {
  name: string;
  position: string;
  team: string;
  abs?: number;
  runs?: number;
  hits?: number;
  doubles?: number;
  homeruns?: number;
  rbis?: number;
  sbs?: number;
  avg?: number;
  obp?: number;
  slg?: number;
  innings?: number;
  wins?: number;
  losses?: number;
  saves?: number;
  strikeouts?: number;
  holds?: number;
  era?: number;
  whip?: number;
  kPerNine?: number;
  qualityStarts?: number;
}

enum PlayerDisplayType {
  Batters = 0,
  Pitchers = 1,
}

function Team() {
  const classes = useStyles();
  const [playerDisplayType, setPlayerDisplayType] = useState(
    PlayerDisplayType.Batters
  );
  const [playerStats, setPlayerStats] = useState(testData as PlayerStats[]);

  const displayBatters = () => {
    setPlayerDisplayType(PlayerDisplayType.Batters);
  };

  const displayPitchers = () => {
    setPlayerDisplayType(PlayerDisplayType.Pitchers);
  };

  const toggleStatsPerUnit = (event: any) => {
    if (event.target.checked) setPlayerStats(calculatePerUnitStats(testData));
    else {
      setPlayerStats(testData);
    }
  };

  const calculatePerUnitStats = (playerStats: any[]) => {
    return playerStats.map((player) => {
      if (player.position === "SP" || player.position === "RP") {
        const perUnitStats: PlayerStats = {
          ...player,
          wins: +(player.wins / player.innings).toFixed(3),
          losses: +(player.losses / player.innings).toFixed(3),
          saves: +(player.saves / player.innings).toFixed(3),
          strikeouts: +(player.strikeouts / player.innings).toFixed(3),
          holds: +(player.holds / player.innings).toFixed(3),
          qualityStarts: +(player.qualityStarts / player.innings).toFixed(3),
        };
        return perUnitStats;
      } else {
        const perUnitStats: PlayerStats = {
          ...player,
          runs: +(player.runs / player.abs).toFixed(3),
          hits: +(player.hits / player.abs).toFixed(3),
          doubles: +(player.doubles / player.abs).toFixed(3),
          homeruns: +(player.homeruns / player.abs).toFixed(3),
          rbis: +(player.rbis / player.abs).toFixed(3),
          sbs: +(player.sbs / player.abs).toFixed(3),
        };
        return perUnitStats;
      }
    });
  };

  return (
    <Paper style={{ height: "90%" }}>
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
            <Button disableRipple onClick={displayBatters}>
              Batters
            </Button>
            <Button disableRipple onClick={displayPitchers}>
              Pitchers
            </Button>
          </ButtonGroup>
          <FormControlLabel
            style={{ float: "right", marginRight: "5%" }}
            control={
              <Switch
                color="primary"
                name="averagesOn"
                onChange={toggleStatsPerUnit}
              />
            }
            label={
              playerDisplayType === PlayerDisplayType.Batters
                ? "Show Stats Per AB"
                : "Show Stats Per IP"
            }
          />
        </div>
        <Paper variant="outlined" className={classes.grid}>
          <Table aria-label="simple table">
            <TableHead>
              {playerDisplayType === PlayerDisplayType.Batters ? (
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
              ) : (
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Team</TableCell>
                  <TableCell align="right">W</TableCell>
                  <TableCell align="right">L</TableCell>
                  <TableCell align="right">SV</TableCell>
                  <TableCell align="right">K</TableCell>
                  <TableCell align="right">HLD</TableCell>
                  <TableCell align="right">ERA</TableCell>
                  <TableCell align="right">WHIP</TableCell>
                  <TableCell align="right">K/9</TableCell>
                  <TableCell align="right">QS</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {playerDisplayType === PlayerDisplayType.Batters
                ? playerStats
                    .filter((player) => {
                      return (
                        player.position !== "SP" && player.position !== "RP"
                      );
                    })
                    .map((player) => (
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
                    ))
                : playerStats
                    .filter((player) => {
                      return (
                        player.position === "SP" || player.position === "RP"
                      );
                    })
                    .map((player) => (
                      <TableRow key={player.name}>
                        <TableCell component="th" scope="row">
                          {player.name}
                        </TableCell>
                        <TableCell align="right">{player.position}</TableCell>
                        <TableCell align="right">{player.team}</TableCell>
                        <TableCell align="right">{player.wins}</TableCell>
                        <TableCell align="right">{player.losses}</TableCell>
                        <TableCell align="right">{player.saves}</TableCell>
                        <TableCell align="right">{player.strikeouts}</TableCell>
                        <TableCell align="right">{player.holds}</TableCell>
                        <TableCell align="right">{player.era}</TableCell>
                        <TableCell align="right">{player.whip}</TableCell>
                        <TableCell align="right">{player.kPerNine}</TableCell>
                        <TableCell align="right">
                          {player.qualityStarts}
                        </TableCell>
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
