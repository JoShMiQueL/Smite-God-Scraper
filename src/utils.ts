import { CheerioAPI } from "cheerio";
import { God } from "./godService.js";
import fs from "fs/promises";

export const wikiURL = "https://smite.fandom.com";

export async function fetchHTML(url: string) {
  const res = await fetch(url);
  return await res.text();
}

export function normalizeText(text: string | null) {
  return (
    text
      ?.replace(/\n/g, "")
      .replace(/<[^>]+>/g, "")
      .trim() || ""
  );
}

export function parseGod($: CheerioAPI): God {
  const rowSelector = (row: number, tag: "th" | "td") =>
    `#mw-content-text > div > table.infobox > tbody > tr:nth-child(${row}) > ${tag}`;
  return {
    name: normalizeText($(rowSelector(1, "th")).html()),
    summary: {
      title: normalizeText($(rowSelector(4, "td")).html()),
      pantheon: normalizeText($(rowSelector(5, "td")).html()),
      type: normalizeText($(rowSelector(6, "td")).html()),
      class: normalizeText($(rowSelector(7, "td")).html()),
      pros: normalizeText($(rowSelector(8, "td")).html()),
      difficulty: normalizeText($(rowSelector(9, "td")).html()),
      release_date: normalizeText($(rowSelector(10, "td")).html()),
      favor: parseInt(
        normalizeText(
          $(rowSelector(11, "td")).html()?.replace(/[,.]/g, "") || "-1"
        )
      ),
      gems: parseInt(
        normalizeText(
          $(rowSelector(12, "td")).html()?.replace(/[,.]/g, "") || "-1"
        )
      ),
      voicelines: `${wikiURL}${normalizeText(
        $(rowSelector(13, "td")).find("a").attr("href") || "null"
      )}`,
      voice_actor: normalizeText($(rowSelector(14, "td")).html()),
    },
    stats: {
      health: normalizeText($(rowSelector(16, "td")).html()),
      mana: normalizeText($(rowSelector(17, "td")).html()),
      speed: normalizeText($(rowSelector(18, "td")).html()),
      range: normalizeText($(rowSelector(19, "td")).html()),
      attack_sec: normalizeText($(rowSelector(20, "td")).html()),
      basic_attack: {
        damage: normalizeText($(rowSelector(22, "td")).html()),
        progression: normalizeText($(rowSelector(23, "td")).html()),
      },
      protection: {
        physical: normalizeText($(rowSelector(25, "td")).html()),
        magical: normalizeText($(rowSelector(26, "td")).html()),
      },
      regen: {
        hp5: normalizeText($(rowSelector(28, "td")).html()),
        mp5: normalizeText($(rowSelector(29, "td")).html()),
      },
    },
  };
}

export async function saveGodsToFile(gods: God[], filename: string) {
  try {
    const json = JSON.stringify(gods, null, 2);
    await fs.writeFile(filename, json);
    console.log(`Gods data saved to ${filename}`);
  } catch (error) {
    throw new Error(`Failed to save gods data to ${filename}: ${error}`);
  }
}