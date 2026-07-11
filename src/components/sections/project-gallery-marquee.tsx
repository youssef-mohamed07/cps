import Image from "next/image";

type ProjectGalleryMarqueeProps = {
  images: string[];
  title: string;
};

function GalleryRow({
  images,
  title,
  direction,
}: {
  images: string[];
  title: string;
  direction: "right" | "left";
}) {
  const track = [...images, ...images];

  return (
    <div
      className={`project-detail-gallery-marquee project-detail-gallery-marquee--${direction}`}
      role="presentation"
    >
      <div className="project-detail-gallery-track">
        {track.map((src, index) => (
          <figure
            key={`${direction}-${src}-${index}`}
            className="project-detail-gallery-slide"
            aria-hidden={index >= images.length ? true : undefined}
          >
            <Image
              src={src}
              alt={
                index >= images.length
                  ? ""
                  : `${title} ${String((index % images.length) + 1).padStart(2, "0")}`
              }
              fill
              sizes="320px"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ProjectGalleryMarquee({
  images,
  title,
}: ProjectGalleryMarqueeProps) {
  const rowTop = images.filter((_, index) => index % 2 === 0);
  const rowBottom = images.filter((_, index) => index % 2 === 1);
  const bottom = rowBottom.length ? rowBottom : rowTop;

  return (
    <div className="project-detail-gallery-rows">
      <GalleryRow images={rowTop} title={title} direction="right" />
      <GalleryRow images={bottom} title={title} direction="left" />
    </div>
  );
}
