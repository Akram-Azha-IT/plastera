import Image from "next/image";
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
      <Image
        src="/brand/plasturgie-logo.png"
        alt="Logo Pastera Plasturgie"
        width={2172}
        height={724}
        sizes="(max-width: 600px) 180px, 240px"
        quality={90}
        className="brand-logo-image"
      />
    </Link>
  );
}
