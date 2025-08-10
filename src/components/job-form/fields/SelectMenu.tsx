"use client";
import { Select } from "@mantine/core";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Option } from "../types";
import { IconChevronDown } from "@tabler/icons-react";

interface SelectMenuProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  error?: string;
  rules?: RegisterOptions<T, Path<T>>;
}

export function SelectMenu<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  rules,
}: SelectMenuProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select
          label={label}
          data={options.map((o) => ({ label: o.label, value: o.value }))}
          value={(field.value as string | null) ?? null}
          onChange={(v) => field.onChange(v)}
          placeholder={placeholder}
          searchable={false}
          checkIconPosition="right"
          error={error}
          styles={{ label: { marginBottom: 5, fontSize: 16 } }}
          rightSection={<IconChevronDown size={16} />}
          radius="md"
        />
      )}
    />
  );
}
