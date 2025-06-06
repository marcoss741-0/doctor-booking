import z from "zod";

export const upsertDoctorsSchema = z
  .object({
    id: z.string().optional(),

    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),

    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),

    availableFromWeekDays: z.string(),

    availableToWeekDays: z.string(),

    availableFromTime: z
      .string()
      .min(1, { message: "Horário de início é obrigatório" }),

    availableToTime: z
      .string()
      .min(1, { message: "Horário de término é obrigatório" }),

    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" })
      .positive("Preço deve ser um valor positivo"),
  })
  .refine((data) => data.availableFromTime < data.availableToTime, {
    message: "O horário de início não pode ser anterior ao horário de término.",
    path: ["availableToTime"],
  });

export type UpsertDoctorsSchema = z.infer<typeof upsertDoctorsSchema>;
