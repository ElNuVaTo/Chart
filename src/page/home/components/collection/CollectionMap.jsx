import { useMemo, useState } from "react";

import CollectionCard from "./CollectionCard";

const images = [
  "https://centroipae.com/wp-content/uploads/2022/09/the-death-of-socrates-6471743_1280-1024x673.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwsZLHM_iUIU5qBuAFBqW_uJsOZa-OmwMofmnbOJzHP1weasZlq6Q_cp8E&s=10",
  "https://etimologia.com/wp-content/uploads/filosofia/Filosofia.jpg",
];

const recentCharts = [
  {
    title: "Introducción al estoicismo",
    description: "Lecturas esenciales para comprender la tradición estoica.",
    author: "ana",
    views: "2.1k",
    likes: 184,
    comments: 32,
    image: images[1],
    date: "2026-09-14",
    timeAgo: "hace 19 h",
  },
  {
    title: "Lecturas sobre Nietzsche",
    description: "Una ruta de lectura para acercarse al pensamiento de Nietzsche.",
    author: "diego",
    views: "1.8k",
    likes: 156,
    comments: 24,
    image: images[2],
    date: "2026-09-10",
    timeAgo: "hace 4 días",
  },
  {
    title: "Filosofía política",
    description: "Conceptos y autores fundamentales del pensamiento político.",
    author: "maría",
    views: "1.4k",
    likes: 121,
    comments: 18,
    image: images[0],
    date: "2026-08-28",
    timeAgo: "hace 2 semanas",
  },
  {
    title: "El problema del conocimiento",
    description: "Un recorrido por las distintas formas de entender el conocimiento.",
    author: "carlos",
    views: "980",
    likes: 94,
    comments: 15,
    image: images[1],
    date: "2026-08-17",
    timeAgo: "hace 1 mes",
  },
  {
    title: "Pensamiento contemporáneo",
    description: "Autores y obras para entender algunas de las grandes discusiones actuales.",
    author: "julia",
    views: "842",
    likes: 76,
    comments: 12,
    image: images[2],
    date: "2026-08-05",
    timeAgo: "hace 1 mes",
  },
  {
    title: "Existencialismo",
    description: "Una selección de textos para entrar en el pensamiento existencialista.",
    author: "pedro",
    views: "731",
    likes: 68,
    comments: 9,
    image: images[0],
    date: "2026-07-22",
    timeAgo: "hace 2 meses",
  },
  {
    title: "Filosofía de la ciencia",
    description: "Ideas fundamentales sobre ciencia, método y conocimiento.",
    author: "valentina",
    views: "614",
    likes: 51,
    comments: 8,
    image: images[1],
    date: "2026-07-11",
    timeAgo: "hace 2 meses",
  },
  {
    title: "El mundo de Platón",
    description: "Una introducción a las ideas centrales de Platón y sus diálogos.",
    author: "gabriel",
    views: "502",
    likes: 47,
    comments: 6,
    image: images[2],
    date: "2026-06-30",
    timeAgo: "hace 2 meses",
  },
];

const CollectionMap = () => {
  const [sort, setSort] = useState("recent");

  const sortedCharts = useMemo(() => {
    const charts = [...recentCharts];

    if (sort === "recent") {
      return charts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (sort === "oldest") {
      return charts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return charts;
  }, [sort]);

  return (
    <>
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
            <CollectionCard key={chart.title} chart={chart} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CollectionMap;
