import { shareCardHandler } from './api/shareCard';
import { profileHandler } from './api/profile';
import { participantsHandler } from './api/participants';

export const handlers = [...profileHandler, ...shareCardHandler, ...participantsHandler];
