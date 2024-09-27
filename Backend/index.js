import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/allRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});

export default app;
