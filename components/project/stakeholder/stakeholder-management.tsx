"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { StakeholderTable } from "./stakeholder-table";
import { StakeholderRoleForm } from "./stakeholder-role-form";
import { StakeholderImport } from "./stakeholder-import";
import { StakeholderForm } from "./stakeholder-form";
import { StakeholderRole, Stakeholder } from "@/types/stakeholder";
import { toast } from "sonner";

// Helper function to generate unique IDs
function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}${randomStr}`;
}

export function StakeholderManagement() {
  const [selectedRole, setSelectedRole] = useState<string>("Girls");
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isAddingStakeholder, setIsAddingStakeholder] = useState(false);
  const [editingRole, setEditingRole] = useState<StakeholderRole | null>(null);
  const [roles, setRoles] = useState<StakeholderRole[]>([
    {
      name: "Girls",
      fields: [
        { name: "Full Name", type: "text", required: true },
        { name: "Age", type: "number", required: true },
        { name: "Location", type: "text", required: true },
        { name: "Education Level", type: "text", required: true },
        { name: "Risk Factors", type: "text", required: true },
        { name: "Guardian Contact", type: "text", required: true }
      ]
    },
    {
      name: "Teachers",
      fields: [
        { name: "Full Name", type: "text", required: true },
        { name: "Specialization", type: "text", required: true },
        { name: "Years of Experience", type: "number", required: true },
        { name: "Training Certifications", type: "text", required: true },
        { name: "Languages Spoken", type: "text", required: true },
        { name: "Contact Number", type: "text", required: true }
      ]
    }
  ]);

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: "GRL-001",
      role: "Girls",
      data: {
        "Full Name": "Sarah Johnson",
        "Age": "15",
        "Location": "Mumbai, India",
        "Education Level": "9th Grade",
        "Risk Factors": "Limited family support, economically disadvantaged",
        "Guardian Contact": "+91 98765 43210"
      }
    },
    {
      id: "GRL-002",
      role: "Girls",
      data: {
        "Full Name": "Maria Garcia",
        "Age": "16",
        "Location": "Bogotá, Colombia",
        "Education Level": "10th Grade",
        "Risk Factors": "Displaced family, limited access to education",
        "Guardian Contact": "+57 321 234 5678"
      }
    },
    {
      id: "TCH-001",
      role: "Teachers",
      data: {
        "Full Name": "Dr. Priya Sharma",
        "Specialization": "Computer Science & Digital Safety",
        "Years of Experience": "8",
        "Training Certifications": "Child Protection, Digital Security",
        "Languages Spoken": "English, Hindi, Marathi",
        "Contact Number": "+91 99999 88888"
      }
    },
    {
      id: "TCH-002",
      role: "Teachers",
      data: {
        "Full Name": "Isabella Martinez",
        "Specialization": "Social Work & Counseling",
        "Years of Experience": "12",
        "Training Certifications": "Trauma-Informed Care, Youth Counseling",
        "Languages Spoken": "Spanish, English, Portuguese",
        "Contact Number": "+57 300 123 4567"
      }
    }
  ]);

  const handleEditRole = (roleName: string) => {
    const role = roles.find(r => r.name === roleName);
    if (role) {
      setEditingRole(role);
      setIsAddingRole(true);
    }
  };

  const handleRoleSubmit = (role: StakeholderRole) => {
    if (editingRole) {
      setRoles(roles.map(r => r.name === editingRole.name ? role : r));
      toast.success("Role updated successfully");
    } else {
      if (roles.some(r => r.name.toLowerCase() === role.name.toLowerCase())) {
        toast.error("A role with this name already exists");
        return;
      }
      setRoles([...roles, role]);
      toast.success("Role created successfully");
    }
    setIsAddingRole(false);
    setEditingRole(null);
  };

  const handleAddStakeholder = (data: Record<string, string>) => {
    const prefix = selectedRole === "Girls" ? "GRL" : "TCH";
    const newStakeholder: Stakeholder = {
      id: generateId(prefix),
      role: selectedRole,
      data
    };
    setStakeholders([...stakeholders, newStakeholder]);
    setIsAddingStakeholder(false);
    toast.success(`${selectedRole.slice(0, -1)} added successfully`);
  };

  return (
    <div className="space-y-6">
      {!isAddingRole && !isAddingStakeholder ? (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Stakeholder Management</h3>
            <Button onClick={() => setIsAddingRole(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Define Stakeholder Role
            </Button>
          </div>

          <div className="flex items-center space-x-4 border-b pb-2">
            {roles.map((role) => (
              <Button
                key={role.name}
                variant={selectedRole === role.name ? "default" : "ghost"}
                onClick={() => setSelectedRole(role.name)}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                {role.name}
              </Button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{selectedRole}</h4>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditRole(selectedRole)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Role
              </Button>
              <StakeholderImport 
                role={roles.find(r => r.name === selectedRole)!}
                onImportComplete={() => {
                  // Handle import completion
                }}
              />
              <Button
                onClick={() => setIsAddingStakeholder(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {selectedRole.slice(0, -1)}
              </Button>
            </div>
          </div>

          <StakeholderTable 
            role={roles.find(r => r.name === selectedRole)!}
            stakeholders={stakeholders.filter(s => s.role === selectedRole)}
          />
        </>
      ) : isAddingStakeholder ? (
        <StakeholderForm
          role={roles.find(r => r.name === selectedRole)!}
          onSubmit={handleAddStakeholder}
          onCancel={() => setIsAddingStakeholder(false)}
        />
      ) : (
        <StakeholderRoleForm
          initialRole={editingRole}
          onSubmit={handleRoleSubmit}
          onCancel={() => {
            setIsAddingRole(false);
            setEditingRole(null);
          }}
        />
      )}
    </div>
  );
}