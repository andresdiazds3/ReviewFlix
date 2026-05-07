import "dotenv/config";
import express from "express";

const app = express();

//middleware
app.use(express.json());

//Variables
const PORT = Number(process.env.PORT) || 3000;

//Routes

//Runtime
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

