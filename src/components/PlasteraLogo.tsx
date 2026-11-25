import Link from "next/link";

export default function PlasteraLogo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={"brand brand-image " + className}
      aria-label="Plastera, accueil"
    >
      <span className="brand-logo-image" aria-hidden="true" />
    </Link>
  );
}
