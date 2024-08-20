import Navbar from "../components/Navbar";
import AttendList from "../components/AttendLists";
import { basePath } from "@/next.config";
import { NextPageContext } from "next";

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

const Home = ({ seatData }: ISeatDataProps) => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <AttendList seatData={seatData} />
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const params = new URLSearchParams(query as any);
  const date = params.get("date");
  var res;
  if (!date) {
    res = await fetch(`http://localhost:3000${basePath}/api/attend/fetch`);
  } else {
    res = await fetch(
      `http://localhost:3000${basePath}/api/attend/fetch?date=${date}`
    );
  }
  const seatData = await res.json();
  console.log("fetching data...");
  return {
    props: { seatData },
  };
}

export default Home;
