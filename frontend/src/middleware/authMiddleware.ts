// middleware/authMiddleware.ts
import { Middleware } from 'redux';
import { USER_REQUEST } from '../constants/userConstants';

const authMiddleware: Middleware = store => next => action => {
  const state = store.getState();

  if (action.type === USER_REQUEST && state.userreducer.isLoggingOut) {
    console.log("Blocking verifyUser action during logout.");
    return; // Prevent verifyUser action
  }

  return next(action);
};

export default authMiddleware;
