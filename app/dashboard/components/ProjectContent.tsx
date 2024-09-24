const ProjectContent = () => {
  return (
    <div className="col-span-10 bg-dashboard-bg rounded-3xl h-full pb-2 pt-3">
      <h1 className="px-4 pb-3 text-white text-xl font-adlam-display">
        OpWeave
      </h1>
      <hr className="border-b border-border" />
      <button
        type="button"
        className="bg-success-button hover:bg-success-button/80 transition-colors p-2 rounded-md mx-4 mt-3 text-white font-inter font-semibold"
      >
        Create Task
      </button>

      <div className="flex items-center gap-4 px-4 pt-2 pb-2 dashboard-content-height w-full overflow-x-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border">
        <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
          <div className="bg-primary-foreground py-2 text-center font-inter font-semibold text-white">
            Ready to Start
          </div>

          <div className="m-2 px-3 py-2 rounded-2xl bg-task-item-bg space-y-3 relative">
            <div className="text-white/90">Some Test Text</div>
            <div className="flex items-center gap-1.5 bg-[#F87171] bg-opacity-20 w-fit px-3 rounded-full py-1">
              <span className="h-5 w-5 bg-rose-600 rounded-full inline-block"></span>
              <span className="text-white/80 font-inter font-medium">
                Urgent
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
          </div>

          <div className="m-2 px-3 py-2 rounded-2xl bg-task-item-bg space-y-3 relative">
            <div className="text-white/90">Some Test Text</div>
            <div className="flex items-center gap-1.5 bg-[#F87171] bg-opacity-20 w-fit px-3 rounded-full py-1">
              <span className="h-5 w-5 bg-rose-600 rounded-full inline-block"></span>
              <span className="text-white/80 font-inter font-medium">
                Urgent
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
          </div>
        </div>
        <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
          {/* <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden"> */}
          <div className="bg-task-stage-warning py-2 text-center font-inter font-semibold text-white">
            In Progress
          </div>
          {/*  </div> */}
        </div>
        <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
          {/* <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden"> */}
          <div className="bg-task-stage-slate py-2 text-center font-inter font-semibold text-white">
            Review
          </div>
          {/*  </div> */}
        </div>
        <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
          {/* <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden"> */}
          <div className="bg-success-button py-2 text-center font-inter font-semibold text-white">
            Done
          </div>
          {/*  </div> */}
        </div>
        <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
          {/* <div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden"> */}
          <div className="bg-rose-500 py-2 text-center font-inter font-semibold text-white">
            Stuck
          </div>
          {/*  </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
