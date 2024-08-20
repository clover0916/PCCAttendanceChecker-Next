import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "@nextui-org/react";

const PC_Dropdown = () => {
  const router = useRouter();

  const [selectedPC, setSelectedPC] = React.useState<Set<string>>(new Set([]));

  useEffect(() => {
    const queryStr = router.asPath.split("?")[1];
    const params = new URLSearchParams(queryStr);
    const query = Array.from(selectedPC);
    var newQueryStr = "";
    if (selectedPC.size > 0) {
      params.set("pc", query.join(","));
      newQueryStr = "?" + params.toString();
    } else {
      params.delete("pc");
    }
    if (params.toString()) newQueryStr = "?" + params.toString();
    router.push(`${router.pathname}${newQueryStr}`);
  }, [selectedPC]);

  const selectedValue = React.useMemo<string>(() => {
    const values = Array.from(selectedPC);
    if (values.length > 0) {
      return `PC No.: ${values.join(", ")}`;
    } else {
      return "PC No.";
    }
  }, [selectedPC]);

  const dropdownItems = Array.from({ length: 36 }, (_, i) => (
    <Dropdown.Item key={(i + 1).toString()}>{i + 1}</Dropdown.Item>
  ));

  return (
    <>
      <Dropdown>
        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Multiple selection actions"
          color="secondary"
          selectionMode="multiple"
          selectedKeys={selectedPC}
          // @ts-ignore
          onSelectionChange={setSelectedPC}
          containerCss={{
            height: "50%",
          }}
        >
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PC_Dropdown;
