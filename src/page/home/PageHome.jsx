import { useEffect, useState } from "react";

import CollectionMap from "./components/collection/CollectionMap";
import TrendingMap from "./components/trending/TrendingMap";

import { supabase } from "@/lib/supabase";

const PageHome = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testStorage = async () => {
      const { data, error } = await supabase.storage.from("chart-covers").list();

      console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
      console.log("STORAGE FILES:", data);
      console.log("STORAGE ERROR:", error);
    };

    testStorage();
  }, []);

  useEffect(() => {
    const getCharts = async () => {
      const { data, error } = await supabase.from("chart").select("*");

      if (error) {
        console.error("Error obteniendo charts:", error);
        setLoading(false);
        return;
      }

      setCharts(data);
      setLoading(false);
    };

    getCharts();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <TrendingMap charts={charts} />

      <CollectionMap charts={charts} />
    </main>
  );
};

export default PageHome;
