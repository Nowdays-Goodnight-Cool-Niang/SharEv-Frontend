import { IMyEventProfile } from '@/types/domain/event';
import { withErrorHandler } from '../withErrorHandler';
import { eventAPI } from './event.api';
import { eventMapper } from './event.mapper';
import { ERROR_MESSAGE } from '@/constants/message';

async function getMyProfileSafe(eventId: string): Promise<IMyEventProfile | null> {
  return withErrorHandler<IMyEventProfile>({
    fallbackMessage: ERROR_MESSAGE.profile.fetch,
  })(async () => {
    const raw = await eventAPI.getMyProfile(eventId);
    return eventMapper.mapMyEventProfile(raw);
  });
}

function participateInEventSafe(eventId: string) {
  return withErrorHandler({
    fallbackMessage: ERROR_MESSAGE.profile.create,
    codeMap: ERROR_MESSAGE.profile.codeMap,
  })(() => eventAPI.participateInEvent(eventId));
}

// function updateMyProfile(eventId: string, data: EventProfileDetailRequest) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MESSAGE.profile.update,
//   })(() => eventAPI.updateMyProfile(eventId, data));
// }

// function getProfileByPin(eventId: string, pin: string) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MESSAGE.profile.fetchByPin,
//     codeMap: ERROR_MESSAGE.profile.codeMap,
//   })(() => eventAPI.getProfileByPin(eventId, pin));
// }

export const eventClient = {
  getMyProfileSafe,
  participateInEventSafe,
};
