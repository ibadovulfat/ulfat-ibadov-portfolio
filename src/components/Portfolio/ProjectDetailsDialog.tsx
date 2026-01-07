
import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectType } from "./types";
import { Separator } from "@/components/ui/separator";

interface ProjectDetailsDialogProps {
  project: ProjectType;
}

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({ project }) => {
  const isMobile = useIsMobile();

  return (
    <DialogContent className={cn(
          "sm:max-w-3xl overflow-y-auto",
          isMobile 
            ? "h-[90vh] max-h-[90vh] w-[95vw] p-6 rounded-lg" 
            : "max-h-[85vh] rounded-lg"
        )}>
          <DialogHeader className="space-y-2 relative pr-12">        <div className="flex items-start justify-between gap-2">
          <DialogTitle className="text-xl md:text-2xl font-display break-words pr-2">
            {project.title}
          </DialogTitle>
          <Badge variant="secondary" className="whitespace-nowrap mt-1">
            {project.category}
          </Badge>
        </div>
        <DialogDescription className="text-muted-foreground break-words">
          {project.description}
        </DialogDescription>
      </DialogHeader>
            
            {!isMobile && project.image && (
              <div className="rounded-md overflow-hidden my-4 border border-border">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
            )}
      
            {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <Separator className="my-4" />
      
      {project.category === "Certificates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-muted-foreground">Completion Date</h3>
              <p className="break-words">{project.details?.completionDate}</p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
              <p className="break-words">{project.details?.role}</p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-muted-foreground">Issued By</h3>
              <p className="break-words">{project.details?.issuedBy}</p>
            </div>
            {project.details?.verifyLink && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Verification</h3>
                <a 
                  href={project.details.verifyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all inline-flex items-center gap-1 text-sm"
                >
                  Verify Certificate <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {project.details?.score && (
              <div>
                <h3 className="font-medium mb-1.5">Score</h3>
                <p className="text-muted-foreground text-sm break-words">{project.details.score}</p>
              </div>
            )}
            {project.details?.skills && (
              <div>
                <h3 className="font-medium mb-1.5">Skills</h3>
                <p className="text-muted-foreground text-sm break-words">{project.details.skills}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {project.category === "Labs" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.details?.completionDate && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p className="break-words">{project.details.completionDate}</p>
              </div>
            )}
            {project.details?.role && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                <p className="break-words">{project.details.role}</p>
              </div>
            )}
            {project.details?.verifyLink && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Repository</h3>
                <a
                  href={project.details.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all inline-flex items-center gap-1 text-sm"
                >
                  View on GitHub <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {project.details?.skills && (
              <div>
                <h3 className="font-medium mb-1.5">Skills & Technologies</h3>
                <p className="text-muted-foreground text-sm break-words">{project.details.skills}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {project.category === "Sites" && (
        <div className="space-y-4">
          {project.details?.description && (
            <div>
              <h3 className="font-medium mb-1.5">Project Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed break-words">
                {project.details.description}
              </p>
            </div>
          )}
          
          {project.details?.role && (
            <div>
              <h3 className="font-medium mb-1.5">Role</h3>
              <p className="text-muted-foreground text-sm break-words">{project.details.role}</p>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DialogClose>
        </div>
      )}
    </DialogContent>
  );
};

export default ProjectDetailsDialog;
