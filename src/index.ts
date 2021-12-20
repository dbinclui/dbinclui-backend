import { app } from "./app";
import router from "./app/routes/routes";
import { json } from "body-parser";

app.use(router);
app.use(json());

app.listen(3000, function () {
  console.log("servidor rodando");
});

