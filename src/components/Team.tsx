import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { testData } from "../test-data";

function Team() {
  return (
    <TableContainer component={Paper}>
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
          {testData.map(player => (
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
    </TableContainer>
  );
}

export default Team;
