import express, { json } from "express";
const app = express();
const contact_routes = require("./routes/app.routes");

app.use(express.json());

const PORT = process.env.PORT ?? 3214;
app.listen(PORT,()=>
    console.log(`Server ready at: http://localhost:${PORT}`)
);

app.use("/contacts", contact_routes);
app.use((req, res) => {
    res.status(404).json({
        error: "Not found"
    })
});
