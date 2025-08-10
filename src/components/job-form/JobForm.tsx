"use client";
import {
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm, Controller } from "react-hook-form";
import { DateMenu } from "./fields/DateMenu";
import { SelectMenu } from "./fields/SelectMenu";
import { JOB_TYPE_OPTIONS, JobFormValues } from "./types";
import { formatIndianNumberDigits, stripNonDigits } from "@/lib/currency";
import { IconArrowDown } from "@tabler/icons-react";

interface Props {
  onSuccess?: () => void;
}

export default function JobForm({ onSuccess }: Props) {
  const { control, handleSubmit, register, reset, formState, setError } =
    useForm<JobFormValues>({
      defaultValues: {
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: null,
        salaryMin: 0,
        salaryMax: 0,
        applicationDeadline: null,
        description: "",
      },
      mode: "onChange",
    });

  const onSubmit = async (data: JobFormValues) => {
    if (!data.jobType) {
      setError("jobType", {
        type: "required",
        message: "Please select job type",
      });
      return;
    }
    if (!data.applicationDeadline) {
      setError("applicationDeadline", {
        type: "required",
        message: "Please pick a deadline",
      });
      return;
    }

    const deadlineISO = (() => {
      const v = data.applicationDeadline as unknown;
      if (!v) return null;
      let d: Date;
      if (v instanceof Date) {
        d = v;
      } else if (typeof v === "string" || typeof v === "number") {
        d = new Date(v);
      } else {
        return null;
      }
      return Number.isFinite(d.getTime()) ? d.toISOString() : null;
    })();

    const payload = {
      title: data.jobTitle,
      companyName: data.companyName,
      location: data.location,
      type: data.jobType,
      minSalary: data.salaryMin,
      maxSalary: data.salaryMax,
      description: data.description,
      deadline: deadlineISO,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join("\n")
          : result?.message || `Request failed: ${res.status}`;
        notifications.show({
          color: "red",
          title: "Failed to create job",
          message,
        });
        return;
      }
      notifications.show({
        color: "green",
        title: "Job created",
        message: `${payload.title} has been published.`,
      });
      reset();
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Unknown error";

      notifications.show({
        color: "red",
        title: "Failed to create job",
        message,
      });

      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns={12} gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="Job Title"
            placeholder="Full Stack Developer"
            {...register("jobTitle", { required: "Required" })}
            styles={{ label: { marginBottom: 6, fontSize: 16 } }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Company Name"
            placeholder="Amazon, Microsoft, Swiggy"
            {...register("companyName", { required: "Required" })}
            styles={{ label: { marginBottom: 6, fontSize: 16 } }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            label="Location"
            placeholder="Choose Preferred Location"
            {...register("location", { required: "Required" })}
            styles={{ label: { marginBottom: 6, fontSize: 16 } }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <SelectMenu<JobFormValues>
            name="jobType"
            control={control}
            label="Job Type"
            options={JOB_TYPE_OPTIONS}
            placeholder="Select Job Type"
            rules={{ required: "Required" }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack gap={6}>
            <Text size="sm" fw={500} style={{ fontSize: 16 }}>
              Salary Range
            </Text>
            <Group gap="md">
              <Controller
                name="salaryMin"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <TextInput
                    placeholder="₹ 0"
                    value={formatIndianNumberDigits(field.value)}
                    onChange={(e) =>
                      field.onChange(stripNonDigits(e.currentTarget.value))
                    }
                    className="flex-1"
                  />
                )}
              />
              <Controller
                name="salaryMax"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <TextInput
                    placeholder="₹ 12,00,000"
                    value={formatIndianNumberDigits(field.value)}
                    onChange={(e) =>
                      field.onChange(stripNonDigits(e.currentTarget.value))
                    }
                    className="flex-1"
                  />
                )}
              />
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <DateMenu<JobFormValues>
            name="applicationDeadline"
            control={control}
            label="Application Deadline"
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Textarea
            label="Job Description"
            placeholder="Please share a description to let the candidate know more about the job role"
            autosize
            minRows={8}
            resize="vertical"
            {...register("description", { required: "Required" })}
            styles={{ label: { marginBottom: 6, fontSize: 16 } }}
          />
        </Grid.Col>
      </Grid>
      <Group justify="space-between" mt="xl">
        <Button
          type="button"
          onClick={() => reset()}
          disabled={formState.isSubmitting}
          className="px-4 py-2 border rounded-md disabled:opacity-60"
          rightSection={<IconArrowDown size={14} />}
        >
          Save Draft
        </Button>
        <Button
          type="submit"
          loading={formState.isSubmitting}
          disabled={!formState.isValid}
          radius="md"
          style={{ backgroundColor: "#00aaff" }}
          c="white"
        >
          Publish »
        </Button>
      </Group>
    </form>
  );
}
