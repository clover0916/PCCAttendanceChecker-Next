import { basePath } from "@/next.config";
import {
  Button,
  Dropdown,
  Grid,
  Input,
  Loading,
  Popover,
  Text,
} from "@nextui-org/react";
import React, { useState, useMemo, use } from "react";
import { MdAdd, MdDone } from "react-icons/md";

interface DateRange {
  name?: string;
  ip?: string;
  date?: string;
  time?: string;
}

const AddRecord = () => {
  const [selected, setSelected] = useState(new Set(["Select"]));
  const [selectedPC, setSelectedPC] = useState(new Set(["Select"]));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<DateRange>({});
  const [inputError, setInputError] = useState<string>("");
  const [buttonState, setButtonState] = useState("Default");

  const selectedValue = useMemo(
    () =>
      selected.size > 0
        ? Array.from(selected).join(", ").replaceAll("_", " ")
        : "Select",
    [selected]
  );

  const selectedPCValue = useMemo(
    () =>
      selectedPC.size > 0
        ? Array.from(selectedPC).join(", ").replaceAll("_", " ")
        : "Select",
    [selectedPC]
  );

  const dropdownItems = Array.from({ length: 36 }, (_, i) => (
    <Dropdown.Item key={(i + 1).toString()}>{i + 1}</Dropdown.Item>
  ));

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.ip ||
      !form.date ||
      !form.time ||
      selected.has("Select") ||
      selectedPC.has("Select")
    ) {
      setInputError("Please fill out all fields.");
      return;
    }

    const isIPValid =
      /^([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/;

    if (!isIPValid.test(form.ip)) {
      setInputError("IP address is invalid.");
      return;
    }

    const sendBody = {
      name: form.name,
      ip: form.ip,
      date: form.date,
      time: form.time,
      pc: selectedPCValue.toLowerCase(),
      status: selectedValue.toLowerCase(),
      reg_type: "manual",
    };

    setForm({});
    setIsOpen(false);
    AddLoading(sendBody);
  };

  const handleInputChange = (field: keyof DateRange, value: string) => {
    setInputError("");
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(form);
  };

  const AddLoading = (sendBody: any) => {
    setButtonState("Loading");
    var path: string;
    if (basePath == undefined) {
      path = "";
    } else {
      path = basePath;
    }
    fetch(`${path}/api/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            setButtonState("Done");
          }, 2000);
          setTimeout(() => {
            setButtonState("Default");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const LoadingCircle = (
    <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
      <Loading color="currentColor" size="sm" />
    </Button>
  );

  const DefaultButton = (
    <Button auto color="primary" iconRight={<MdAdd className="text-xl" />}>
      Add
    </Button>
  );

  const DoneButton = (
    <Button
      auto
      color="success"
      iconRight={<MdDone className="text-xl" fill="currentColor" />}
    >
      Done
    </Button>
  );

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="left-top">
      <Popover.Trigger>
        {buttonState === "Loading"
          ? LoadingCircle
          : buttonState === "Done"
          ? DoneButton
          : DefaultButton}
      </Popover.Trigger>
      <Popover.Content
        css={{
          padding: "1.5rem",
        }}
      >
        <Grid.Container
          css={{
            borderRadius: "16px",
            maxWidth: "500px",
            animation: inputError
              ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
              : "none",
          }}
        >
          <Grid className="grid gap-4">
            <Grid className="flex gap-4">
              <Input
                bordered
                placeholder="Konbukun"
                label="Name"
                width="100%"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <Input
                bordered
                placeholder="192.116.3.34"
                label="IP Address"
                width="100%"
                onChange={(e) => handleInputChange("ip", e.target.value)}
              />
            </Grid>
            <Grid className="flex gap-4">
              <Input
                bordered
                label="Date"
                type="date"
                width="100%"
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
              <Input
                bordered
                label="Time"
                type="time"
                width="100%"
                step="2"
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </Grid>
            <Grid className="flex gap-4 justify-evenly">
              <Grid>
                <Text>PC Num</Text>
                <Dropdown>
                  <Dropdown.Button>{selectedPCValue}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    selectionMode="single"
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
              </Grid>
              <Grid>
                <Text>Status</Text>
                <Dropdown>
                  <Dropdown.Button>{selectedValue}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Status"
                    selectionMode="single"
                    selectedKeys={selected}
                    // @ts-ignore
                    onSelectionChange={setSelected}
                  >
                    <Dropdown.Item key="Online">Online</Dropdown.Item>
                    <Dropdown.Item key="Offline">Offline</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
            </Grid>
            {inputError && (
              <Grid.Container justify="center">
                <div className="rounded-lg border-solid border-2 border-red-600 py-1 px-3 bg-red-800/[.4]">
                  <Text>{inputError}</Text>
                </div>
              </Grid.Container>
            )}
            <Grid className="flex pt-1" justify="center">
              <Button size="sm" shadow onClick={handleSubmit}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  );
};

export default AddRecord;
