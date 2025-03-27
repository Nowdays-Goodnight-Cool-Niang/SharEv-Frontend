import MyProfile from './MyProfile';

function MySection() {
  const settingButtons = [{ title: '문의하기' }, { title: '로그아웃' }, { title: '탈퇴하기' }];
  const datas = [
    { title: '프로필', content: <MyProfile /> },
    { title: '설정', buttons: settingButtons },
  ];
  return (
    <section className="mt-6">
      {datas.map((data) => (
        <div className="mt-10" key={data.title}>
          <h2 className="text-title-2 mb-4 text-gray-400">{data.title}</h2>
          {data.buttons ? (
            <div className="flex flex-col">
              {data.buttons.map((button, idx) => (
                <button
                  key={idx}
                  className="text-body-3 rounded bg-gray-800 p-5 text-gray-200 hover:bg-gray-700"
                >
                  {button.title}
                </button>
              ))}
            </div>
          ) : (
            data.content
          )}
        </div>
      ))}
    </section>
  );
}

export default MySection;
