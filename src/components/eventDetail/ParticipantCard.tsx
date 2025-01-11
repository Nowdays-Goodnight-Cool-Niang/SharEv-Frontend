interface ParticipantCardProps{
    id: string;
    name: string;
    profileImageId: number;
    connection: boolean;
    onClick: () => void
}



function ParticipantCard({id, name, profileImageId, connection, onClick}: ParticipantCardProps) {
    return (
      <li className='flex flex-col py-5 items-center gap-2 bg-gray-50 border border-solid border-gray-70 rounded-xl '>
        <div className='w-24 h-24 rounded-full bg-gray-30 overflow-hidden'>
        <img
          src={`../../assets/images/avatars/${profileImageId}.png`}
          alt='avatar'
          className='w-full img-cover'
        />
        </div>

        <p className='tex-body-2 text-gray-300'>{name}</p>
      </li>
    );
  }

export default ParticipantCard
