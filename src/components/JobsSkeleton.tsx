"use client";
import { Card, Skeleton, SimpleGrid } from "@mantine/core";

export default function JobsSkeleton() {
  const items = Array.from({ length: 8 });
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {items.map((_, i) => (
        <Card key={i} padding="lg" radius="lg" withBorder>
          <Skeleton height={56} width={56} circle mb="sm" />
          <Skeleton height={18} mt={8} width="80%" />
          <Skeleton height={12} mt={10} width="60%" />
          <Skeleton height={12} mt={6} width="50%" />
          <Skeleton height={80} mt={12} />
          <Skeleton height={36} mt={16} radius="md" />
        </Card>
      ))}
    </SimpleGrid>
  );
}
