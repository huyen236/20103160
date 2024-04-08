export interface IJobMappingDocument {
  job_id: string;
  status: boolean;
  user_id: string;
  created_by?: string;
  created_at?: number;
  updated_by?: string;
  updated_at?: number;
}
