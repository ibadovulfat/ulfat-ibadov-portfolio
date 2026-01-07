
import React, { useState } from "react";
import { Eye, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { ProjectType } from "./types";

interface ProjectCardProps {
  project: ProjectType;
  setSelectedProject: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, setSelectedProject }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="group overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video w-full bg-muted/30 relative overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center h-full">
              <LayoutGrid className="h-10 w-10 mb-2 text-muted-foreground/50" />
              <span className="text-muted-foreground">{project.category}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="sr-only md:not-sr-only md:inline-block">Preview</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 flex-grow">
        <div className="flex flex-wrap gap-2 justify-between items-start mb-2">
          <CardTitle className="text-lg md:text-xl font-display max-w-[70%] break-words">
            {project.title}
          </CardTitle>
          <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full shrink-0">
            {project.category}
          </span>
        </div>
        <CardDescription className="text-sm text-muted-foreground my-3 line-clamp-2">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 md:px-6 pb-4 md:pb-6 pt-0 mt-auto">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline"
              className="w-full"
            >
              View Details
            </Button>
          </DialogTrigger>
          {project.details && (
            <ProjectDetailsDialog project={project} />
          )}
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
