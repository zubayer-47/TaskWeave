"use client";

import { useProject } from "@/context/project/ProjectProvider";
import { ProjectType } from "@/types/project";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useEffect } from "react";
import CreateTaskButton from "./components/CreateTaskButton";
import TaskStage from "./components/TaskStage";

function Project() {
  const { stagesData, handleDrop } = useProject() as ProjectType;
  // const pathname = usePathname();
  // const isOpen = !!pathname.endsWith("/opweave");

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [stagesData, handleDrop]);

  return (
    <div className="h-full w-full rounded-3xl bg-dark pt-3">
      <h1 className="px-4 pb-3 font-adlam-display text-xl text-white">
        OpWeave
      </h1>
      <hr className="border-b border-border" />
      <CreateTaskButton />

      <div
        className={clsx(
          "flex w-full items-center gap-4 overflow-x-auto px-4 pb-1 scrollbar-thin scrollbar-track-dark scrollbar-thumb-border",
          "dashboard-content-height",
        )}
      >
        {stagesData.map((stage) => (
          <TaskStage key={stage.stage_id} {...stage} />
        ))}
      </div>
    </div>
  );
}

export default Project;
