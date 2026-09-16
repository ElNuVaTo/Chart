import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

const CollectionCard = ({ chart }) => {
  return (
    <>
      <article className="group relative border-b px-2 py-6 border-t">
        {/* Línea de hover */}
        <span className="absolute left-0 z-10 top-0 h-full w-0 bg-white/80 transition-all duration-300 group-hover:w-1" />
        <span className="absolute right-0 z-10 top-0 h-full w-0 bg-white/80 transition-all duration-300 group-hover:w-1" />

        <div className="grid grid-cols-[1fr_240px] gap-10 pl-5">
          {/* Contenido */}
          <div className="flex min-w-0 flex-col">
            {/* Usuario */}
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full border bg-muted">
                <span className="text-[9px] font-semibold uppercase">{chart.author.slice(0, 2)}</span>
              </div>

              <span className="text-xs font-medium">{chart.author}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{chart.timeAgo}</span>

              <button type="button" className="ml-auto flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
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
              <button type="button" className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Heart className="size-4" />
                {chart.likes}
              </button>

              <button type="button" className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <MessageCircle className="size-4" />
                {chart.comments}
              </button>

              <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{chart.views} vistas</span>
            </div>
          </div>

          {/* Imagen */}
          <div className="overflow-hidden">
            <img src={chart.image} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </article>
    </>
  );
};

export default CollectionCard;
