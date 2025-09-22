"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to create a trip");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateString = formData.get("startDate")?.toString();
  const endDateString = formData.get("endDate")?.toString();

  if (!title || !description || !startDateString || !endDateString) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      userId: session.user?.id,
    },
  });

  redirect("/trips");
}
