"use client";
import { DatePickerInput } from "@mantine/dates";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { IconCalendarEventFilled } from "@tabler/icons-react";

interface DateMenuProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export function DateMenu<T extends FieldValues>({
  name,
  control,
  label,
}: DateMenuProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePickerInput
          label={label}
          value={field.value as Date | null}
          onChange={(val) => field.onChange(val)}
          placeholder="Pick date"
          valueFormat="DD MMM YYYY"
          minDate={new Date()}
          clearable
          rightSection={<IconCalendarEventFilled size={14} />}
          styles={{ label: { marginBottom: 5, fontSize: 16 } }}
        />
      )}
    />
  );
}
