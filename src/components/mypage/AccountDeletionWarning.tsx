function AccountDeletionWarning() {
  return (
    <div>
      <h2 className="text-title-3 mb-3 font-bold text-gray-800">탈퇴 시 유의사항</h2>
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>계정 관련 모든 데이터 삭제됩니다. </li>
          <li>동일한 이메일로 재가입이 가능하지만, 한번 삭제된 데이터는 복구할 수 없습니다</li>
        </ul>
      </div>
    </div>
  );
}

export default AccountDeletionWarning;
