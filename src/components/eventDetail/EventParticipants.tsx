import { participantAPI } from "../../apis/participants";
import { useQueryEventParticipants } from "../../hooks/useQueryEventParticipants";
import { useParticipantProfileStore } from "../../stores/useParticipantProfileStore";
import WarningText from "../common/WarningText";
import ParticipantCard from "./ParticipantCard";

interface EventParticipantsProps {
    eventId: string
}

function EventParticipants({eventId}: EventParticipantsProps) {
    const { eventParticipants, isLoading, error } = useQueryEventParticipants(eventId!);
    const { setParticipantProfile, setOpen } = useParticipantProfileStore()

    if (isLoading) return <div>데이터를 받아오고 있습니다...</div>;
    if (error) return <div>에러가 발생했어요: {error.message}</div>;
    console.log(eventParticipants)
 return   <>
 {eventParticipants?.length === 0 && <WarningText>아직 참여하는 사람이 없습니다.</WarningText>}
  <div>
  <ul className="gap-2 grid grid-cols-3">
     {eventParticipants!.map(participant =><ParticipantCard 
     id={participant.id} name={participant.name} 
     profileImageId={participant.profileImageId} 
     connection={participant.connection} onClick={async ()  => {
        const data = await participantAPI.getParticipantInfo(participant.id);
        setParticipantProfile({
            id: data.id,
            accountId: data.accountId,
            name: data.name,
            phone: data.phone || "",
            profileImageId: data.profileImageId,
            github: data.github || "",
            instagram: data.instagram || "",
            facebook: data.facebook || "",
            jobGroup: data.jobGroup || "",
            teamName: data.teamName || "",
            projectInfo: data.projectInfo || "",
        });
        setOpen(true);
    }} />) }
  </ul>
 </div>
  </> 

}

export default EventParticipants;



