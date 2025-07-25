import { eventHandler } from './api/event';
import { profileHandler } from './api/profile';

export const handlers = [...profileHandler, ...eventHandler];
