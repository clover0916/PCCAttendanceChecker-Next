export type RecordType = {
  [key: string]: number | string;
  id: number;
  name: string;
  ip: string;
  seat_num: number;
  status: "online" | "offline";
  reg_type: "pccclient" | "manual";
  created_at: string;
};

export const RecordColumn = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "ip",
    label: "IP",
  },
  {
    key: "seat_num",
    label: "PC No.",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "reg_type",
    label: "REG TYPE",
  },
  {
    key: "created_at",
    label: "CREATED AT",
  },
];
