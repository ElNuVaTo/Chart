import { useMemo, useState } from "react";

import CollectionCard from "./CollectionCard";

const CollectionMap = ({ charts }) => {
  const [sort, setSort] = useState("recent");

  const sortedCharts = useMemo(() => {
    const sorted = [...charts];

    if (sort === "recent") {
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (sort === "oldest") {
      return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

    return sorted;
  }, [charts, sort]);

  return (
    <section className="mt-24">
      <div className="mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Comunidad</span>

        <div className="mt-2 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight">Publicados por la comunidad</h2>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ordenar</span>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-9 border bg-background px-3 text-sm outline-none transition-colors hover:border-foreground focus:border-foreground"
            >
              <option value="recent">Más recientes</option>
              <option value="oldest">Más antiguos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de publicaciones */}
      <div className="grid gap-6">
        {sortedCharts.map((chart) => (
          <CollectionCard key={chart.id} chart={chart} />
        ))}
      </div>
    </section>
  );
};

export default CollectionMap;
