// @ts-nocheck
interface ParticipantCardProps {
  id: string;
  name: string;
  profileImageId: number;
  connection: boolean;
  onClick: () => void;
}

function ParticipantCard({ id, name, profileImageId, connection, onClick }: ParticipantCardProps) {
  return (
    <li
      onClick={connection ? onClick : () => {}}
      className="flex flex-col items-center gap-2 rounded-xl border border-solid border-gray-70 bg-gray-50 py-5"
    >
      <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-30">
        <img
          src={`../../../src/assets/images/avatars/${profileImageId}.png`}
          alt="avatar"
          className="img-cover w-full"
        />
      </div>

      <p className="tex-body-2 text-gray-300">{name}</p>
    </li>
  );
}

export default ParticipantCard;
