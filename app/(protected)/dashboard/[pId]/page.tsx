"use client";
import { useProject } from "@/context/project/ProjectProvider";
import { ProjectType } from "@/types/project";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useEffect } from "react";
import CreateTask from "./components/CreateTask";
import TaskStage from "./components/TaskStage";

function Project() {
  const { stagesData, handleDrop } = useProject() as ProjectType;

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [stagesData, handleDrop]);

  console.log("Project re-rendering");

  return (
    <div className="h-full w-full rounded-3xl bg-dark">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="py-3 font-adlam-display text-xl text-white">OpWeave</h1>

        <time
          className="text-muted font-noto-sans text-sm tracking-wide"
          dateTime="2023-04-01"
        >
          <span className="font-noto-sans font-medium">Created At:</span>{" "}
          2023-04-01
        </time>
      </div>
      <hr className="border-b border-border" />
      <CreateTask />

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
