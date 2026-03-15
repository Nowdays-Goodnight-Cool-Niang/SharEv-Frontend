import { IFullEventProfile, IMyEventProfile, IPaginatedEventProfiles } from '@/types/domain/event';
import { withErrorHandler } from '../withErrorHandler';
import { gatheringAPI } from './gathering.api';
import { gatheringMapper } from './gathering.mapper';
import { ERROR_MESSAGE } from '@/constants/message';

async function getMyCardSafe(gatheringId: string): Promise<IMyEventProfile | null> {
  return withErrorHandler<IMyEventProfile>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const raw = await gatheringAPI.getMyCard(gatheringId);
    return gatheringMapper.mapMyCard(raw);
  });
}

async function getCardByPinSafe(
  gatheringId: string,
  pinNumber: string
): Promise<IFullEventProfile | null> {
  return withErrorHandler<IFullEventProfile>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const raw = await gatheringAPI.getCardByPin(gatheringId, pinNumber);
    return gatheringMapper.mapCard(raw) as IFullEventProfile;
  });
}

async function getCardsSafe(
  gatheringId: string,
  { page, size = 20, snapshotTime }: { page: number; size?: number; snapshotTime: string }
): Promise<IPaginatedEventProfiles | null> {
  return withErrorHandler<IPaginatedEventProfiles>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const raw = await gatheringAPI.getCards(gatheringId, { page, size, snapshotTime });
    return gatheringMapper.mapPaginatedCards(raw);
  });
}

function participateInGatheringSafe(gatheringId: string) {
  return withErrorHandler({
    fallbackMessage: ERROR_MESSAGE.card.create,
    codeMap: ERROR_MESSAGE.card.codeMap,
  })(() => gatheringAPI.participateInGathering(gatheringId));
}

export const gatheringClient = {
  getMyCardSafe,
  participateInGatheringSafe,
  getCardByPinSafe,
  getCardsSafe,
};
