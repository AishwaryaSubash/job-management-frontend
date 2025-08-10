"use client";

import {
  Box,
  Button,
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
import { useJobsQuery } from "../jobs/hooks/useJobsQuery";
import { useEffect, useState, KeyboardEvent } from "react";

const JOB_TYPE_OPTIONS = [
  { label: "Full time", value: "FULL_TIME" },
  { label: "Part time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
];

const DividerSlim = () => (
  <Divider
    orientation="vertical"
    color="#EAEAEA"
    mx="xs"
    style={{ height: 28, alignSelf: "center" }}
  />
);

export default function JobsFilterBar() {
  const [query, setQuery] = useJobsQuery();

  const [search, setSearch] = useState(query.search ?? "");
  const [location, setLocation] = useState(query.location ?? "");
  const [jobType, setJobType] = useState<string | null>(query.jobType ?? null);
  const [salary, setSalary] = useState<[number, number]>([
    query.salaryMin ? query.salaryMin / 12 : 50000,
    query.salaryMax ? query.salaryMax / 12 : 80000,
  ]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setSearch(query.search ?? "");
    setLocation(query.location ?? "");
    setJobType(query.jobType ?? null);
    setSalary([
      query.salaryMin ? query.salaryMin / 12 : 50000,
      query.salaryMax ? query.salaryMax / 12 : 80000,
    ]);
  }, [query]);

  useEffect(() => {
    setSearchLoading(false);
  }, [query.search]);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if ((query.search ?? "") === (search ?? "")) return;
      setSearchLoading(true);
      setQuery({ ...query, search: search || undefined });
      e.currentTarget.blur();
    }
  };

  return (
    <Paper
      shadow="sm"
      p="md"
      mt="xl"
      withBorder={false}
      style={{
        background: "white",
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      }}
    >
      <Group align="center" gap={0} wrap="nowrap">
        {/* Search */}
        <Box className="flex-1" px="md">
          <TextInput
            leftSection={<IconSearch size={18} />}
            placeholder="Search By Job Title, Role"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={handleSearchKeyDown}
            rightSection={searchLoading ? <Loader size="xs" /> : null}
            variant="unstyled"
            styles={{ input: { fontSize: rem(16) } }}
          />
        </Box>

        <DividerSlim />

        {/* Location */}
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

        {/* Job type */}
        <Box className="flex-1" px="md">
          <Select
            leftSection={<IconUser size={18} />}
            placeholder="Job type"
            data={JOB_TYPE_OPTIONS}
            value={jobType}
            onChange={(v) => {
              setJobType(v);
              setQuery({ ...query, jobType: v ?? undefined });
            }}
            rightSection={<IconChevronDown size={16} />}
            variant="unstyled"
            styles={{ input: { fontSize: rem(16) } }}
            checkIconPosition="right"
            clearable
          />
        </Box>

        <DividerSlim />

        {/* Salary */}
        <Box px="md" style={{ minWidth: 340 }}>
          <Group gap="sm" justify="space-between" mb={6}>
            <span>Salary Per Month</span>
            <span>
              ₹{salary[0] / 1000}k - ₹{salary[1] / 1000}k
            </span>
          </Group>
          <RangeSlider
            value={salary}
            onChange={(v) => {
              if (v[1] >= v[0]) {
                setSalary(v);
              }
            }}
            onChangeEnd={(v) => {
              if (v[1] >= v[0]) {
                setQuery({
                  ...query,
                  salaryMin: v[0] * 12,
                  salaryMax: v[1] * 12,
                });
              }
            }}
            min={40000}
            max={200000}
            step={1000}
            radius="xl"
            color="dark"
            styles={{ label: { display: "none" } }}
          />
        </Box>
        <DividerSlim />
        <Box px="md">
          <Button
            variant="subtle"
            onClick={() => {
              setSearch("");
              setLocation("");
              setJobType(null);
              setSalary([50000, 80000]);
              setSearchLoading(false);
              setQuery({});
            }}
          >
            Reset
          </Button>
        </Box>
      </Group>
    </Paper>
  );
}
