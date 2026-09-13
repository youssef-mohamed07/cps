import Image from "next/image";

type ProjectGalleryMarqueeProps = {
  images: string[];
  title: string;
};

export function ProjectGalleryMarquee({
  images,
  title,
}: ProjectGalleryMarqueeProps) {
  return (
    <div
      className="project-detail-gallery-grid site-container"
      data-count={Math.min(images.length, 3)}
    >
      {images.map((src, index) => {
        const isFeature = images.length === 1 || (images.length >= 3 && index === 0);

        return (
          <figure className="project-detail-gallery-item" key={src}>
            <Image
              src={src}
              alt={`${title} ${String(index + 1).padStart(2, "0")}`}
              fill
              loading={index < 4 ? "eager" : "lazy"}
              sizes={
                isFeature
                  ? "(min-width: 1180px) 1180px, calc(100vw - 3rem)"
                  : "(min-width: 1180px) 580px, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 1.5rem)"
              }
              className="object-cover"
            />
            <figcaption aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
