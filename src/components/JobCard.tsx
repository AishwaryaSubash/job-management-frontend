"use client";
import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Image,
  Box,
  Tooltip,
} from "@mantine/core";
import { IconUser, IconBuilding, IconStack2 } from "@tabler/icons-react";
import { JobInterface } from "@/lib/types";
import { timeAgo } from "@/lib/date";

interface JobCardProps {
  job: JobInterface;
}

export function JobCard({ job }: JobCardProps) {
  const datePosted = timeAgo(job.updatedAt);
  const salaryRange = `${(job.minSalary / 100000).toFixed(0)}-${(
    job.maxSalary / 100000
  ).toFixed(0)} LPA`;

  return (
    <Card
      padding="lg"
      shadow="md"
      radius="lg"
      bg="white"
      className="flex flex-col h-full"
      style={{ border: "1px solid #eef2f7" }}
    >
      <div className="flex flex-col flex-1 justify-between">
        <Group justify="space-between" align="flex-start">
          <Box
            style={{
              width: 56,
              height: 56,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.06)",
            }}
            className="rounded-2xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden"
          >
            <Image
              src={job.company.logo}
              alt={job.company.name}
              radius="md"
              fit="contain"
              className="h-10 w-10"
            />
          </Box>
          <Badge
            variant="light"
            color="blue"
            radius="xl"
            fw="600"
            style={{
              textTransform: "none",
              paddingInline: 12,
              paddingBlock: 6,
              backgroundColor: "#b0d9ff",
            }}
          >
            {datePosted ?? ""}
          </Badge>
        </Group>

        <Text fz={20} fw={700} mt="md" style={{ lineHeight: 1.2 }}>
          {job.title}
        </Text>

        <Group gap={18} mt={8} c="dimmed" fz="sm">
          <Group gap={6} wrap="nowrap">
            <IconUser size={16} />
            <Text>{job.requirements}</Text>
          </Group>
          <Group gap={6} wrap="nowrap">
            <IconBuilding size={16} />
            <Text>{job.location}</Text>
          </Group>
          <Group gap={6} wrap="nowrap">
            <IconStack2 size={16} />
            <Text>{salaryRange}</Text>
          </Group>
        </Group>

        <Tooltip
          label={job.description}
          multiline
          w={360}
          withinPortal
          withArrow
        >
          <Text mt={12} c="#4b5563" fz={14} lineClamp={3}>
            {job.description}
          </Text>
        </Tooltip>

        <Button
          radius="md"
          fw="bold"
          className="mt-5"
          fullWidth
          style={{
            backgroundColor: "#00aaff",
            boxShadow: "0 8px 20px rgba(0,170,255,0.35)",
          }}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
}
