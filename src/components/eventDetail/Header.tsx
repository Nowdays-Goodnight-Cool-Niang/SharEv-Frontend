// @ts-nocheck
import { useState } from "react";
import Logo from "../common/Logo";
import {QRCodeSVG} from 'qrcode.react';
import Modal from "../common/Modal";
import { participantAPI } from "../../apis/participants";
import { useParams } from "react-router";

function Header() {
  const { eventId } = useParams<{ eventId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);

  const handleOpenModal = async() => {
    setIsModalOpen(true);
    try {
      // console.log(eventId)
      const qrData = await participantAPI.getParticipantQR(eventId)
      console.log(qrData)
      setQrValue(qrData);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="flex items-center justify-between sticky py-3 px-6 z-10 top-0 bg-white">
      <Logo></Logo>
      <button className="rounded-full bg-gray-70" onClick={handleOpenModal}>큐알</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}> <QRCodeSVG value='111111' /> </Modal>
      
    </header>
  );
}

export default Header;
