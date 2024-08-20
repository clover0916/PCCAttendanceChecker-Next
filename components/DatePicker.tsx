import React, { useEffect, useState } from "react";
import { Input, Popover, Text, Button, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

interface DateRange {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

interface ParsedDate {
  dateString: string;
  timeString: string;
  hours: number;
  minutes: number;
}

const parseDate = (timestamp: string | null): ParsedDate | null => {
  if (!timestamp) return null;
  const dateObj = new Date(parseInt(timestamp) * 1000);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const dateString = `${year}-${month}-${date}`;
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return { dateString, timeString, hours, minutes };
};

const DatePicker = () => {
  const router = useRouter();
  const { startDate } = useRouter().query;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [inputError, setInputError] = useState<string>("");

  const [startDateStatus, setStartDateStatus] = useState<"default" | "error">(
    "default"
  );
  const [endDateStatus, setEndDateStatus] = useState<"default" | "error">(
    "default"
  );

  const [buttonValue, setButtonValue] = useState<string>("Set data range");

  const [startDateValue, setStartDateValue] = useState<string | null | any>(
    null
  );
  const [startTimeValue, setStartTimeValue] = useState<string | null | any>(
    null
  );
  const [endDateValue, setEndDateValue] = useState<string | null | any>(null);
  const [endTimeValue, setEndTimeValue] = useState<string | null | any>(null);

  useEffect(() => {
    const queryStr = router.asPath.split("?")[1];
    const params = new URLSearchParams(queryStr);
    const queryStart = params.get("startDate");
    const queryEnd = params.get("endDate");
    const startDate = parseDate(queryStart);

    var buttonValue: string = "";
    if (startDate) {
      const { dateString, timeString, hours, minutes } = startDate;
      console.log("startDateString: ", dateString);
      setStartDateValue(dateString);
      handleInputChange("startDate", dateString);
      buttonValue = `${dateString} ${timeString} ~ `;
      if (hours === 0 && minutes === 0) {
        console.log("no Time of startDate");
      } else {
        console.log("startTimeString: ", timeString);
        setStartTimeValue(timeString);
        handleInputChange("startTime", timeString);
      }

      const endDate = parseDate(queryEnd);
      if (endDate) {
        const { dateString, timeString, hours, minutes } = endDate;
        console.log("endDateString: ", dateString);
        setEndDateValue(dateString);
        handleInputChange("endDate", dateString);
        buttonValue = buttonValue + `${dateString} ${timeString}`;
        if (hours === 0 && minutes === 0) {
          console.log("no Time of endDate");
        } else {
          console.log("endTimeString: ", timeString);
          setEndTimeValue(timeString);
          handleInputChange("endTime", timeString);
        }
      }

      setButtonValue(buttonValue);
    }
  }, [router.asPath]);

  const handleEmptyValue = (
    field: keyof DateRange,
    value: string
  ): Partial<DateRange> => {
    if (field === "startDate" && !value) {
      return {
        endDate: "",
        endTime: "",
      };
    } else if (field === "endDate" && !value) {
      return {
        endTime: "",
      };
    }
    return {};
  };

  const handleInputChange = (field: keyof DateRange, value: string) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
      ...handleEmptyValue(field, value),
    }));

    if (field === "startDate") {
      setStartDateStatus("default");
      setInputError("");
    } else if (field === "endDate") {
      if (value && !dateRange.endTime) {
        setEndDateStatus("default");
        setInputError("");
      } else {
        if (!value) {
          setEndDateStatus("default");
          setInputError("");
        } else {
          setEndDateStatus("error");
        }
      }
    } else if (field === "startTime" && !value) {
      setDateRange((prev) => ({ ...prev, endTime: "" }));
    }
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!dateRange.startDate) {
      setStartDateStatus("error");
      hasError = true;
    } else {
      setStartDateStatus("default");
    }

    if (dateRange.endTime && !dateRange.endDate) {
      setEndDateStatus("error");
      hasError = true;
    } else {
      setEndDateStatus("default");
    }

    if (hasError) {
      setInputError("Please fill in the required fields.");
      return;
    }

    setInputError("");

    console.log("Result", dateRange);
    var startDateString: string;
    var endDateString: string;
    if (dateRange.startTime) {
      startDateString = `${dateRange.startDate} ${dateRange.startTime}`;
    } else {
      startDateString = `${dateRange.startDate} 00:00`;
    }

    if (dateRange.endTime) {
      endDateString = `${dateRange.endDate} ${dateRange.endTime}`;
    } else {
      endDateString = `${dateRange.endDate} 00:00`;
    }

    const startUNIX = new Date(startDateString).getTime() / 1000;

    if (dateRange.endDate) {
      const endUNIX = new Date(endDateString).getTime() / 1000;

      if (startUNIX > endUNIX)
        return setInputError(
          "Start date/time must be earlier than the End date/time."
        );

      const queryStr = router.asPath.split("?")[1];
      const params = new URLSearchParams(queryStr);
      params.set("startDate", startUNIX.toString());
      params.set("endDate", endUNIX.toString());

      const newQueryStr = params.toString();
      router.push(`${router.pathname}?${newQueryStr}`);
      setIsOpen(false);
    } else {
      const endUNIX = (new Date(endDateString).getTime() / 1000).toString();

      const queryStr = router.asPath.split("?")[1];
      const params = new URLSearchParams(queryStr);
      params.set("startDate", startUNIX.toString());

      const newQueryStr = params.toString();
      router.push(`${router.pathname}?${newQueryStr}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  const handleClick = () => {
    const query = { ...router.query };

    if ("startDate" in query) {
      delete query.startDate;
    }

    if ("endDate" in query) {
      delete query.endDate;
    }

    setStartDateValue(null);
    setStartTimeValue(null);
    setEndDateValue(null);
    setEndTimeValue(null);
    setDateRange({});
    setStartDateStatus("default");
    setEndDateStatus("default");
    setButtonValue("Set date range");
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <Button color="secondary" auto flat>
            {buttonValue}
          </Button>
        </Popover.Trigger>
        <Popover.Content
          css={{
            padding: "1rem",
          }}
        >
          <Grid.Container
            gap={2}
            justify="space-evenly"
            direction={"row"}
            css={{
              borderRadius: "16px",
              maxWidth: "500px",
              animation: inputError
                ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                : "none",
            }}
          >
            <Grid>
              <Text>Start</Text>
              <Grid>
                <Input
                  bordered
                  width="186px"
                  label="Start date"
                  type="date"
                  helperText="required"
                  value={startDateValue}
                  status={startDateStatus}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  width="186px"
                  label="Start time"
                  type="time"
                  value={startTimeValue}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                />
              </Grid>
            </Grid>
            <Grid>
              <Text>End</Text>
              <Grid>
                <Input
                  bordered
                  width="186px"
                  label="End date"
                  type="date"
                  value={endDateValue}
                  status={endDateStatus}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  width="186px"
                  label="End Time"
                  type="time"
                  value={endTimeValue}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid.Container>
          {inputError && (
            <Grid.Container justify="center" className="mb-4">
              <div className="rounded-lg border-solid border-2 border-red-600 py-1 px-3 bg-red-800/[.4]">
                <Text>{inputError}</Text>
              </div>
            </Grid.Container>
          )}
          <Grid.Container justify="space-evenly" alignContent="center">
            <Grid>
              <Button size="sm" light onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button size="sm" shadow color="primary" onClick={handleSubmit}>
                Enter
              </Button>
            </Grid>
          </Grid.Container>
        </Popover.Content>
      </Popover>
      {startDate ? (
        <Button
          auto
          flat
          color="error"
          icon={<IoClose />}
          onClick={handleClick}
        />
      ) : null}
    </>
  );
};

export default DatePicker;
