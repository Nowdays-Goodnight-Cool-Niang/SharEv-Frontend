import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import ClockSvg from '@/assets/icons/ic_clock.svg?react';
import LocationSvg from '@/assets/icons/ic_location.svg?react';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { IGathering } from '@/types/domain/event';
import { showCustomToast } from '@/utils/showToast';
import useScrollToTop from '@/hooks/useScrollToTop';

const MAX_CONTENT_LENGTH = 500;

function toDatetimeLocalValue(isoString: string) {
  return isoString.slice(0, 16);
}

function EventEdit() {
  useScrollToTop();
  const { gatheringId } = useParams<{ gatheringId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: gatherings } = useQuery<IGathering[]>({
    queryKey: ['gatherings'],
    queryFn: gatheringAPI.getGatherings,
    staleTime: 1000 * 60 * 5,
  });

  const { data: myGatherings } = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'me'],
    queryFn: gatheringAPI.getMyGatherings,
    staleTime: 1000 * 60 * 5,
  });

  const gathering =
    gatherings?.find((g) => g.id === gatheringId) ??
    myGatherings?.find((g) => g.id === gatheringId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [registerStartAt, setRegisterStartAt] = useState('');
  const [registerEndAt, setRegisterEndAt] = useState('');
  const [gatheringUrl, setGatheringUrl] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (!gathering) return;
    setTitle(gathering.title);
    setContent(gathering.content);
    setPlace(gathering.place);
    setStartAt(toDatetimeLocalValue(gathering.startAt));
    setEndAt(toDatetimeLocalValue(gathering.endAt));
    setRegisterStartAt(toDatetimeLocalValue(gathering.registerStartAt));
    setRegisterEndAt(toDatetimeLocalValue(gathering.registerEndAt));
    setGatheringUrl(gathering.gatheringUrl ?? '');
    setContact(gathering.contact ?? '');
  }, [gathering]);

  const { mutate: updateGathering, isPending } = useMutation({
    mutationFn: (data: Partial<IGathering>) =>
      gatheringAPI.updateGathering(gatheringId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
      showCustomToast({ message: '행사가 수정되었습니다.' });
      navigate(-1);
    },
    onError: () => {
      showCustomToast({ message: '수정에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  const isValid = title.trim().length > 0 && place.trim().length > 0 && startAt && endAt;

  const handleSubmit = () => {
    if (!isValid || isPending) return;
    updateGathering({
      visible: gathering?.visible ?? 'PUBLIC',
      title: title.trim(),
      content: content.trim(),
      place: place.trim(),
      startAt,
      endAt,
      registerStartAt,
      registerEndAt,
      gatheringUrl: gatheringUrl.trim() || undefined,
      contact: contact.trim() || undefined,
    });
  };

  const handleDelete = () => {
    if (!confirm('정말 이 행사를 삭제하시겠습니까?\n삭제된 행사는 복구할 수 없습니다.')) return;
    // TODO: deleteGathering API 연동
    showCustomToast({ message: '행사 삭제 기능은 준비 중입니다.' });
  };

  if (!gathering) {
    return (
      <div className="background flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
        <Header title="행사 수정" showBackButton />
        <div className="wrapper flex-1 py-6">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="행사 수정" showBackButton />

      <div className="wrapper flex-1 py-4">
        {/* 기본 정보 */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-800">
          <SectionTitle step={1} title="기본 정보" />

          <div className="mb-5">
            <FieldLabel label="행사명" required />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="행사 이름을 입력하세요"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
            />
          </div>

          <div>
            <FieldLabel label="행사 소개" />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={MAX_CONTENT_LENGTH}
              rows={4}
              placeholder="행사에 대해 설명해주세요..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
            />
            <div className="mt-1.5 flex justify-end">
              <span className="text-xs text-gray-400">
                {content.length} / {MAX_CONTENT_LENGTH}
              </span>
            </div>
          </div>
        </section>

        {/* 일시 및 장소 */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-800">
          <SectionTitle step={2} title="일시 및 장소" />

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div>
              <FieldLabel label="시작일시" required icon={<ClockSvg width={14} height={14} />} />
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
              />
            </div>
            <div>
              <FieldLabel label="종료일시" required icon={<ClockSvg width={14} height={14} />} />
              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <FieldLabel label="장소" required icon={<LocationSvg width={14} height={14} />} />
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="행사 장소를 입력하세요"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
            />
          </div>
        </section>

        {/* 참가 신청 기간 */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-800">
          <SectionTitle step={3} title="참가 신청 기간" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel label="신청 시작" required />
              <input
                type="datetime-local"
                value={registerStartAt}
                onChange={(e) => setRegisterStartAt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
              />
            </div>
            <div>
              <FieldLabel label="신청 마감" required />
              <input
                type="datetime-local"
                value={registerEndAt}
                onChange={(e) => setRegisterEndAt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
              />
            </div>
          </div>
        </section>

        {/* 추가 정보 */}
        <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-800">
          <SectionTitle step={4} title="추가 정보" />

          <div className="mb-5">
            <FieldLabel label="행사 링크" />
            <input
              type="url"
              value={gatheringUrl}
              onChange={(e) => setGatheringUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
            />
          </div>

          <div>
            <FieldLabel label="연락처" />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="문의처 (이메일, 전화번호 등)"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-800"
            />
          </div>
        </section>

        {/* 행사 삭제 */}
        <section className="mb-4 rounded-2xl border border-red-100 bg-white p-5 dark:border-red-900/30 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">행사 삭제</p>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                삭제된 행사는 복구할 수 없습니다
              </p>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
            >
              삭제
            </button>
          </div>
        </section>
      </div>

      {/* 하단 버튼 */}
      <div className="wrapper sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 py-3 dark:border-gray-800 dark:bg-gray-950">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isPending}
          className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>
      <BottomSpace />
    </div>
  );
}

function SectionTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        {step}
      </span>
      <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
  );
}

function FieldLabel({
  label,
  required = false,
  icon,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span>{label}</span>
      {required && <span className="text-blue-500">*</span>}
    </div>
  );
}

export default EventEdit;
