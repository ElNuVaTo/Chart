import TrendingCard from "./TrendingCard";

const TrendingMap = ({ charts }) => {
  const featuredCharts = charts.slice(0, 3);

  return (
    <section>
      <div className="mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Destacados</span>

        <div className="mt-2 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight">Los charts más populares</h2>

          <span className="hidden text-sm text-muted-foreground sm:block">Más valorados</span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCharts.map((chart, index) => (
          <TrendingCard key={chart.id} chart={chart} index={index} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMap;
