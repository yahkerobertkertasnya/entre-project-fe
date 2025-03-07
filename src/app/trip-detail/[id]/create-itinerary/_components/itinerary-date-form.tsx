"use client";

import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<CreateItineraryDTO>;
  handleNavigate: (key: number) => void;
}

const ItineraryDateForm: FC<IProps> = ({ control, handleNavigate }) => {
  const router = useRouter();

  return (
    <GradientLayout
      showNavbar={false}
      className="p-8 gap-4">
      <div className="w-full flex justify-between">
        <p className="text-lg font-semibold">Create Itinerary</p>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <p>Enter your trip start and end date</p>
      <div className="flex w-full gap-2">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              className="py-6 bg-white"
              placeholder="Start date"
              onChange={(e) => {
                const dateValue = new Date(e.target.value) ?? null;
                field.onChange(dateValue);
              }}
              value={field.value ? field.value.toISOString().split("T")[0] : ""}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              className="py-6 bg-white"
              placeholder="End date"
              onChange={(e) => {
                const dateValue = e.target.value ? new Date(e.target.value) : null;
                field.onChange(dateValue);
              }}
              value={field.value ? field.value.toISOString().split("T")[0] : ""}
            />
          )}
        />
      </div>
      <img
        src={"/create-itinerary.png"}
        alt="Uploaded"
      />
      <div className="flex flex-col flex-1 justify-end">
        <Button
          className="rounded-full py-6 font-bold text-lg"
          onClick={() => handleNavigate(1)}>
          Continue
        </Button>
      </div>
    </GradientLayout>
  );
};

export default ItineraryDateForm;
