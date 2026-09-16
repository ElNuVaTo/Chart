import TrendingCard from "./TrendingCard";

const images = [
  "https://centroipae.com/wp-content/uploads/2022/09/the-death-of-socrates-6471743_1280-1024x673.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwsZLHM_iUIU5qBuAFBqW_uJsOZa-OmwMofmnbOJzHP1weasZlq6Q_cp8E&s=10",
  "https://etimologia.com/wp-content/uploads/filosofia/Filosofia.jpg",
];

const featuredCharts = [
  {
    title: "Introducción a la filosofía",
    description: "Un recorrido por las principales ideas y autores de la tradición filosófica.",
    author: "Corxea",
    views: "12.4k",
    likes: 843,
    image: images[0],
  },
  {
    title: "Historia de la filosofía occidental",
    description: "De los presocráticos a la filosofía contemporánea.",
    author: "Tio rene",
    views: "9.8k",
    likes: 621,
    image: images[1],
  },
  {
    title: "¿Cómo empezar a leer filosofía?",
    description: "Una selección progresiva para comenzar a leer filosofía sin perderse.",
    author: "El Tarro",
    views: "7.2k",
    likes: 967,
    image: images[2],
  },
];

const TrendingMap = () => {
  return (
    <>
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
            <TrendingCard key={chart.title} chart={chart} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TrendingMap;
