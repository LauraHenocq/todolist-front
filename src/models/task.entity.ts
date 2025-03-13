export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type TaskEntityProps = {
  id?: string;
  title: string;
  description: string;
  _status: TaskStatus;
};

export type TaskEntityApiProps =  Omit<TaskEntityProps, '_status'> & {
  status: TaskStatus;
};
  
export class TaskEntity {
  public title: string;
  public description: string;
  private _status: TaskStatus;
  public readonly id?: string;

  constructor(props: TaskEntityProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this._status = props._status;
  }

  
  static fromApi(apiProps: TaskEntityApiProps): TaskEntity {
    return new TaskEntity({
      ...apiProps,
      status: apiProps.status
    });
  }

  get status(): TaskStatus {
    return this._status;
  }
  
  setTaskStatus(status: TaskStatus): void {
    this._status = status
  }
}