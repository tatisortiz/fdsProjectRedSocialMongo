import { postSeeder } from "./postSeeder.js";
import { userSeeder } from "./userSeeder.js";



(async () => {
    console.log("Starting Seeders.");
    await userSeeder()
    await postSeeder()
   
})();