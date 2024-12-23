"use client";
import { useRef } from "react";
import Input from "./Input";
import ModalLayout from "./ModalLayout";

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

    if (projectName) {
      console.log("Project created successfully");

      console.log(modalRef.current, "Modal ref");

      formData.set("projectName", "zubayer");
      console.log(formData.get("projectName"));
      // TODO: Create project
      // if (modalRef.current) {
      //   modalRef.current.style.visibility = "hidden";
      //   modalRef.current.style.opacity = "0";
      // }
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
        <form onSubmit={handleSubmit}>
          <Input
            id="projectName"
            label="Project Name"
            placeholder="Enter project name"
            name="projectName"
            required
          />

          <button type="submit" className="button mt-3 w-full p-2">
            Create Task
          </button>
        </form>
      </ModalLayout>
    </div>
  );
}
