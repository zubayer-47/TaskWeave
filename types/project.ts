import { BaseEventPayload, ElementDragType } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";

export type TaskType = {
	task_id: string;
	text: string;
	position: number;
	priority: string;
	stage_id: string;
};

export type StageType = {
	stage_id: string;
	name: string;
	tasks: TaskType[];
};

export type ProjectType = {
	stagesData: StageType[];
	handleDrop: (args: BaseEventPayload<ElementDragType>) => void,
};
