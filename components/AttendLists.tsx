import { Input, Tooltip, Text, Loading, Progress } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

type GroupArray = Array<Array<any>>;

interface IAttendance {
  [key: string]: number | string | boolean;
  online: boolean;
  date: string;
  name: string;
}
interface ISeatData {
  result: string;
  data: IAttendance[];
}

interface ISeatDataProps {
  seatData: ISeatData;
}

const AttendLists = ({ seatData }: ISeatDataProps) => {
  const router = useRouter();
  const [attendances, setAttendances] = useState<IAttendance[] | null>(null);
  const [noData, setNoData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [group, setGroup] = useState<GroupArray>([[], [], [], []]);

  const fetchAttendances = async (date: string) => {
    setIsLoading(true);
    if (date) {
      router.push(`${router.pathname}?date=${date}`);
    } else {
      router.push(`${router.pathname}`);
    }
    setInterval(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (seatData.result === "No data") {
      console.log("seatData: ", seatData);
      setNoData(true);
      setIsLoading(false);
      return;
    }
    setAttendances(seatData.data);
    setNoData(false);
    setIsLoading(false);
  }, [seatData]);

  useEffect(() => {
    if (!attendances || noData) return;
    const group0 = [];
    const group1 = [];
    const group2 = [];
    const group3 = [];
    for (let i = 1; i < 38; i++) {
      const seat = attendances[i - 1];
      const online = seat.online;
      const date = seat.date;
      const name = seat.name;
      const sheet = (
        <Tooltip className="w-full" content={"From: " + date} key={i}>
          <div
            className={`sheet grid place-items-center\ ${
              online ? "bg-blue-700" : "bg-zinc-900"
            }`}
          >
            {i} {name ? `(${name})` : ""}
          </div>
        </Tooltip>
      );
      if ((1 <= i && i <= 5) || (10 <= i && i <= 14)) {
        group0.push(sheet);
      } else if ((6 <= i && i <= 9) || (15 <= i && i <= 18)) {
        group1.push(sheet);
      } else if ((19 <= i && i <= 24) || (29 <= i && i <= 33)) {
        group2.push(sheet);
      } else {
        group3.push(sheet);
      }
    }
    setGroup([group0, group1, group2, group3]);
  }, [attendances]);

  return (
    <>
      <div className="relative flex-1 flex flex-col">
        <div
          style={{
            animation: `${
              isLoading ? "fadeIn" : "fadeOut"
            } 500ms ease-in-out forwards`,
          }}
        >
          <Progress
            indeterminated
            value={50}
            size="xs"
            className="w-full absolute top-0 left-0 z-50 rounded-none"
          />
        </div>
        <div className="flex justify-end p-4">
          <Input
            label="timemachine"
            type="datetime-local"
            onChange={(e) => fetchAttendances(e.target.value)}
          />
        </div>
        {noData ? (
          <div className="flex-1 grid place-items-center">
            <Text h2>No data</Text>
          </div>
        ) : (
          <div className="flex-1 p-16 grid grid-cols-2 grid-rows-2 grid-flow-col rtl gap-8 pt-0">
            <div
              id="group0"
              className="grid grid-rows-5 grid-cols-2 gap-4 grid-flow-col rtl"
            >
              {group[0]}
            </div>
            <div
              id="group1"
              className="grid grid-rows-4 grid-cols-2 gap-4 grid-flow-col rtl"
            >
              {group[1]}
            </div>
            <div
              id="group2"
              className="grid grid-rows-6 grid-cols-2 gap-4 grid-flow-col rtl"
            >
              {group[2]}
            </div>
            <div
              id="group3"
              className="grid grid-rows-4 grid-cols-2 gap-4 grid-flow-col rtl"
            >
              {group[3]}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendLists;
