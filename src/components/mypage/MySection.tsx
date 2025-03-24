function MySection() {
  const profileFileds = {};
  const settingFileds = [{ title: '문의하기' }, { title: '로그아웃' }];
  const datas = [
    { title: '프로필', field: profileFileds },
    { title: '설정', field: settingFileds },
  ];
  return (
    <section className="mt-6">
      <>
        {datas.map((data) => (
          <h2 className="text-title-2 mb-4 text-gray-400">{data.title}</h2>
        ))}
      </>
    </section>
  );
}

export default MySection;
