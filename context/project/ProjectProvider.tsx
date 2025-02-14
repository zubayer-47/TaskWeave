import { ProjectType, StageType, TaskType } from "@/types/project";
import { createContext, useCallback, useContext, useState } from "react";

import data from "@/lib/data.json";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import {
  BaseEventPayload,
  ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";

const ProjectContext = createContext<ProjectType | null>(null);

export const useProject = () => {
  return useContext(ProjectContext);
};

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [stagesData, setStagesData] = useState(data.stages);

  const reorderTask = useCallback(
    ({
      stage_id,
      startIndex,
      finishIndex,
    }: {
      stage_id: string;
      startIndex: number;
      finishIndex: number;
    }): TaskType[] | undefined => {
      const data: StageType[] = JSON.parse(JSON.stringify(stagesData));

      const sourceStageData = data.find(
        (stage: StageType) => stage.stage_id === stage_id,
      );

      if (sourceStageData) {
        const updatedTasks = reorder({
          list: sourceStageData.tasks,
          startIndex,
          finishIndex,
        });

        return updatedTasks;
      }
    },
    [stagesData],
  );

  const moveTask = useCallback(
    ({
      currentStageData,
      movedTaskIndexInSourceStage,
      sourceStageId,
      destinationStageId,
      movedTaskIndexInDestinationStage,
    }: {
      currentStageData: StageType[];
      movedTaskIndexInSourceStage: number;
      sourceStageId: string;
      destinationStageId: string;
      movedTaskIndexInDestinationStage?: number;
    }) => {
      const clonedStagesData = [...currentStageData];

      const sourceStageData = clonedStagesData.find(
        (stage) => stage.stage_id === sourceStageId,
      );

      const destinationStageData = clonedStagesData.find(
        (stage) => stage.stage_id === destinationStageId,
      );

      if (sourceStageData && destinationStageData) {
        const taskToMove = sourceStageData.tasks[movedTaskIndexInSourceStage];

        if (taskToMove) {
          const newSourceStageData = {
            ...sourceStageData,
            tasks: sourceStageData.tasks.filter(
              (task) => task.task_id !== taskToMove.task_id,
            ),
          };

          const newDestinationTasks = Array.from(destinationStageData.tasks);

          const newIndexInDestination =
            movedTaskIndexInDestinationStage ?? newDestinationTasks.length;

          console.log({ newIndexInDestination });

          newDestinationTasks.splice(newIndexInDestination, 0, taskToMove);

          const newDraggedStageData = {
            ...destinationStageData,
            tasks: newDestinationTasks,
          };

          clonedStagesData.splice(
            clonedStagesData.indexOf(sourceStageData),
            1,
            newSourceStageData,
          );
          clonedStagesData.splice(
            clonedStagesData.indexOf(destinationStageData),
            1,
            newDraggedStageData,
          );
        }
      }

      console.log({ clonedStagesData });

      setStagesData(() => clonedStagesData);
    },
    [setStagesData],
  );

  const handleDrop = useCallback(
    ({ location, source }: BaseEventPayload<ElementDragType>) => {
      const data: StageType[] = JSON.parse(JSON.stringify(stagesData));

      const destination = location.current.dropTargets.length;

      console.log({ location, source });

      if (!destination) return;

      if (source.data.type === "task") {
        const draggedTaskId = source.data.task_id;
        const sourceStageId = location.initial.dropTargets[1].data
          .stage_id as string;
        const sourceStageData = data.find(
          (stage: StageType) => stage.stage_id === sourceStageId,
        );

        if (sourceStageData) {
          const draggedTaskIndex = sourceStageData.tasks.findIndex(
            (task: TaskType) => task.task_id === draggedTaskId,
          );
          // console.log(location.current.dropTargets.length);

          if (location.current.dropTargets.length === 1) {
            const destinationStageId = location.current.dropTargets[0].data
              .stage_id as string;

            if (sourceStageId === destinationStageId) {
              // If the task is moving within the same stage, then only sort the task vertically.
              const destinationIndex = getReorderDestinationIndex({
                startIndex: draggedTaskIndex,
                indexOfTarget: sourceStageData.tasks.length - 1, // last index
                closestEdgeOfTarget: null,
                axis: "vertical",
              });

              const reorderedData = reorderTask({
                stage_id: sourceStageData.stage_id,
                startIndex: draggedTaskIndex,
                finishIndex: destinationIndex,
              });

              if (reorderedData) {
                sourceStageData.tasks = reorderedData;
              }
            } else {
              // If the task is moving to a different stage, then move the task to the new stage (horizontally).
              moveTask({
                currentStageData: stagesData,
                sourceStageId,
                destinationStageId,
                movedTaskIndexInSourceStage: draggedTaskIndex,
              });

              return;
            }
          }

          if (location.current.dropTargets.length === 2) {
            const [destinationTask, destinationStage] =
              location.current.dropTargets;
            const destinationStageId = destinationStage.data.stage_id as string;

            const destinationStageData = data.find(
              (stage: StageType) => stage.stage_id === destinationStageId,
            );

            if (destinationStageData) {
              const targetedTaskIndex = destinationStageData.tasks.findIndex(
                (task: TaskType) =>
                  task.task_id === destinationTask.data.task_id,
              );

              if (targetedTaskIndex !== -1) {
                const closestEdgeOfTarget = extractClosestEdge(
                  destinationTask.data,
                );

                if (sourceStageId === destinationStageId) {
                  const destinationIndex = getReorderDestinationIndex({
                    startIndex: draggedTaskIndex,
                    indexOfTarget: targetedTaskIndex,
                    closestEdgeOfTarget,
                    axis: "vertical",
                  });

                  const updatedTasks = reorderTask({
                    stage_id: sourceStageId,
                    startIndex: draggedTaskIndex,
                    finishIndex: destinationIndex,
                  });

                  if (updatedTasks) {
                    destinationStageData.tasks = updatedTasks;
                  }
                } else {
                  const destinationIndex =
                    closestEdgeOfTarget === "bottom"
                      ? targetedTaskIndex + 1
                      : targetedTaskIndex;

                  moveTask({
                    currentStageData: stagesData,
                    movedTaskIndexInSourceStage: draggedTaskIndex,
                    sourceStageId,
                    destinationStageId,
                    movedTaskIndexInDestinationStage: destinationIndex,
                  });

                  return;
                  // }
                }
              }
            }
          }
        }
      }

      // console.log(data, "handleDrop")

      setStagesData(data);
    },
    [stagesData, reorderTask, moveTask],
  );

  return (
    <ProjectContext.Provider value={{ stagesData, handleDrop }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
