"use client";
import { useRef } from "react";
import Input from "./Input";
import ModalLayout from "./ModalLayout";
import Select from "./Select";

export default function CreateProject() {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (modalRef.current) {
      modalRef.current.style.visibility = "visible";
      modalRef.current.style.opacity = "1";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const projectName = formData.get("projectName") as string;
    const stage = formData.get("stage") as string;
    const date = formData.get("date") as string;
    const priority = formData.get("priority") as string;

    if (projectName && stage && date && priority) {
      console.log("Project created successfully");
      // TODO: Create project
      if (modalRef.current) {
        modalRef.current.style.visibility = "hidden";
        modalRef.current.style.opacity = "0";
      }
    }
  };

  const handleClose = () => {
    console.log(modalRef.current, "Modal ref");
    if (modalRef.current) {
      modalRef.current.style.visibility = "hidden";
      modalRef.current.style.opacity = "0";
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 px-2 py-3">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-md border border-border bg-dashboard-bg px-2 py-1 font-inter font-semibold text-white focus:outline-none"
      />

      <button type="button" onClick={handleOpen} className="button">
        +
      </button>

      <ModalLayout handleClose={handleClose} ref={modalRef}>
        <form className="mt-3" onSubmit={handleSubmit}>
          <Input
            id="projectName"
            label="Project Name"
            placeholder="Enter project name"
            name="projectName"
            required
          />

          <div className="flex w-full items-center justify-between gap-3">
            <Select id="stage" label="Stage" name="stage" required>
              <option value="1">Ready to Start</option>
              <option value="2">In Progress</option>
              <option value="3">Review</option>
              <option value="4">Done</option>
              <option value="5">Stuck</option>
            </Select>

            <Input id="date" label="Date" type="date" name="date" required />
          </div>

          <Select id="priority" label="Priority" name="priority" required>
            <option value="1">Urgent</option>
            <option value="2">High</option>
            <option value="3">Medium</option>
            <option value="4">Low</option>
          </Select>

          <button type="submit" className="button mt-3 w-full p-2">
            Create Task
          </button>
        </form>
      </ModalLayout>
    </div>
  );
}
