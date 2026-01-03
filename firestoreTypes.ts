export type ProfileStatus = "Pending" | "Approved" | "Rejected";
export type ArticleStatus = "Draft" | "Needs Review" | "Feedback Received" | "Published";

export type VetProfile = {
  uid: string;
  name: string;
  qualifications: string;
  clinic?: string;
  experience: string; // years as string to keep simple
  licenseNumber?: string;
  photoUrl?: string;
  status: ProfileStatus;
  createdAt?: any;
};

export type Article = {
  title: string;
  slug: string;
  content: string;
  author: string;
  status: ArticleStatus;
  reviewerIds: string[];
  createdAt?: any;
  publishedAt?: any;
  lastReviewedAt?: any;
};

export type Feedback = {
  articleId: string;
  reviewerId: string;
  reviewerName: string;
  comment: string;
  severity?: "minor" | "major" | "critical";
  sectionRef?: string;
  timestamp?: any;
};

export type ReviewSummary = {
  articleId: string;
  summary: string;
  updatedAt?: any;
  editorUid?: string;
};
