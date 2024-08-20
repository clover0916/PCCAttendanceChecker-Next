import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { IoIosWarning } from "react-icons/io";

const OldWarning = () => {
  const router = useRouter();
  const [Old, setOld] = useState<boolean>(false);
  function refresh() {
    router.reload();
  }

  useEffect(() => {
    setTimeout(() => {
      setOld(true);
    }, 60000);
  }, []);
  return (
    <div
      className={`${
        Old ? "" : "opacity-0"
      } duration-200 bottom-0 fixed bg-orange-500 w-screen z-10 h-14 shadow-lg shadow-orange-500/40`}
    >
      <div className={`inline-flex justify-between items-center h-full w-full`}>
        <div className="inline-flex items-center">
          <div className="w-8 grid place-items-center p-1 bg-orange-400 rounded-md ml-2">
            <IoIosWarning className="h-full w-full" />
          </div>
          <span className="ml-2 text-lg font-semibold">
            This data is old. You should refresh this page.
          </span>
        </div>
        <div className="mr-2">
          <Button color="error" auto onPress={refresh}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OldWarning;
