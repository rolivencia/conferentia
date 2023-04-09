import {
  IAudit,
  Author,
  ISubjectArea,
  IEvent,
  User,
} from '@conferentia/models';
import { SafeResourceUrl } from "@angular/platform-browser";

export interface Abstract extends IAudit {
  title: string;
  identifier: string;
  authors: Author[];
  subjectArea: ISubjectArea;
  keywords: string[];
  fileUrl: string;
  status: string;
  format: string;
  event: IEvent;
  user: User;
  review?: string;
  posterUrl?: string | SafeResourceUrl;
}

export interface SubmittedAbstractPayload {
  abstract: {
    title: string;
    keywords: string;
    subjectAreaId: string;
    authors: AuthorPayload[];
    file: File;
    format: string;
  };
  eventId: string;
  uploaderUserId: string;
}

export interface SubmittedAbstractRevisionPayload {
  _id: string;
  pdfFile?: File;
  posterUrl?: string;
}

export type AuthorPayload = {
  firstName: string;
  lastName: string;
  institution: string;
};
