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
    <section >
      <div className="mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Comunidad</span>
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
