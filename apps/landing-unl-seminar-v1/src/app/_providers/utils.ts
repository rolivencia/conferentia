export const colorStatusMap: { [key: string]: string } = {
  submitted: 'primary',
  inEvaluation: 'primary',
  accepted: 'success',
  acceptedWithModifications: 'tertiary',
  rejected: 'danger',
  assignedModalityOral: 'success',
  assignedModalityFlashPoster: 'success',
};

export const statusesMap: { [key: string]: string } = {
  submitted: 'Submitted',
  inEvaluation: 'In evaluation',
  accepted: 'Accepted',
  acceptedWithModifications: 'Accepted with modifications',
  rejected: 'Rejected',
  assignedModalityOral: 'Assigned Modality: Oral',
  assignedModalityFlashPoster: 'Assigned Modality: Flash Poster',
}

export const statusesList = [
  { title: 'Submitted', value: 'submitted' },
  { title: 'In Evaluation', value: 'inEvaluation' },
  {
    title: 'Accepted With Modifications',
    value: 'acceptedWithModifications',
  },
  { title: 'Accepted', value: 'accepted' },
  { title: 'Rejected', value: 'rejected' },
  {
    title: 'Assigned modality: Oral presentation',
    value: 'Assigned modality: Oral presentation',
  },
  {
    title: 'Assigned modality: Flash poster',
    value: 'Assigned modality: Flash poster',
  },
];
