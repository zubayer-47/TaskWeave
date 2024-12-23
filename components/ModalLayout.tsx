import { CircleX } from "lucide-react";
import React, { forwardRef } from "react";

type Props = { children: React.ReactNode; handleClose: () => void };

type Ref = HTMLDivElement;

const ModalLayout = forwardRef<Ref, Props>(({ children, handleClose }, ref) => {
  return (
    <div
      ref={ref}
      className="invisible fixed inset-0 z-50 grid h-full w-full place-content-center bg-slate-900/30 bg-opacity-70 opacity-0 backdrop-blur-[2px] transition-all duration-200"
    >
      <div className="mx-2">
        <div className="w-full rounded-md bg-slate-100 md:w-[350px]">
          <div className="flex items-center justify-between border-b border-slate-300 p-4">
            <h2 className="text-base font-semibold">Create New Project</h2>

            <CircleX
              onClick={handleClose}
              className="h-6 w-6 cursor-pointer text-rose-500 transition-all duration-200 hover:fill-rose-500 hover:text-slate-100"
            />
          </div>

          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
});

ModalLayout.displayName = "ModalLayout";

export default ModalLayout;
