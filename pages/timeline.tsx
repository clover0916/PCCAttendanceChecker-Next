import Timeline from "@/components/Timeline";
import Navbar from "../components/Navbar";

const Home = () => (
  <div className="h-screen flex flex-col overflow-hidden">
    <Navbar />
    <div
      className="absolute inset-0 flex justify-center items-center z-10 bg-white/20 w-full"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <h1 className="text-6xl font-bold text-white">Coming Soon</h1>
    </div>
    <div>
      <Timeline />
    </div>
  </div>
);

export default Home;
