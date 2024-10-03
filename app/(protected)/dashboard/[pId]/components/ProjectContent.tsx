"use client"

import { ProjectType } from '@/types/project';
import TaskStage from './partials/TaskStage';
import { useProject } from '@/context/project/ProjectProvider';
import { useEffect } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
// import app from '@/lib/firebase/config';
// import { collection, getDocs, getFirestore } from 'firebase/firestore';

const ProjectContent = () => {
	const { stagesData, handleDrop } = useProject() as ProjectType;
	// const [projectData, setProjectData] = useState<ProjectType | null>(null)
	
	// useEffect(() => {
	// 	const getData = async () => {
	// 		const fireStore = getFirestore(app)
	// 		// const docRef = doc(fireStore, 'projects', 'test')

	// 		const collectionRef = collection(fireStore, 'projects')
	// 		const querySnapshot = await getDocs(collectionRef);
	// 		// querySnapshot.forEach((doc) => {
	// 		// 	console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
	// 		// });

	// 		console.log(querySnapshot.docs[1].id)

	// 		// const docSnap = await getDoc(docRef)
	// 		// console.log({ docRef, docSnap })
	// 		// if (docSnap.exists()) {
	// 		// 	// setProjectData(docSnap.data() as ProjectType)

	// 		// 	console.log(docSnap.data())
	// 		// } else {
	// 		// 	console.log('No such document!')
	// 		// }
	// 	}

	// 	getData()
	// }, [])

	useEffect(() => {
		return monitorForElements({
			onDrop: handleDrop,
		})
	}, [stagesData, handleDrop])

	return (
		<div className='col-span-10 bg-dashboard-bg rounded-3xl h-full pb-1 pt-3'>
			<h1 className='px-4 pb-3 text-white text-xl font-adlam-display'>
				OpWeave
			</h1>
			<hr className='border-b border-border' />
			<button
				type='button'
				className='bg-success-button hover:bg-success-button/80 transition-colors p-2 rounded-md mx-4 my-2 text-white font-inter font-semibold'
			>
				Create Task
			</button>

			<div className='flex items-center gap-4 px-4 pb-1 dashboard-content-height w-full overflow-x-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border'>
				{stagesData.map(stage => (
					<TaskStage
						key={stage.stage_id}
						{...stage}
					/>
				))}

			</div>
		</div>
	);
};

export default ProjectContent;

/**
 * Ready to start
 * In progress
 * Review
 * Done
 * Stuck
 */
