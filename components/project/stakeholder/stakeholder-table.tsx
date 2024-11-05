"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StakeholderRole, Stakeholder } from "@/types/stakeholder";

interface StakeholderTableProps {
  role: StakeholderRole;
  stakeholders: Stakeholder[];
}

export function StakeholderTable({ role, stakeholders }: StakeholderTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          {role.fields.map((field) => (
            <TableHead key={field.name}>{field.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {stakeholders.map((stakeholder) => (
          <TableRow key={stakeholder.id}>
            <TableCell className="font-medium">{stakeholder.id}</TableCell>
            {role.fields.map((field) => (
              <TableCell key={field.name}>
                {stakeholder.data[field.name]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}