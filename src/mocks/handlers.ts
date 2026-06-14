import { gatheringHandler } from './api/gathering';
import { profileHandler } from './api/profile';
import { teamHandler } from './api/team';

export const handlers = [...profileHandler, ...gatheringHandler, ...teamHandler];
