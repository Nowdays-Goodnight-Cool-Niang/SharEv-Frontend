import { eventHandler } from './api/event';
import { profileHandler } from './api/profile';
import { participantsHandler } from './api/participants';

export const handlers = [...profileHandler, ...eventHandler, ...participantsHandler];
