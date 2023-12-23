import app from './app';
import { utils } from "./utils/index"

app.listen(utils.PORT, () => {
  console.log(`Server listening on port ${utils.PORT}`);
});
