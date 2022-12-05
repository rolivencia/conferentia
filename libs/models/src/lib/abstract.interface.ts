import { IAudit, Author, ISubjectArea } from '@conferentia/models';

export interface Abstract extends IAudit {
  title: string;
  authors: Author[];
  subjectArea: ISubjectArea;
  keywords: string;
  fileUrl: string;
  status: string;
}
