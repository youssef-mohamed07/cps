import Image from "next/image";

type BleedImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function BleedImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "100vw",
}: BleedImageProps) {
  return (
    <div className={`media-bleed ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
