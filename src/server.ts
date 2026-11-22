import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
    initDB()
    app.listen(config, () => {
  console.log(`Example app listening on port ${config.port}`);
});
}

main()