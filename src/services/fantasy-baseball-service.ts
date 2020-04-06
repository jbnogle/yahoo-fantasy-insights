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
