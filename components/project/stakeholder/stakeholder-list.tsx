"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeholderRole } from "@/types/stakeholder";

interface StakeholderListProps {
  roles: StakeholderRole[];
}

export function StakeholderList({ roles }: StakeholderListProps) {
  if (!roles.length) return null;

  return (
    <Tabs defaultValue={roles[0]?.name?.toLowerCase() || "girl"} className="w-full">
      <TabsList className="w-full justify-start">
        {roles.map((role, index) => (
          <TabsTrigger key={index} value={role.name.toLowerCase()}>
            {role.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {roles.map((role, index) => (
        <TabsContent key={index} value={role.name.toLowerCase()}>
          <Card>
            <CardHeader>
              <CardTitle>{role.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {role.fields.map((field, fieldIndex) => (
                  <li key={fieldIndex} className="flex items-center text-sm">
                    <span className="font-medium">{field.name}</span>
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                    <span className="text-muted-foreground ml-2">({field.type})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}