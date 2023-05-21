import { load } from "cheerio";
import { fetchHTML, parseGod, wikiURL } from "./utils.js";

export type God = {
  name: string;
  summary: {
    title: string;
    pantheon: string;
    type: string;
    class: string;
    pros: string;
    difficulty: string;
    release_date: string;
    favor: number;
    gems: number;
    voicelines: string;
    voice_actor: string;
  };
  stats: {
    health: string;
    mana: string;
    speed: string;
    range: string;
    attack_sec: string;
    basic_attack: {
      damage: string;
      progression: string;
    };
    protection: {
      physical: string;
      magical: string;
    };
    regen: {
      hp5: string;
      mp5: string;
    };
  };
};

export async function getAllGods() {
  const startTimeTotal = new Date();
  const startTimeLink = new Date();
  const links = await getGodLinks();
  const endTimeLink = new Date();

  const startTimeGods = new Date();
  const gods = await Promise.all(links.map(getGod));
  const endTimeGods = new Date();

  const endTimeTotal = new Date();
  console.log(`Execution time from fetching ${gods.length} gods:`);
  console.log(
    `\t- Links: ${endTimeLink.getTime() - startTimeLink.getTime()}ms`
  );
  console.log(
    `\t- Gods:  ${endTimeGods.getTime() - startTimeGods.getTime()}ms`
  );
  console.log(
    `\t- Total: ${endTimeTotal.getTime() - startTimeTotal.getTime()}ms`
  );
  return gods;
}

async function getGodLinks() {
  try {
    const html = await fetchHTML(`${wikiURL}/wiki/List_of_gods`);
    const $ = load(html);
    const links = $(
      "#mw-content-text > div > table.blue-window.sortable > tbody > tr"
    )
      .map((i, el) => {
        return `${wikiURL}${$(el).find("td:nth-child(2) > a").attr("href")}`;
      })
      .toArray();
    return links.filter((link) => !link.includes("undefined"));
  } catch (e) {
    throw e;
  }
}

async function getGod(url: string) {
  try {
    const html = await fetchHTML(url);
    const $ = load(html);

    const god: God = parseGod($);

    console.log(`✔ ${url.split("/").at(-1)?.replace(/%27/g, "'")}`);
    return god;
  } catch (e) {
    throw e;
  }
}
