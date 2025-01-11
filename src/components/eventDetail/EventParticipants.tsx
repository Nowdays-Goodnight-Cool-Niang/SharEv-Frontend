import { useQueryEventParticipants } from "../../hooks/useQueryEventParticipants";
import WarningText from "../common/WarningText";
import ParticipantCard from "./ParticipantCard";

interface EventParticipantsProps {
    eventId: string
}

function EventParticipants({eventId}: EventParticipantsProps) {
    const { eventParticipants, isLoading, error } = useQueryEventParticipants(eventId!);


    if (isLoading) return <div>데이터를 받아오고 있습니다...</div>;
    if (error) return <div>에러가 발생했어요: {error.message}</div>;
    console.log(eventParticipants)
 return   <>
 {eventParticipants?.length === 0 && <WarningText>아직 참여하는 사람이 없습니다.</WarningText>}
  <div>
  <ul className="gap-2 grid grid-cols-3">
     {eventParticipants!.map(participant =><ParticipantCard id={participant.id} name={participant.name} profileImageId={participant.profileImageId} connection={false} onClick={function (): void {
         throw new Error("Function not implemented.");
     } } />) }
  </ul>
 </div>
  </> 

}

export default EventParticipants;



