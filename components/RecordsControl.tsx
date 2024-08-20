import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import AddRecord from "./AddRecord";
import DatePicker from "./DatePicker";
import PC_Dropdown from "./PC_Dropdown";
import UserSearch from "./UserSearch";

type Props = {
  total: number;
};

const RecordsControl = ({ total }: Props) => {
  const router = useRouter();
  function refetchRecords(page: number) {
    const queryStr = router.asPath.split("?")[1];
    const params = new URLSearchParams(queryStr);
    params.set("page", page.toString());
    const newQueryStr = params.toString();
    router.push(`${router.pathname}?${newQueryStr}`);
  }

  return (
    <>
      <Pagination
        total={total}
        page={parseInt(router.query.page as string) || 1}
        onChange={refetchRecords}
      />
      <PC_Dropdown />
      <DatePicker />
      <UserSearch />
      <div className="ml-auto pr-4">
        <AddRecord />
      </div>
    </>
  );
};

export default RecordsControl;
