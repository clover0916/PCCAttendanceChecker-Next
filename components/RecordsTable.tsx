import { basePath } from "@/next.config";
import { Table, Text, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RegBadge, StatusBadge } from "./StyledBadge";
import { RecordType, RecordColumn } from "./RecordType";

type Props = {
  pageSize: number;
};

const RecordsTable = ({ pageSize }: Props) => {
  const router = useRouter();
  const [records, setRecords] = useState<RecordType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!router.asPath) return;
    const queryStr = router.asPath.split("?")[1];
    const params = new URLSearchParams(queryStr);
    const currentPageString = params.get("page") ?? "1";
    const pcString = params.get("pc");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const userSearch = params.get("userSearch");

    console.log("RecordsTable: ", {
      pageSize: pageSize.toString(),
      currentPage: currentPageString,
      pc: pcString,
      startDate: startDate,
      endDate: endDate,
      userSearch: userSearch,
    });

    const query = new URLSearchParams();

    query.set("pageSize", pageSize.toString());
    query.set("currentPage", currentPageString);
    if (pcString) query.set("pc", pcString);
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);
    if (userSearch) query.set("userSearch", userSearch);

    const fetchCountAndRecords = async () => {
      const resRecords = await fetch(`${basePath}/api/record/fetch?${query}`);
      console.log("resRecords: ", resRecords);
      if (resRecords.ok) {
        const recordsData: RecordType[] = await resRecords.json();
        setRecords(
          recordsData.map((data) => ({
            id: data.id,
            name: data.name,
            ip: data.ip,
            seat_num: data.seat_num,
            status: data.status,
            reg_type: data.reg_type,
            created_at: data.created_at,
          }))
        );
      } else {
        setIsError(true);
        console.error("Error fetching records:", resRecords.statusText);
      }
    };
    fetchCountAndRecords();
  }, [router.asPath]);

  const renderCell = (user: RecordType, columnKey: React.Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "status":
        return <StatusBadge type={user?.status}>{cellValue}</StatusBadge>;

      case "reg_type":
        return <RegBadge type={user?.reg_type}>{cellValue}</RegBadge>;
      default:
        return cellValue;
    }
  };

  return (
    <>
      {!isError ? (
        <>
          {records.length > 0 ? (
            <Table
              fixed
              className="overflow-auto"
              aria-label="Attend Records"
              containerCss={{
                display: "block",
                height: "100%",
                overflowY: "scroll",
              }}
              css={{
                maxHeight: "100%",
                minWidth: "100%",
                overflowY: "scroll",
              }}
            >
              <Table.Header columns={RecordColumn}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              <Table.Body items={records}>
                {(item) => (
                  <Table.Row key={item.id}>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          ) : (
            <div className="flex justify-center items-center h-full">
              <Text h2>No Data</Text>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Text h2 color="error">
            Error
          </Text>
        </div>
      )}
    </>
  );
};

export default RecordsTable;
