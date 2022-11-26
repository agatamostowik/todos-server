import { initApp } from "./src/app.js";

const port = process.env.PORT || 3001;

initApp().listen(port, () => {
  console.log(`aplikacja działa na http://localhost:${port}/`);
});
