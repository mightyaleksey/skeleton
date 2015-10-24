import express from 'express';
import reactEngine from './react-engine';
import { join } from 'path';
import { config } from '../package';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || config.port || 3000;
const app = express();

app.engine('js', reactEngine);
app.set('views', join(__dirname, '../components'));
app.set('view engine', 'js');

app.use((req, res) => res.render('page', {title: 'demo'}));

app.listen(port, _ => console.log('listening %s', port));
