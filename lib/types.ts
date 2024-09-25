export type TaskType = {
	task_id: string;
	text: string;
	priority: string;
	position: number;
	stage_id: string;
};

export type StageType = {
	stage_id: string;
	name: string;
	tasks: TaskType[];
};

export type Board = {
	name: string;
	stages: StageType[];
};
