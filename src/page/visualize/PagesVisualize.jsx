import { useEffect, useState } from "react";
import { MoveDown } from "lucide-react";
import Book from "./index/Book";
import chartUrl from "../../data/Chart.json?url";

const PagesVisualize = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        const response = await fetch(chartUrl);
        const data = await response.json();
        setChart(data);
      } catch (error) {
        console.error("Error cargando Chart.json:", error);
      }
    };

    loadChart();
  }, []);

  if (!chart) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-18 bg-background">
        <header className="mb-24 max-w-5xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Reading Chart</p>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">{chart.title}</h1>

          <p className="mt-8 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{chart.description}</p>
        </header>



        {chart.levels.map((level, levelIndex) => (
          <section key={levelIndex} className="relative mt-24 pb-15">
           
            <div className="relative z-10 mb-5 flex items-center gap-4 md:justify-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-bold">
                {String(levelIndex + 1).padStart(2, "0")}
              </div>

              <h2 className="text-3xl font-bold tracking-tight">{level.name}</h2>
            </div>


            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="text-sm leading-6 text-muted-foreground">{level.info}</p>
            </div>

            {/* BOOKS */}
            <div className="grid gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">End of chart</p>
        </footer>
      </main>
    </>
  );
};

export default PagesVisualize;
