"use client";

import { useState, useRef, useEffect } from "react";
import Task from "./Task";
import type { StageType } from "@/types/project";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";


type Props = StageType

const task_header_bgs: Record<string, string> = {
	'Ready to Start': 'bg-primary-foreground',
	'In Progress': 'bg-task-stage-warning',
	'Completed': 'bg-success-button',
	'Review': 'bg-task-stage-slate',
	"Stuck": 'bg-rose-500',
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
				setIsDragging(false)
				// console.log(name, tasks)
			},

			getData: () => ({ stage_id }),
		});
	}, [stage_id, name, tasks]);

	return (
		<div className='bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full'>
			<div
				className={`py-2 text-center font-inter font-semibold text-white ${task_header_bgs[name]}`}
			>
				{name}
				<span className={`${tasks?.length ? 'inline-block' : 'hidden'}`}>
					- {tasks?.length || ''}
				</span>
			</div>

			<div className={`h-full pb-10 overflow-y-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border ${isDragging ? 'bg-primary-foreground/50' : ''}`} ref={ref}>
				{!tasks?.length ? (
					<h1 className='p-3 text-gray-600 text-center font-adlam-display'>
						No Task Exist
					</h1>
				) : (
					tasks.map((task) => <Task key={task.task_id} task={task} />)
				)}
			</div>
		</div>
	);
}
