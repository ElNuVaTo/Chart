import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoveDown } from 'lucide-react';

import Book from './index/Book';
import { supabase } from '@/lib/supabase';

const PagesVisualize = () => {
  const { user, id } = useParams();

  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChart = async () => {
      const { data, error } = await supabase
        .from('chart')
        .select('*')
        .eq('id', id)
        .eq('user_id', user)
        .single();

      if (error) {
        console.error('Error cargando chart:', error);
        setLoading(false);
        return;
      }

      setChart(data);
      setLoading(false);
    };

    loadChart();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Chart no encontrado
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl bg-background px-6 py-18">
      <header className="mb-24 max-w-5xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Reading Chart
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          {chart.title}
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          {chart.description}
        </p>
      </header>

      {chart.levels.map((level, levelIndex) => (
        <section key={levelIndex} className="relative mt-24 pb-15">
          <div className="relative z-10 mb-5 flex items-center gap-4 md:justify-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-bold">
              {String(levelIndex + 1).padStart(2, '0')}
            </div>

            <h2 className="text-3xl font-bold tracking-tight">{level.name}</h2>
          </div>

          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-sm leading-6 text-muted-foreground">
              {level.takeaway}
            </p>
          </div>

          {/* BOOKS */}
          <div className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {level.books.map((book) => (
              <Book key={book.key} book={book} />
            ))}
          </div>

          {/* LÍNEA CENTRAL */}
          <span className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          {/* FLECHA */}
          {levelIndex < chart.levels.length - 1 && (
            <MoveDown
              color="#2e303a"
              className="absolute bottom-0 left-4 size-3 -translate-x-1/2 bg-background text-muted-foreground md:left-1/2"
              strokeWidth={1.5}
            />
          )}
        </section>
      ))}

      {/* END */}
      <footer className="mt-32 border-t pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          End of chart
        </p>
      </footer>
    </main>
  );
};

export default PagesVisualize;
