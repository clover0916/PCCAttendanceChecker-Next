import { Grid, Input, Loading } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";

const UserSearch = () => {
  const router = useRouter();
  const handleInputChange = (value: string) => {
    console.log(value);
    const queryStr = router.asPath.split("?")[1];
    const params = new URLSearchParams(queryStr);
    var newQueryStr = "";
    if (value) {
      params.set("userSearch", value);
      newQueryStr = "?" + params.toString();
    } else {
      params.delete("userSearch");
    }

    if (params.toString()) newQueryStr = "?" + params.toString();
    router.push(`${router.pathname}${newQueryStr}`);
  };
  return (
    <>
      <Input
        clearable
        color="primary"
        placeholder="User Search"
        onChange={(e) => handleInputChange(e.target.value)}
        contentRight={<IoSearch />}
      />
    </>
  );
};

export default UserSearch;
