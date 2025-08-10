"use client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import JobForm from "./job-form/JobForm";

export default function ReactHookForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return <JobForm onSuccess={onSuccess} />;
}