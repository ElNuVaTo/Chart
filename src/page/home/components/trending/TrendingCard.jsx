import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrendingCard = ({ chart, index }) => {
  const navigate = useNavigate();

  const author = chart.user_id?.slice(0, 8) || "Usuario";

  const handleClick = () => {
    navigate(`/${chart.user_id}/${chart.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group relative flex h-105 w-full max-w-70 cursor-pointer flex-col overflow-hidden border bg-card"
    >
      <div className="h-45 shrink-0 overflow-hidden">
        <img
          src={chart.cover_url}
          alt={chart.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex h-4 shrink-0 items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            0 vistas
          </span>
        </div>

        <h3 className="mt-4 h-14 shrink-0 overflow-hidden text-xl font-semibold leading-7 tracking-tight">
          {chart.title}
        </h3>

        <p className="mt-2 h-12 shrink-0 overflow-hidden text-sm leading-6 text-muted-foreground">
          {chart.description}
        </p>

        <div className="mt-auto flex h-10 shrink-0 items-end justify-between border-t pt-4">
          <span className="text-xs text-muted-foreground">
            por {author}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="size-3.5" />
            0
          </span>
        </div>
      </div>

      <span className="absolute bottom-0 left-0 z-20 h-0 w-full bg-white/80 transition-all duration-300 group-hover:h-1" />
    </article>
  );
};

export default TrendingCard;