import detectmobile from '../modules/detectmobile';

export default function detectmobileMiddleware(req, res, next) {
  req.mobile = detectmobile(req.headers['user-agent']);
  next();
}
