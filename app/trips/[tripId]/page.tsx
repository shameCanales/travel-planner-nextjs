import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import TripDetailClient from "@/components/TripDetail";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();

  if (!session) {
    return <div>Please Sign In</div>;
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
  });

  if (!trip) {
    return <div>Trip not found.</div>;
  }

  return <TripDetailClient trip={trip} />;
}
