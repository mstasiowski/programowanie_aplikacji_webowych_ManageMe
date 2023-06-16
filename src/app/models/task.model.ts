
export type Task = {
  localStorageName:string | undefined;
  name: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  status: string | undefined;
  execute_time : number | undefined;
  time_added: Date | undefined;
  time_start?: Date | undefined;
  time_end?: Date | undefined;
  ownerName: string | undefined;
  functionalityName: string | undefined;
}
