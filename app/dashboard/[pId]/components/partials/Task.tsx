"use client";

import type { ProjectType, TaskType } from "@/types/project";
import { useEffect, useRef, useState } from "react";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { useProject } from "@/context/project/ProjectProvider";

type Props = {
	task: TaskType;
};

const task_priorities: Record<string, { background: string; foreground: string }> = {
	urgent: {
		background: 'bg-rose-400',
		foreground: 'bg-rose-600',
	},
	high: {
		background: 'bg-yellow-400',
		foreground: 'bg-yellow-500',
	},
	medium: {
		background: 'bg-blue-400',
		foreground: 'bg-primary-foreground',
	},
	normal: {
		background: 'bg-emerald-400',
		foreground: 'bg-success-button',
	},
};

export default function Task({ task }: Props) {
	const [isDragging, setIsDragging] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { moveTask } = useProject() as ProjectType;

	useEffect(() => {
		const el = ref.current;

		if (!el) return;

		return combine(
			draggable({
				element: el,
				getInitialData: () => task,
				onDragStart: () => setIsDragging(true),
				onDrop: () => setIsDragging(false),
			}),

			dropTargetForElements({
				element: el,
				getData: () => task,
				onDrop: ({ source, self }) => {

					console.log(source.data, self.data)

					moveTask(source.data.task_id as string, self.data.stage_id as string, source.data.stage_id as string, self.data.position as number);
				}
			})
		)
	}, [task, moveTask]);

	return (
		<div
			ref={ref}
			className={`m-2 p-3 rounded-2xl bg-task-item-bg space-y-3 relative ${isDragging ? 'opacity-50 rotate-6' : ''}`}
			key={task.task_id}
		>
			<div className='text-white/90'>{task.text}</div>
			<div
				className={`flex items-center gap-1.5 bg-opacity-20 w-fit px-2 py-1.5 rounded-full ${task_priorities[task.priority].background
					}`}
			>
				<span
					className={`h-5 w-5 rounded-full inline-block ${task_priorities[task.priority].foreground
						}`}
				></span>
				<span className='text-white/80 font-inter font-medium capitalize'>
					{task.priority}
				</span>
			</div>

			<div className='flex justify-end'>
				<button type='button' className=''>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-white/60'
					>
						<path d='M12 20h9' />
						<path d='M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z' />
						<path d='m15 5 3 3' />
					</svg>
				</button>
			</div>
		</div>
	);
}
