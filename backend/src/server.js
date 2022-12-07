import express from "express";
import * as myController from "./_controllers.js";


async function lanchServer() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.get('/api/posts', myController.getPostAll);
    app.set('/api/posts', myController.setPost());

    app.listen(3000);
}

lanchServer();
