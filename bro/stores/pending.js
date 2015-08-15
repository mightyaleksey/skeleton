import { assocIn } from 'mori';

export default function pending(state, action) {
  return assocIn(state, ['game', 'inaction'], action.value);
}
