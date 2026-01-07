
export interface ProjectDetails {
  completionDate?: string;
  role?: string;
  issuedBy?: string;
  verifyLink?: string;
  score?: string;
  skills?: string;
  description?: string;
  tools?: string[];
}

export interface ProjectType {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  details?: ProjectDetails;
}
