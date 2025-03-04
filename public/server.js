import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve(); // To resolve __dirname in ES Modules

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
