import { gameKey } from "../endpoints";
import { makeAPIrequest } from "./api-request-service";

export async function getLeaguePrefix() {
  try {
    const results = await makeAPIrequest(gameKey);
    return results.fantasy_content.game.game_id;
  } catch (err) {
    console.error(`Error in getLeaguePrefix(): ${err}`);
  }
}

export async function getTeamPlayers(teamId: string) {
  try {
    const resp = await fetch(`/teams/${teamId}/players`);
    const jsonObj = await resp.json();
    return jsonObj.data;
  } catch (err) {
    console.error(`Error in getTeamPlayers: ${err}`);
  }
}
