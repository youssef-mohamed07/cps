type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="site-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 max-w-[16ch]">{title}</h1>
        <p className="lede mt-6">{lead}</p>
      </div>
    </section>
  );
}
