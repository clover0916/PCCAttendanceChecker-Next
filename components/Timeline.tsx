import { Text } from "@nextui-org/react";

const Timeline = () => {
  const lines = [];
  for (let i = 0; i < 37; i++) {
    const child = (
      <tr
        key={i}
        className="h-6 border-x-0 border-y border-gray-700 border-solid"
      >
        <th className="bg-gray-900 w-20 text-right">
          <Text className="pr-4">{i + 1}</Text>
        </th>
        <td className="h-full">
          <div className="h-full">
            <div
              className="grid h-full"
              style={{
                gridTemplateColumns: "repeat(48, minmax(0, 1fr))",
              }}
            >
              {Array.from(Array(48).keys()).map((j) => (
                <div
                  key={j}
                  className="border-x border-y-0 border-gray-700 border-solid h-full w-full"
                ></div>
              ))}
            </div>
          </div>
        </td>
      </tr>
    );
    lines.push(child);
  }
  return (
    <div>
      <table className="w-full">
        <tbody>{lines}</tbody>
      </table>
    </div>
  );
};

export default Timeline;
