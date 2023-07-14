import App from "./app";
import AuthRoutes from "./routes/auth.routes";
import validateEnv from "./utils/validateEnv";

validateEnv();
console.log("App is Up");

const app = new App(
    [
        new AuthRoutes()
    ],
    3000
)
app.listen()