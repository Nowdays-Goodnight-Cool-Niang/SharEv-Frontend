import { IFullEventProfile, IMyEventProfile, IPaginatedEventProfiles } from '@/types/domain/event';
import { withErrorHandler } from '../withErrorHandler';
import { gatheringAPI } from './gathering.api';
import { gatheringMapper } from './gathering.mapper';
import { ERROR_MESSAGE } from '@/constants/message';

async function fetchFieldPlaceholders(gatheringId: string): Promise<Record<string, string>> {
  try {
    const template = await gatheringAPI.getTemplate(gatheringId);
    return template.fieldPlaceholders;
  } catch {
    return {};
  }
}

async function getMyCardSafe(gatheringId: string): Promise<IMyEventProfile | null> {
  return withErrorHandler<IMyEventProfile>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const [raw, fieldPlaceholders] = await Promise.all([
      gatheringAPI.getMyCard(gatheringId),
      fetchFieldPlaceholders(gatheringId),
    ]);
    return gatheringMapper.mapMyCard(raw, fieldPlaceholders);
  });
}

async function getCardByPinSafe(
  gatheringId: string,
  pinNumber: string
): Promise<IFullEventProfile | null> {
  return withErrorHandler<IFullEventProfile>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const [raw, fieldPlaceholders] = await Promise.all([
      gatheringAPI.getCardByPin(gatheringId, pinNumber),
      fetchFieldPlaceholders(gatheringId),
    ]);
    return gatheringMapper.mapCard(raw, fieldPlaceholders) as IFullEventProfile;
  });
}

async function getCardsSafe(
  gatheringId: string,
  { page, size = 20, snapshotTime }: { page: number; size?: number; snapshotTime: string }
): Promise<IPaginatedEventProfiles | null> {
  return withErrorHandler<IPaginatedEventProfiles>({
    fallbackMessage: ERROR_MESSAGE.card.fetch,
  })(async () => {
    const [raw, fieldPlaceholders] = await Promise.all([
      gatheringAPI.getCards(gatheringId, { page, size, snapshotTime }),
      fetchFieldPlaceholders(gatheringId),
    ]);
    return gatheringMapper.mapPaginatedCards(raw, fieldPlaceholders);
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
