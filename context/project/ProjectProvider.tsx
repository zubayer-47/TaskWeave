import { createContext, useCallback, useContext, useState } from "react";
import { ProjectType, StageType, TaskType } from "@/types/project";

import { BaseEventPayload, ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'
import data from "@/lib/data.json";

const ProjectContext = createContext<ProjectType | null>(null);

export const useProject = () => {
	return useContext(ProjectContext);
};

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [stagesData, setStagesData] = useState(data.stages);

	const reorderTask = useCallback(({ stage_id, startIndex, finishIndex }: { stage_id: string, startIndex: number, finishIndex: number }) => {
		const data: StageType[] = JSON.parse(JSON.stringify(stagesData));

		const sourceStageData = data.find((stage: StageType) => stage.stage_id === stage_id);

		if (sourceStageData) {
			const updatedTasks = reorder({
				list: sourceStageData.tasks,
				startIndex,
				finishIndex,
			})
			console.log("updatedTasks", updatedTasks);

			sourceStageData.tasks = updatedTasks;
		}

		setStagesData(data);
	}, [stagesData])

	const handleDrop = useCallback(({ location, source }: BaseEventPayload<ElementDragType>) => {
		const data: StageType[] = JSON.parse(JSON.stringify(stagesData));

		const destination = location.current.dropTargets.length

		if (!destination) return;

		if (source.data.type === 'task') {
			const draggedTaskId = source.data.task_id;
			const sourceStageId = location.initial.dropTargets[1].data.stage_id as string;
			const sourceStageData = data.find((stage: StageType) => stage.stage_id === sourceStageId);

			if (sourceStageData) {
				const draggedTaskIndex = sourceStageData.tasks.findIndex((task: TaskType) => task.task_id === draggedTaskId);

				if (location.current.dropTargets.length === 1) {
					const destinationStageId = location.current.dropTargets[0].data.stage_id as string;

					if (sourceStageId === destinationStageId) {
						const destinationIndex = getReorderDestinationIndex({
							startIndex: draggedTaskIndex,
							indexOfTarget: sourceStageData.tasks.length - 1,
							closestEdgeOfTarget: null,
							axis: "vertical"
						})

						reorderTask({
							stage_id: sourceStageData.stage_id,
							startIndex: draggedTaskIndex,
							finishIndex: destinationIndex,
						});
					}
				}

				if (location.current.dropTargets.length === 2) {
					console.log(
						"dropTargets2",
						location.current.dropTargets,
						location.current.dropTargets.length
					);
				}
			}
		}

		setStagesData(data);
	}, [stagesData, reorderTask])

	return <ProjectContext.Provider value={{ stagesData, handleDrop }}>{children}</ProjectContext.Provider>;
};

export default ProjectProvider;