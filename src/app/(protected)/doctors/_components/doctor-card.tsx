"use client";

import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { Dialog, DialogContent, DialogTrigger } from "@/_components/ui/dialog";
import { CalendarDaysIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { useState } from "react";
import UpsertDoctorsDialog from "./upsert-doctors-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const initials = doctor.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const [isOpen, setIsOpen] = useState(false);

  function getWeekdayName(weekday: number): string {
    const weekdays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return weekdays[weekday] || "Desconhecido";
  }
  function getHours(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">
              {doctor.specialty || "Specialty not specified"}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline" className="mr-1">
          <CalendarDaysIcon />
          {getWeekdayName(doctor.availableFromWeekDays)} -{" "}
          {getWeekdayName(doctor.availableToWeekDays)}
        </Badge>
        <Badge variant="outline" className="mr-1">
          <ClockIcon />
          Das {getHours(doctor.availableFromTime)} ás{" "}
          {getHours(doctor.availableToTime)}
        </Badge>
        <Badge variant="outline" className="mr-1">
          <DollarSignIcon /> R$ {(doctor.appointmentsInCents / 100).toFixed(2)}
        </Badge>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={() => setIsOpen(true)}>
              Ver detalhes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UpsertDoctorsDialog onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
