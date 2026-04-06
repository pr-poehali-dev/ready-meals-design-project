import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import CombosSection from "@/components/CombosSection";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [addedFlash, setAddedFlash] = useState<number | null>(null);

  const toggleFav = (id: number) =>
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    setAddedFlash(id);
    setTimeout(() => setAddedFlash(null), 800);
  };

  return (
    <div className="min-h-screen font-body" style={{ background: "var(--dark)" }}>
      <Navbar favorites={favorites} cart={cart} />
      <HeroSection />
      <MenuSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        favorites={favorites}
        toggleFav={toggleFav}
        addToCart={addToCart}
        addedFlash={addedFlash}
      />
      <CombosSection
        favorites={favorites}
        toggleFav={toggleFav}
        addToCart={addToCart}
        addedFlash={addedFlash}
      />
    </div>
  );
}
