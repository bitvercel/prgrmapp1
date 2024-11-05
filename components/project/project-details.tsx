"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StakeholderManagement } from "./stakeholder/stakeholder-management";
import { FormBuilder } from "./forms/form-builder";
import { Project } from "@/types/stakeholder";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl px-4">
      <div className="flex items-center space-x-2">
        <Link 
          href="/projects" 
          className="text-sm text-muted-foreground hover:text-foreground flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>

      <Tabs defaultValue="stakeholders" className="w-full space-y-6">
        <div className="border-b">
          <div className="container max-w-6xl px-4">
            <TabsList className="h-12 w-full justify-start gap-6 bg-transparent p-0">
              <TabsTrigger 
                value="stakeholders" 
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Stakeholders
              </TabsTrigger>
              <TabsTrigger 
                value="forms" 
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Forms
              </TabsTrigger>
              <TabsTrigger 
                value="sources" 
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Sources
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Analysis
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="stakeholders">
          <StakeholderManagement />
        </TabsContent>

        <TabsContent value="forms">
          <FormBuilder />
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Sources</CardTitle>
              <CardDescription>Manage your project data sources</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Analysis</CardTitle>
              <CardDescription>View project analytics and insights</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}