import detectmobile from '../controllers/detectmobile';
import prerender from '../controllers/prerender';
import render from '../controllers/render';
import statix from '../controllers/static';
import times from '../controllers/times';

export default function routes(app) {
  app.get('/', [
    detectmobile,
    prerender,
    render,
  ]);

  app.use('/', statix('../static'));
  app.use('*', times);
}
