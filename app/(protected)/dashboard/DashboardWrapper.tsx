"use client";

import Navbar from "@/components/Navbar";
import {Sidebar} from "@/components/sidebar/Sidebar";
import { ModalProvider } from "@/context/modal/Provider";
import ProjectProvider from "@/context/project/ProjectProvider";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  // const { isSignedIn, user } = useUser();
  // console.log({ user, isSignedIn }, "DashboardWrapper");
  // const { isAuthenticated } = useConvexAuth();
  // const { isSignedIn } = useAuth();
  // const storeUser = useMutation(api.users.store);

  // useEffect(() => {
  //   if (!isAuthenticated) return;
  //   console.log("first");
  //   (async () => {
  //     console.log("fetching");
  //     const res = await storeUser();

  //     console.log(res, "res");
  //   })();
  // }, [isAuthenticated, storeUser]);

  // useStoreUserEffect();

  return (
    <ProjectProvider>
      <ModalProvider>
        <div className="flex min-h-screen bg-dark">
          <Sidebar />

          <div className="flex w-full flex-col md:pl-64">
            <Navbar />

            {children}
          </div>
        </div>
      </ModalProvider>
    </ProjectProvider>
  );
}
// const DashboardWrapper = privateWrapperHOC(DashboardWrapperComponent);

export default DashboardWrapper;
