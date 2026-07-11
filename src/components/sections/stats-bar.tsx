type StatItem = { value: string; label: string };

type StatsBarProps = {
  items: StatItem[];
};

export function StatsBar({ items }: StatsBarProps) {
  return (
    <div className="stats-bar">
      <div className="site-container stats-bar-inner">
        {items.map((item) => (
          <div key={item.label} className="stats-bar-item">
            <p className="stats-bar-value">{item.value}</p>
            <p className="stats-bar-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
