"use client";

import type { StageType } from "@/types/project";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Task from "./Task";

type Props = StageType;

const task_header_bgs: Record<string, string> = {
  "Ready to Start": "bg-primary-foreground",
  "In Progress": "bg-task-stage-warning",
  Done: "bg-success-button",
  Review: "bg-task-stage-slate",
  Stuck: "bg-rose-500",
};

export default function TaskStage({ name, stage_id, tasks }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      onDragStart: () => setIsDragging(true),
      onDragEnter: () => setIsDragging(true),
      onDragLeave: () => setIsDragging(false),
      onDrop: () => {
        setIsDragging(false);
        // console.log(name, tasks)
      },

      getData: () => ({ stage_id }),
    });
  }, [stage_id, name, tasks]);

  return (
    <div className="h-full w-full min-w-64 overflow-hidden rounded-3xl bg-task-stage-bg pb-10">
      <div
        className={clsx(
          "py-2 text-center font-inter font-semibold text-white",
          task_header_bgs[name],
        )}
      >
        {name}
        <span
          className={clsx({
            hidden: !tasks?.length,
          })}
        >
          - {tasks?.length || ""}
        </span>
      </div>

      <div
        className={clsx(
          "h-full overflow-y-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border",
          {
            "bg-primary-foreground/50": isDragging,
          },
        )}
        ref={ref}
      >
        {!tasks?.length ? (
          <h1 className="p-3 text-center font-adlam-display text-gray-600">
            No Task Exist
          </h1>
        ) : (
          tasks.map((task) => <Task key={task.task_id} task={task} />)
        )}
      </div>
    </div>
  );
}
