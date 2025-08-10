"use client";

import { Modal, Text } from "@mantine/core";
import React from "react";
import ReactHookForm from "./ReactHookForm";
import { useRouter } from "next/navigation";

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function CreateJobModal({
  opened,
  onClose,
}: CreateJobModalProps) {
  const router = useRouter();
  const handleSuccess = () => {
    onClose();
    router.refresh();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="lg"
      radius="lg"
      centered
      m="md"
      styles={{
        content: {
          width: 800,
          height: 640,
        },
        body: {
          overflowY: "auto",
        },
      }}
    >
      <Text fz="xl" ta="center" fw="bold" pb="xl">
        Create Job Opening
      </Text>
      <ReactHookForm onSuccess={handleSuccess} />
    </Modal>
  );
}