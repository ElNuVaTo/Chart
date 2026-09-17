import { useNavigate } from 'react-router-dom';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Star, MoreHorizontal, OctagonAlert } from 'lucide-react';

const CollectionCard = ({ chart }) => {
  const navigate = useNavigate();

  const author = chart.user_id?.slice(0, 8) || 'Usuario';

  const timeAgo = chart.created_at
    ? new Date(chart.created_at).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const handleClick = () => {
    navigate(`/${chart.user_id}/${chart.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="flex gap-5 group relative cursor-pointer border-b border-t px-3 py-4"
    >
      <span className="absolute left-0 top-0 z-10 h-full w-0 bg-white/50 transition-all duration-300 group-hover:w-1" />

      <div className="flex flex-1 rounded overflow-hidden brightness-95 grayscale-10">
        <img
          src={chart.cover_url}
          alt={chart.title}
          className="aspect-video size-full object-cover"
        />
      </div>

      <div className="flex flex-2 min-w-0 flex-col  justify-between">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-1 text-left">
            <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight ">
              {chart.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground text-balance ">
              {chart.description}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <OctagonAlert />
                  Reportar
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <Avatar size="sm" onClick={(e) => e.stopPropagation()}>
              <AvatarImage src={author} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs"> Name user</p>
          </div>

          <span className="text-xs text-muted-foreground">{timeAgo}</span>

          <Toggle
            aria-label="Toggle like"
            size="sm"
            variant="outline"
            onClick={(e) => e.stopPropagation()}
          >
            <Star className="group-aria-pressed/toggle:fill-foreground" />
          </Toggle>
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
