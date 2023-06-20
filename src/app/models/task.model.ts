
export type Task = {
  lsKeyName:string | undefined;
  name: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  status: string | undefined;
  funcName: string | undefined;
  funcKeyName: string | undefined;
  projectKeyName: string | undefined;
  ownerName?: string | undefined;
  time_added?: Date | undefined;
  execute_time? : number | undefined;
  time_start?: Date | undefined;
  time_end?: Date | undefined;
}
