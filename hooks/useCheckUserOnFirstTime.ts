import { useConvexAuth } from "convex/react";

export default function useCheckUserOnFirstTime() {
  const { isAuthenticated, isLoading } = useConvexAuth();
}
