import type { ReactNode } from "react";
import { Header } from "../../../components/header";

type NewReservationLayoutProps = {
  readonly children: ReactNode;
};

const NewReservationLayout = ({ children }: NewReservationLayoutProps) => (
  <>
    <Header
      page="Nuova prenotazione"
      pages={["Front Desk", "Prenotazioni"]}
    />
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">{children}</div>
  </>
);

export default NewReservationLayout;
