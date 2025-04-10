import { shareCardHandler } from './api/shareCard';
import { profileHandler } from './api/profile';

export const handlers = [...profileHandler, ...shareCardHandler];
