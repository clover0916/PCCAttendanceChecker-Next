import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StatusBadge, RegBadge } from "./StyledBadge";
import { basePath } from "@/next.config";
import RecordsControl from "./RecordsControl";
import RecordsTable from "./RecordsTable";

const RecordsBody = () => {
  const pageSize: number = 25;
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    fetch(`${basePath}/api/record/count`)
      .then((res) => res.json())
      .then((data) => {
        setTotalCount(data.count);
      });
  }, []);

  return (
    <>
      <div className="pt-4 pl-4 flex gap-2 items-center justify-between">
        <RecordsControl total={totalPages} />
      </div>
      <div className="z-0 flex-1 min-h-0">
        <RecordsTable pageSize={pageSize} />
      </div>
    </>
  );
};

export default RecordsBody;
