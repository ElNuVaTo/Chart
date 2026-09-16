import CollectionMap from "./components/collection/CollectionMap";
import TrendingMap from "./components/trending/TrendingMap";

const PageHome = () => {
  return (
    <main className="min-h-screen mx-auto max-w-6xl px-6 py-16">
      <TrendingMap />
      <CollectionMap />
    </main>
  );
};

export default PageHome;
