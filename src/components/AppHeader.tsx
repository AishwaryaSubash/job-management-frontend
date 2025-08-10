"use client";

import { Container, Group, Button, Anchor, Paper } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import CreateJobModal from "./ModalScreen";

export default function AppHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <CreateJobModal opened={opened} onClose={() => setOpened(false)} />
      <Paper
        component="header"
        shadow="sm"
        p="xs"
        radius="80px"
        withBorder={false}
        style={{
          borderBottom: "none",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          margin: "1rem auto",
          maxWidth: "900px",
        }}
      >
        <Container size="lg" px="md" h={70}>
          <Group justify="space-between" align="center" h="100%">
            <Image
              src="https://cybermindworks.com/images/cmwlogo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
            <Anchor
              href="/"
              size="md"
              fw={500}
              c="dark"
              className="text-black hover:text-[#F53A79]"
            >
              Home
            </Anchor>
            <Anchor href="/jobs" size="md" fw={500} c="dark">
              Find Jobs
            </Anchor>
            <Anchor href="/talents" size="md" fw={500} c="dark">
              Find Talents
            </Anchor>
            <Anchor href="/about" size="md" fw={500} c="dark">
              About us
            </Anchor>
            <Anchor href="/testimonials" size="md" fw={500} c="dark">
              Testimonials
            </Anchor>
            <Button
              radius="xl"
              size="md"
              style={{
                background: "linear-gradient(180deg, #9b25f7, #6e08be)",
              }}
              onClick={() => setOpened(true)}
            >
              Create Jobs
            </Button>
          </Group>
        </Container>
      </Paper>
    </>
  );
}