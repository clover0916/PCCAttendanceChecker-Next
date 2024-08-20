import { Navbar, Text } from "@nextui-org/react";

const navbar = () => {
  return (
    <Navbar isBordered variant="sticky" maxWidth="fluid">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          PCCAttendanceChecker-Next
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/timeline">Timeline</Navbar.Link>
        <Navbar.Link href="/records">Records</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};

export default navbar;
