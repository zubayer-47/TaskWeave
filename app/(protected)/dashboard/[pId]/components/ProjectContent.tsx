"use client";

import { useProject } from "@/context/project/ProjectProvider";
import { ProjectType } from "@/types/project";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";
import CreateTaskButton from "./CreateTaskButton";
import TaskStage from "./TaskStage";
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
    });
  }, [stagesData, handleDrop]);

  return (
    <div className="col-span-10 h-full rounded-3xl bg-dashboard-bg pb-1 pt-3">
      <h1 className="px-4 pb-3 font-adlam-display text-xl text-white">
        OpWeave
      </h1>
      <hr className="border-b border-border" />
      <CreateTaskButton />

      <div className="dashboard-content-height flex w-full items-center gap-4 overflow-x-auto px-4 pb-1 scrollbar-thin scrollbar-track-dark scrollbar-thumb-border">
        {stagesData.map((stage) => (
          <TaskStage key={stage.stage_id} {...stage} />
        ))}
      </div>
    </div>
  );
};

export default ProjectContent;
