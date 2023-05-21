import { getAllGods } from "./godService.js";
import { saveGodsToFile } from "./utils.js";

async function main() {
  try {
    const gods = await getAllGods();
    await saveGodsToFile(gods, "gods.json");
  } catch (error) {
    console.error(error);
  }
}

main();