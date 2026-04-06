import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Бургеры", "Суши", "Пицца", "Вок", "Салаты", "Десерты"];

const IMGS = {
  burger:  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&fit=crop",
  sushi:   "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80&fit=crop",
  pizza:   "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop",
  wok:     "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop",
  salad:   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&fit=crop",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80&fit=crop",
  delivery:"https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80&fit=crop",
};

export const DISHES = [
  {
    id: 1, name: "Смоки Бургер", category: "Бургеры",
    price: 490, oldPrice: 590,
    img: IMGS.burger, tag: "ХИТ", tagColor: "#FF6B1A",
    desc: "Двойная котлета, бекон, чеддер, копчёный соус",
    weight: "350г", time: "25 мин",
  },
  {
    id: 2, name: "Филадельфия XL", category: "Суши",
    price: 720, oldPrice: null,
    img: IMGS.sushi, tag: "НОВИНКА", tagColor: "#E8374A",
    desc: "Лосось, сливочный сыр, огурец, икра",
    weight: "280г", time: "20 мин",
  },
  {
    id: 3, name: "Маргарита Deluxe", category: "Пицца",
    price: 650, oldPrice: 780,
    img: IMGS.pizza, tag: "−17%", tagColor: "#FFB830",
    desc: "Томаты, моцарелла, базилик, оливковое масло",
    weight: "500г", time: "30 мин",
  },
  {
    id: 4, name: "Вок с уткой", category: "Вок",
    price: 550, oldPrice: null,
    img: IMGS.wok, tag: "ОСТРЫЙ", tagColor: "#E8374A",
    desc: "Утиное филе, лапша удон, овощи, терияки",
    weight: "420г", time: "22 мин",
  },
  {
    id: 5, name: "Цезарь Роял", category: "Салаты",
    price: 380, oldPrice: null,
    img: IMGS.salad, tag: null, tagColor: "",
    desc: "Курица гриль, романо, пармезан, анчоусы",
    weight: "300г", time: "15 мин",
  },
  {
    id: 6, name: "Тирамису", category: "Десерты",
    price: 290, oldPrice: 350,
    img: IMGS.dessert, tag: "ХИТ", tagColor: "#FF6B1A",
    desc: "Маскарпоне, эспрессо, савоярди, какао",
    weight: "180г", time: "10 мин",
  },
];

interface MenuSectionProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  favorites: number[];
  toggleFav: (id: number) => void;
  addToCart: (id: number) => void;
  addedFlash: number | null;
}

export default function MenuSection({
  activeCategory,
  setActiveCategory,
  favorites,
  toggleFav,
  addToCart,
  addedFlash,
}: MenuSectionProps) {
  const filtered = activeCategory === "Все" ? DISHES : DISHES.filter((d) => d.category === activeCategory);
  const favDishes = DISHES.filter((d) => favorites.includes(d.id));

  return (
    <>
      {/* ── MENU ── */}
      <section id="menu" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--flame)" }}>Наше меню</p>
              <h2 className="font-display text-5xl md:text-6xl uppercase font-bold" style={{ color: "hsl(var(--foreground))" }}>
                Выбери <span className="text-gradient">вкус</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`cat-pill px-4 py-2 rounded-full text-sm font-medium ${activeCategory === cat ? "active" : ""}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dish, i) => (
              <div key={dish.id} className="food-card rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={dish.img} alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
                  {dish.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white"
                      style={{ background: dish.tagColor }}>
                      {dish.tag}
                    </span>
                  )}
                  <button onClick={() => toggleFav(dish.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: favorites.includes(dish.id) ? "rgba(232,55,74,0.25)" : "rgba(0,0,0,0.4)",
                      border: `1px solid ${favorites.includes(dish.id) ? "rgba(232,55,74,0.6)" : "rgba(255,255,255,0.15)"}`,
                      backdropFilter: "blur(8px)",
                    }}>
                    <Icon name="Heart" size={16} style={{
                      color: favorites.includes(dish.id) ? "#E8374A" : "white",
                      fill: favorites.includes(dish.id) ? "#E8374A" : "none",
                    }} />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold uppercase mb-2" style={{ color: "hsl(var(--foreground))" }}>
                    {dish.name}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{dish.desc}</p>
                  <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span className="flex items-center gap-1"><Icon name="Circle" size={10} />{dish.weight}</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{dish.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold" style={{ color: "var(--flame)" }}>{dish.price}₽</span>
                      {dish.oldPrice && (
                        <span className="text-sm line-through" style={{ color: "hsl(var(--muted-foreground))" }}>{dish.oldPrice}₽</span>
                      )}
                    </div>
                    <button onClick={() => addToCart(dish.id)}
                      className="btn-flame px-4 py-2 rounded-xl text-sm font-bold font-display uppercase tracking-wide">
                      {addedFlash === dish.id ? "✓ Добавлено" : "В корзину"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIDE PHOTO BANNER ── */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl" style={{ height: 320 }}>
          <img src={IMGS.delivery} alt="delivery" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.88) 0%, rgba(232,55,74,0.78) 60%, rgba(0,0,0,0.2) 100%)" }} />
          <div className="relative h-full flex items-center justify-between px-10 md:px-16">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Только сегодня</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-4">
                Первый заказ<br />— без доставки
              </h3>
              <button
                className="px-8 py-3.5 rounded-2xl text-base font-bold font-display uppercase tracking-wide transition-all"
                style={{ background: "white", color: "var(--flame)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFF8F5"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                Получить скидку
              </button>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-display text-8xl font-bold text-white opacity-25 leading-none">FREE</div>
              <div className="font-display text-xl font-bold text-white opacity-60">DELIVERY</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAVORITES ── */}
      {favDishes.length > 0 && (
        <section id="favorites" className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(232,55,74,0.15)" }}>
                <Icon name="Heart" size={24} style={{ color: "#E8374A", fill: "#E8374A" }} />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#E8374A" }}>Ваши</p>
                <h2 className="font-display text-4xl uppercase font-bold" style={{ color: "hsl(var(--foreground))" }}>Избранные блюда</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favDishes.map((dish) => (
                <div key={dish.id} className="food-card rounded-2xl overflow-hidden animate-fade-in-up">
                  <div className="relative h-28 overflow-hidden">
                    <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display font-semibold uppercase text-sm truncate" style={{ color: "hsl(var(--foreground))" }}>
                        {dish.name}
                      </p>
                      <p className="font-bold mt-0.5" style={{ color: "var(--flame)" }}>{dish.price}₽</p>
                    </div>
                    <button onClick={() => addToCart(dish.id)}
                      className="btn-flame w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
