"use client"
import useAuth from "@/hooks/useAuth"
import { db } from "@/lib/firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"

export default function CreateProject() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const projectName = formData.get('projectName')

        if (projectName) {
            const docData = {
                name: projectName,
                stages: [
                    {
                        stage_id: '1',
                        stage_name: 'Ready to Start',
                        tasks: []
                    },
                    {
                        stage_id: '2',
                        stage_name: 'In Progress',
                        tasks: []
                    },
                    {
                        stage_id: '3',
                        stage_name: 'Review',
                        tasks: []
                    },
                    {
                        stage_id: '4',
                        stage_name: 'Done',
                        tasks: []
                    },
                    {
                        stage_id: '5',
                        stage_name: 'Stuck',
                        tasks: []
                    }
                ]
            }

            try {
                const docRef = doc(db, 'projects', projectName as string + '@' + user!.uid)
                await setDoc(docRef, docData)
            } catch (error) {
                console.error(error)
            }

            console.log('Project created successfully')
        }
    }

    return (
        <div className='flex justify-between items-center gap-3 px-2 py-3 w-full'>
            <input
                type="text"
                placeholder='Search'
                className='bg-dashboard-bg border border-border rounded-md px-2 py-1 text-white font-inter font-semibold focus:outline-none w-full'
            />

            <button
                type="button"
                onClick={handleOpen}
                className='button'>
                +
            </button>

            {isOpen && (
                <div className="absolute inset-0 w-full h-full z-50">
                    <button type="button" onClick={handleClose} className="absolute inset-0 w-full h-full bg-black/50"></button>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dashboard-bg p-4 rounded-md w-[400px]">
                        <h2 className="text-lg text-center border-b border-border pb-2 font-semibold text-white">Create New Project</h2>
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="mb-2 space-y-2">
                                <label htmlFor="projectName" className="block text-gray-300 text-sm font-inter font-medium">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    className="w-full px-2 py-1 bg-transparent border border-border rounded-md focus:outline-none text-gray-300 font-inter font-normal"
                                    placeholder="Enter project name"
                                />
                            </div>
                            <button type="submit" className="button mt-1">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
