"use client";

import type { TaskType } from "@/types/project";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import DropIndicator from "./DropIndicator";

type Props = {
  task: TaskType;
};

const task_priorities: Record<
  string,
  { background: string; foreground: string }
> = {
  urgent: {
    background: "bg-rose-400",
    foreground: "bg-rose-600",
  },
  high: {
    background: "bg-yellow-400",
    foreground: "bg-yellow-500",
  },
  medium: {
    background: "bg-blue-400",
    foreground: "bg-primary-foreground",
  },
  normal: {
    background: "bg-emerald-400",
    foreground: "bg-success-button",
  },
};

export default function Task({ task }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "task", task_id: task.task_id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),

      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = { type: "task", task_id: task.task_id };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky: () => true,
        onDragEnter(args) {
          if (args.source.data.task_id !== task.task_id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },

        onDrag(args) {
          if (args.source.data.task_id !== task.task_id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },

        onDragLeave: () => {
          setClosestEdge(null);
        },

        onDrop: () => {
          setClosestEdge(null);
        },
      }),
    );
  }, [task]);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative m-2 space-y-3 rounded-2xl bg-task-item-bg p-3",
        {
          "opacity-50": isDragging,
        },
      )}
    >
      {closestEdge === "top" && (
        <DropIndicator edge={closestEdge as "top"} gap="1rem" />
      )}
      <div className="text-white/90">{task.text}</div>
      <div
        className={`flex w-fit items-center gap-1.5 rounded-full bg-opacity-20 px-2 py-1.5 ${
          task_priorities[task.priority].background
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full ${
            task_priorities[task.priority].foreground
          }`}
        ></span>
        <span className="font-inter font-medium capitalize text-white/80">
          {task.priority}
        </span>
      </div>

      <div className="flex justify-end">
        <button type="button" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/60"
          >
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
            <path d="m15 5 3 3" />
          </svg>
        </button>
      </div>

      {closestEdge === "bottom" && (
        <DropIndicator edge={closestEdge as "bottom"} gap="1rem" />
      )}
    </div>
  );
}
