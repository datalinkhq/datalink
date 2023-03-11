import { useEffect } from "react";
import type { NextPageWithLayout } from "../../types";
import { useRouter } from "next/router";

const Callback: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const { code, state } = router.query;
  }, [router.query]);

  return (
    <div className="h-screen flex !font-inter">
      <p className="m-auto font-semibold text-2xl">Redirecting...</p>
    </div>
  );
};

export default Callback;
