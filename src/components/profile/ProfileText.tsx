import { PropsWithChildren } from 'react';

function ProfileText({ children }: PropsWithChildren) {
  return <span className="text-body2 text-gray-500">{children}</span>;
}

export default ProfileText;
