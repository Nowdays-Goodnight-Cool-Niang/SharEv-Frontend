import { withErrorHandler, ERROR_MSG } from '../withErrorHandler';
import { eventAPI } from './event.api';
import { mapEventProfileResponse } from './event.mapper';
import { IEventProfile } from '@/types';

async function getMyProfileSafe(eventId: string): Promise<IEventProfile | null> {
  return withErrorHandler<IEventProfile>({
    fallbackMessage: ERROR_MSG.profile.fetch,
  })(async () => {
    const raw = await eventAPI.getMyProfile(eventId);
    return mapEventProfileResponse(raw);
  });
}

// function createMyProfile(eventId: string) {
//   return withErrorHandler({
//     fallbackMessage: ERROR_MSG.profile.create,
//     codeMap: ERROR_MSG.profile.codeMap,
//   })(() => eventAPI.createMyProfile(eventId));
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
