import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbeshop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbeshopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbeshopDetailsPage = async ({ params }: BarbeshopDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  if (!params.id) {
    //TODO: redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });
  if (!barbershop) {
    //TODO: redireiconar para home page
    return null;
  }
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className="px-5 flex flex-col gap-5 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbeshopDetailsPage;
