import Controller from 'controller';
import express from 'express';
import cors from 'cors';

class RestServer {
  constructor(private readonly controllers: Controller[]) {}

  run() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    this.controllers.forEach((controller) => {
      app.use(controller.getRouter());
    });

    app.listen(3000, () => console.log('Server is running on port 3000'));
  }
}

export default RestServer;
