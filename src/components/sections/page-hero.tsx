type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="site-container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={`display max-w-[16ch]${eyebrow ? " mt-5" : ""}`}>{title}</h1>
        <p className="lede mt-6">{lead}</p>
      </div>
    </section>
  );
}
