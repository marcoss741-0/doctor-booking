"use server";

import { auth } from "@/lib/auth";
import { upsertDoctorsSchema } from "./schema";
import { headers } from "next/headers";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const upsertDoctor = actionClient
  .schema(upsertDoctorsSchema)
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const clinicId = session?.user.clinic?.id;

    if (!clinicId) {
      throw new Error("Clinic not found");
    }

    const doctorData = {
      id: data.id,
      name: data.name,
      specialty: data.specialty,
      availableFromWeekDays: parseInt(data.availableFromWeekDays),
      availableToWeekDays: parseInt(data.availableToWeekDays),
      availableFromTime: data.availableFromTime,
      availableToTime: data.availableToTime,
      appointmentsInCents: data.appointmentPriceInCents,
      clinicId: clinicId,
    };

    await db
      .insert(doctorsTable)
      .values(doctorData)
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: doctorData,
      });

    revalidatePath("/doctors");
  });
