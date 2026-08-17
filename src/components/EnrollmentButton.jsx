"use client";

import { authClient, useSession } from "@/lib/auth-client";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { email } from "better-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";

const EnrollmentButton = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [timeStart, setTimeStart] = useState("9");
  const [timeEnd, setTimeEnd] = useState("10");

  const roomHour = room?.hourlyRate ?? 0;
  const totalPrice = Math.max(
    0,
    roomHour * (Number(timeEnd) - Number(timeStart))
  );

  const startTime = [
    { label: "08:00 AM", value: "8" },
    { label: "09:00 AM", value: "9" },
    { label: "10:00 AM", value: "10" },
    { label: "11:00 AM", value: "11" },
    { label: "12:00 AM", value: "12" },
    { label: "1:00 PM", value: "13" },
    { label: "2:00 PM", value: "14" },
    { label: "3:00 PM", value: "15" },
    { label: "4:00 PM", value: "16" },
    { label: "5:00 PM", value: "17" },
    { label: "6:00 PM", value: "18" },
    { label: "7:00 PM", value: "19" },
  ];

  const endTime = [
    { label: "10:00 AM", value: "10" },
    { label: "11:00 AM", value: "11" },
    { label: "12:00 AM", value: "12" },
    { label: "1:00 PM", value: "13" },
    { label: "2:00 PM", value: "14" },
    { label: "3:00 PM", value: "15" },
    { label: "4:00 PM", value: "16" },
    { label: "5:00 PM", value: "17" },
    { label: "6:00 PM", value: "18" },
    { label: "7:00 PM", value: "19" },
    { label: "8:00 PM", value: "20" },
  ];

  const handleEnroll = () => {
    setIsOpen(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (Number(timeEnd) <= Number(timeStart)) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const selectedDate = formData.get("date");
    const message = formData.get("message");

    const newBooking = {
      roomId: room?.id || room?._id,
      date: selectedDate,
      timeStart,
      timeEnd,
      totalPrice,
      message,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roomBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(newBooking),
        }
      );

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Room booked successfully!");
        setIsOpen(false);
      } else {
        toast.error(`Booking Error: ${responseData?.message || "Failed to book"}`);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Something went wrong with the booking.");
    }
  };

  const { data: session } = useSession();
  const handleBooking = async () => {
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;

    const updatedData = {
      id: session?.user?.id,
      name: session?.user?.name,
      email: session?.user?.email,
      title: room?.roomName,
      image: room?.image,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/enrollment/${room?._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await res.json();
  };

  return (
    <>
      <div>
        <Button
          color="primary"
          size="lg"
          className="w-full font-bold shadow-lg mt-4"
          onPress={handleEnroll}
        >
          Enroll Now
        </Button>
      </div>

      <Modal className="bg-white" isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog
              className="sm:max-w-md bg-white text-slate-900"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Modal.CloseTrigger />
              <Modal.Header className="bg-white">
                <Modal.Heading className="bg-white">
                  Book <strong>{room?.roomName}</strong>
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted bg-white">
                  Pick a date and time slot. Bookings run on the hour.
                </p>
              </Modal.Header>
              <Modal.Body className="p-2 bg-white">
                <Surface variant="default" className="bg-white">
                  <form
                    onSubmit={handleConfirmBooking}
                    className="flex flex-col gap-6 bg-white"
                  >
                    {/* date */}
                    <DatePicker className="bg-white" isRequired name="date">
                      <Label className="bg-white">Date</Label>
                      <DateField.Group fullWidth className="bg-white">
                        <DateField.Input className="bg-white">
                          {(segment) => (
                            <DateField.Segment
                              segment={segment}
                              className="bg-white"
                            />
                          )}
                        </DateField.Input>
                        <DateField.Suffix className="bg-white">
                          <DatePicker.Trigger className="bg-white">
                            <DatePicker.TriggerIndicator />
                          </DatePicker.Trigger>
                        </DateField.Suffix>
                      </DateField.Group>
                      <DatePicker.Popover className="bg-white">
                        <Calendar aria-label="Event date" className="bg-white">
                          <Calendar.Header className="bg-white">
                            <Calendar.YearPickerTrigger className="bg-white">
                              <Calendar.YearPickerTriggerHeading />
                              <Calendar.YearPickerTriggerIndicator />
                            </Calendar.YearPickerTrigger>
                            <Calendar.NavButton slot="previous" />
                            <Calendar.NavButton slot="next" />
                          </Calendar.Header>
                          <Calendar.Grid className="bg-white">
                            <Calendar.GridHeader className="bg-white">
                              {(day) => (
                                <Calendar.HeaderCell className="bg-white">
                                  {day}
                                </Calendar.HeaderCell>
                              )}
                            </Calendar.GridHeader>
                            <Calendar.GridBody className="bg-white">
                              {(date) => <Calendar.Cell date={date} />}
                            </Calendar.GridBody>
                          </Calendar.Grid>
                          <Calendar.YearPickerGrid className="bg-white">
                            <Calendar.YearPickerGridBody className="bg-white">
                              {({ year }) => (
                                <Calendar.YearPickerCell year={year} />
                              )}
                            </Calendar.YearPickerGridBody>
                          </Calendar.YearPickerGrid>
                        </Calendar>
                      </DatePicker.Popover>
                    </DatePicker>

                    <div className="flex items-center gap-2 bg-white">
                      {/* start */}
                      <Select
                        isRequired
                        name="start"
                        selectedKey={timeStart}
                        onSelectionChange={(key) => setTimeStart(String(key))}
                        className="w-full bg-white"
                      >
                        <Label>Start</Label>

                        <Select.Trigger className="bg-white border-2 border-slate-400">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover className="bg-white">
                          <ListBox>
                            {startTime.map((time) => (
                              <ListBox.Item
                                id={time.value}
                                key={time.value}
                                textValue={time.label}
                              >
                                {time.label}

                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* end */}
                      <Select
                        isRequired
                        name="end"
                        selectedKey={timeEnd}
                        onSelectionChange={(key) => setTimeEnd(String(key))}
                        isInvalid={Number(timeEnd) <= Number(timeStart)}
                        className="w-full"
                      >
                        <Label>End</Label>

                        <Select.Trigger className="bg-white border-2 border-slate-400">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover className="bg-white">
                          <ListBox>
                            {endTime.map((time) => (
                              <ListBox.Item
                                id={time.value}
                                key={time.value}
                                textValue={time.label}
                              >
                                {time.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                    {Number(timeEnd) <= Number(timeStart) && (
                      <p className="text-sm text-danger font-medium flex items-center gap-1 bg-white">
                        <BiInfoCircle /> End time must be greater than start
                        time
                      </p>
                    )}
                    {/* note */}
                    <TextField className="w-full bg-white" name="message">
                      <Label className="bg-white">Special Note (Optional)</Label>
                      <TextArea
                        className="h-22 w-full bg-white border-2 border-slate-400"
                        placeholder="Enter your message..."
                      />
                    </TextField>
                    {/* cost */}
                    <div className="flex items-center justify-between p-4 w-full bg-white rounded-md my-4 border border-gray-200">
                      <span className="font-medium bg-white">Total Cost</span>
                      <strong className="text-accent text-md font-black tracking-tight bg-white">
                        ${totalPrice}
                      </strong>
                    </div>
                    <Modal.Footer className="bg-white">
                      <Button
                        type="button"
                        onPress={() => setIsOpen(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isDisabled={Number(timeEnd) <= Number(timeStart)}
                      >
                        Confirm Booking
                      </Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default EnrollmentButton;