"use client";

import {
  Box,
  Group,
  TextInput,
  Select,
  RangeSlider,
  Divider,
  Paper,
  rem,
  Loader,
} from "@mantine/core";
import {
  IconSearch,
  IconMapPin,
  IconUser,
  IconChevronDown,
} from "@tabler/icons-react";
import { useJobsQuery } from "../jobs/useJobsQuery";
import { useEffect, useState } from "react";

const JOB_TYPE_OPTIONS = [
  { label: "Full time", value: "FULL_TIME" },
  { label: "Part time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
];

export default function JobsFilterBar() {
  const [query, setQuery] = useJobsQuery();

  const [search, setSearch] = useState(query.search || "");
  const [location, setLocation] = useState(query.location || "");
  const [jobType, setJobType] = useState<string | null>(query.jobType || null);
  const [salary, setSalary] = useState<[number, number]>([
    query.salaryMin ?? 50000,
    query.salaryMax ?? 80000,
  ]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Keep local state in sync when URL changes externally
  useEffect(() => {
    setSearch(query.search || "");
    setLocation(query.location || "");
    setJobType(query.jobType || null);
    setSalary([query.salaryMin ?? 50000, query.salaryMax ?? 80000]);
  }, [
    query.search,
    query.location,
    query.jobType,
    query.salaryMin,
    query.salaryMax,
  ]);

  // Hide loader once the URL search param has updated
  useEffect(() => {
    setSearchLoading(false);
  }, [query.search]);

  const DividerSlim = () => (
    <Divider
      orientation="vertical"
      color="#EAEAEA"
      mx="xs"
      style={{ height: 28, alignSelf: "center" }}
    />
  );

  return (
    <Paper
      shadow="sm"
      p="md"
      withBorder={false}
      style={{
        background: "white",
        border: "1px solid #EAEAEA",
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      }}
    >
      <Group align="center" gap={0} wrap="nowrap">
        <Box className="flex-1" px="md">
          <TextInput
            leftSection={<IconSearch size={18} />}
            placeholder="Search By Job Title, Role"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if ((query.search || "") === (search || "")) return;
                setSearchLoading(true);
                setQuery({ ...query, search: search || undefined });
                (e.currentTarget as HTMLInputElement).blur();
              }
            }}
            rightSection={searchLoading ? <Loader size="xs" /> : null}
            variant="unstyled"
            styles={{ input: { fontSize: rem(16) } }}
          />
        </Box>
        <DividerSlim />
        <Box className="flex-1" px="md">
          <TextInput
            leftSection={<IconMapPin size={18} />}
            placeholder="Preferred Location"
            value={location}
            onChange={(e) => {
              const v = e.currentTarget.value;
              setLocation(v);
              setQuery({ ...query, location: v || undefined });
            }}
            rightSection={<IconChevronDown size={16} />}
            variant="unstyled"
            styles={{ input: { fontSize: rem(16) } }}
          />
        </Box>
        <DividerSlim />
        <Box className="flex-1" px="md">
          <Select
            leftSection={<IconUser size={18} />}
            placeholder="Job type"
            data={JOB_TYPE_OPTIONS}
            value={jobType}
            onChange={(v) => {
              setJobType(v);
              setQuery({ ...query, jobType: v || undefined });
            }}
            rightSection={<IconChevronDown size={16} />}
            variant="unstyled"
            styles={{ input: { fontSize: rem(16) } }}
            checkIconPosition="right"
            clearable
          />
        </Box>
        <DividerSlim />
        <Box px="md" style={{ minWidth: 340 }}>
          <Group gap="sm" justify="space-between" mb={6}>
            <span>Salary Per Month</span>
            <span>
              ₹{salary[0] / 1000}k - ₹{salary[1] / 1000}k
            </span>
          </Group>
          <RangeSlider
            value={salary}
            onChange={(v) => setSalary(v)}
            onChangeEnd={(v) =>
              setQuery({ ...query, salaryMin: v[0], salaryMax: v[1] })
            }
            min={0}
            max={200000}
            step={1000}
            radius="xl"
            color="dark"
            styles={{ label: { display: "none" } }}
          />
        </Box>
      </Group>
    </Paper>
  );
}
