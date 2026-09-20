import { config } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";
import app from "./app.js";

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(
            `Servidor ShipNow ejecutándose en http://localhost:${config.port}`
        );
    });
};

startServer();
