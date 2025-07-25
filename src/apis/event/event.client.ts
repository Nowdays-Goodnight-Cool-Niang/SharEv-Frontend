import { IEventProfile } from '@/types/domain/event';
import { withErrorHandler } from '../withErrorHandler';
import { eventAPI } from './event.api';
import { eventMapper } from './event.mapper';
import { ERROR_MSG } from '@/constants/message';

async function getMyProfileSafe(eventId: string): Promise<IEventProfile | null> {
  return withErrorHandler<IEventProfile>({
    fallbackMessage: ERROR_MSG.profile.fetch,
  })(async () => {
    const raw = await eventAPI.getMyProfile(eventId);
    return eventMapper.mapMyEventProfile(raw);
  });
}

// function participateInEventSafe(eventId: string) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MSG.profile.create,
//     codeMap: ERROR_MSG.profile.codeMap,
//   })(() => eventAPI.participateInEvent(eventId));
// }

// function updateMyProfile(eventId: string, data: EventProfileDetailRequest) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MSG.profile.update,
//   })(() => eventAPI.updateMyProfile(eventId, data));
// }

// function getProfileByPin(eventId: string, pin: string) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MSG.profile.fetchByPin,
//     codeMap: ERROR_MSG.profile.codeMap,
//   })(() => eventAPI.getProfileByPin(eventId, pin));
// }

export const eventClient = {
  getMyProfileSafe,
};
