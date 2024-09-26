
export type TaskType = {
	task_id: string;
	text: string;
	priority: string;
	stage_id: string;
};

export type StageType = {
	stage_id: string;
	name: string;
	tasks: TaskType[];
};

export type ProjectType = {
	name: string;
	stages: StageType[];
	moveTask: (task_id: string, stage_id: string, prev_stage_id: string, position: number) => void;
};
