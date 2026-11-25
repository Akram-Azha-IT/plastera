import IndustrialPage from "@/components/IndustrialPage";
import MachineCatalog from "@/components/MachineCatalog";
export const metadata = {
  title: "Catalogue machines Shibaura | Plastera France",
  description:
    "Les équipements Shibaura Machine pour l’injection plastique, la fonderie, l’usinage et la robotique industrielle en France.",
};
export default function Page() {
  return (
    <IndustrialPage
      theme="machines"
      eyebrow="Catalogue Shibaura Machine"
      title="Trouvez votre solution"
      accent="industrielle."
      description="Injection plastique, fonderie, usinage et robotique : les technologies Shibaura Machine au service de votre production."
      image="/images/shibaura-injection.jpg"
      position="65% 50%"
      mobilePosition="62% 50%"
      caption="Au cœur du procédé d’injection"
      action="Parcourir le catalogue"
      contentId="catalogue-machines"
    >
      <div className="shell page-content">
        <MachineCatalog />
      </div>
    </IndustrialPage>
  );
}
