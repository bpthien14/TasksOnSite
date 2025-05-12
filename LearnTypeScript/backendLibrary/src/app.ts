import express from "express";
import { config } from "./config/config";
import { connectToDatabase } from "./utils/database";

const app = express();
const PORT = config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API quản lý thư viện đang hoạt động!");
});

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Không thể khởi động server:", error);
        process.exit(1);
    }
}

startServer();
