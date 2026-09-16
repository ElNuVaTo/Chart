import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ chart }) => {
  const navigate = useNavigate();

  const author = chart.user_id?.slice(0, 8) || "Usuario";

  const timeAgo = chart.created_at
    ? new Date(chart.created_at).toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleClick = () => {
    navigate(`/${chart.user_id}/${chart.id}`);
  };

  return (
    <article onClick={handleClick} className="group relative cursor-pointer border-b border-t px-2 py-6">
      {/* Línea de hover */}
      <span className="absolute left-0 top-0 z-10 h-full w-0 bg-white/80 transition-all duration-300 group-hover:w-1" />
      <span className="absolute right-0 top-0 z-10 h-full w-0 bg-white/80 transition-all duration-300 group-hover:w-1" />

      <div className="grid grid-cols-[1fr_240px] gap-10 pl-5">
        {/* Contenido */}
        <div className="flex min-w-0 flex-col">
          {/* Usuario */}
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full border bg-muted">
              <span className="text-[9px] font-semibold uppercase">{author.slice(0, 2)}</span>
            </div>

            <span className="text-xs font-medium">{author}</span>

            <span className="text-xs text-muted-foreground">·</span>

            <span className="text-xs text-muted-foreground">{timeAgo}</span>

            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>

          {/* Texto */}
          <div className="mt-6">
            <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1">
              {chart.title}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{chart.description}</p>
          </div>

          {/* Acciones */}
          <div className="mt-auto flex items-center gap-5 pt-8">
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Heart className="size-4" />0
            </button>

            <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-muted-foreground">0 vistas</span>
          </div>
        </div>

        {/* Imagen */}
        <div className="overflow-hidden">
          <img src={chart.cover_url} alt={chart.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
