import { gatheringHandler } from './api/gathering';
import { profileHandler } from './api/profile';

export const handlers = [...profileHandler, ...gatheringHandler];
