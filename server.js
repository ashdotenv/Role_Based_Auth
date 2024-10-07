import app from "./app.js";
import { connectToDb } from "./db.js";

const port = process.env.port || 5000

app.listen(port, () => {
    connectToDb().then((m) => {
        console.log(m);
    }).catch(e => {
        console.log(e);
    })
    console.log(`Serving on PORT ${port}`);
})