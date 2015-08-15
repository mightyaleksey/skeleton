import { join } from 'path';
import express from 'express';

/**
 * @param  {string} relativePath From app/<..>
 * @return {function}
 */
export default function staticMiddleware(relativePath) {
  const absolutePath = join(__dirname, '..', relativePath);
  return express.static(absolutePath, {redirect: false});
}
