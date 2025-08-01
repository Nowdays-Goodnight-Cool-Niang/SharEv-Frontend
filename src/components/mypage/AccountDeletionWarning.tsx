function AccountDeletionWarning() {
  return (
    <div role="alert" aria-labelledby="warning-title">
      <h2 id="warning-title" className="text-title-3 mb-3 font-bold text-gray-800">
        탈퇴 시 유의사항
      </h2>
      <div className="rounded-xl bg-gray-50 px-5 py-5 text-sm leading-6 tracking-tight text-gray-600">
        <ul className="ml-2 list-inside list-disc">
          <li className="mb-1">계정 관련 모든 데이터가 삭제됩니다.</li>
          <li>동일한 이메일로 재가입이 가능하지만, 한번 삭제된 데이터는 복구할 수 없습니다.</li>
        </ul>
      </div>
    </div>
  );
}

export default AccountDeletionWarning;
