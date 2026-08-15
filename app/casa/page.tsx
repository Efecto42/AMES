import type { Metadata } from "next";
import CasaExperience from "./CasaExperience";

export const metadata: Metadata = {
  title: "Casa Ángela España — Vista privada",
  description: "Primera construcción de la nueva casa digital de Ángela España.",
  robots: { index: false, follow: false },
};

export default function CasaPage() {
  return <CasaExperience />;
}
