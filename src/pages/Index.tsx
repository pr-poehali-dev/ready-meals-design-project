import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Бургеры", "Суши", "Пицца", "Вок", "Салаты", "Десерты"];

// Real Unsplash photo IDs
const IMGS = {
  hero:     "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=85&fit=crop",
  burger:   "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&fit=crop",
  sushi:    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80&fit=crop",
  pizza:    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop",
  wok:      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fit=crop",
  salad:    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&fit=crop",
  dessert:  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80&fit=crop",
  combo1:   "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&fit=crop",
  combo2:   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
  combo3:   "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80&fit=crop",
  banner1:  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85&fit=crop",
  banner2:  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=85&fit=crop",
  delivery: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80&fit=crop",
};

const DISHES = [
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

const COMBOS = [
  {
    id: 101, name: "Вечер вдвоём", emoji: "👫",
    img: IMGS.combo1,
    items: ["Пицца Маргарита", "2× Цезарь", "2× Напиток"],
    price: 1290, oldPrice: 1680, save: 390,
    accent: "#FF6B1A",
  },
  {
    id: 102, name: "Офисный обед", emoji: "💼",
    img: IMGS.combo2,
    items: ["Смоки Бургер", "Картофель фри", "Напиток"],
    price: 690, oldPrice: 890, save: 200,
    accent: "#FFB830",
  },
  {
    id: 103, name: "Суши-пати", emoji: "🎉",
    img: IMGS.combo3,
    items: ["Филадельфия XL", "Дракон", "Мисо-суп ×2"],
    price: 1490, oldPrice: 1900, save: 410,
    accent: "#E8374A",
  },
];

const TICKER_ITEMS = [
  "🔥 Бесплатная доставка от 800₽",
  "⚡ Доставка за 30 минут",
  "🎁 Подарок при первом заказе",
  "⭐ 4.9 — рейтинг клиентов",
  "🛵 1000+ довольных клиентов",
];
const tickerText = TICKER_ITEMS.join("   ·   ");

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

  const filtered = activeCategory === "Все" ? DISHES : DISHES.filter((d) => d.category === activeCategory);
  const favDishes = DISHES.filter((d) => favorites.includes(d.id));

  return (
    <div className="min-h-screen font-body" style={{ background: "var(--dark)" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(15,12,9,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--dark-border)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-display text-2xl font-bold tracking-widest uppercase" style={{ color: "var(--flame)" }}>
            ВКУСНО
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Меню", "Комбо", "Акции", "Доставка"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium tracking-wide transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--flame)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {favorites.length > 0 && (
            <a href="#favorites"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ background: "rgba(232,55,74,0.15)", border: "1px solid rgba(232,55,74,0.3)", color: "#E8374A" }}
            >
              <Icon name="Heart" size={14} /> {favorites.length}
            </a>
          )}
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold btn-flame">
            <Icon name="ShoppingBag" size={16} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: "var(--gold)", color: "#000" }}>
                {cart.length}
              </span>
            )}
            Корзина
          </button>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="ticker-wrap" style={{ background: "var(--flame)", padding: "10px 0", paddingTop: "calc(72px + 10px)" }}>
        <div className="ticker-inner text-sm font-semibold text-white tracking-wide">
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden" style={{ height: "92vh", minHeight: 560 }}>
        <img
          src={IMGS.hero}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        {/* dark overlay with gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.65) 50%, rgba(10,7,4,0.2) 100%)" }}
        />
        {/* color accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 10% 60%, rgba(255,107,26,0.2) 0%, transparent 70%)" }}
        />

        <div className="relative h-full flex items-center px-6 md:px-16">
          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in-up"
              style={{ background: "rgba(255,107,26,0.15)", border: "1px solid rgba(255,107,26,0.35)", color: "var(--flame-light)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Доставим за 30 минут
            </div>

            <h1 className="font-display uppercase animate-fade-in-up delay-100"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.88, color: "white" }}>
              ЕДА<br />
              <span className="text-gradient">КОТОРУЮ</span><br />
              ВЫ ЖДЁТЕ
            </h1>

            <p className="text-lg max-w-md animate-fade-in-up delay-200" style={{ color: "rgba(255,255,255,0.65)" }}>
              Горячие блюда из лучших ресторанов города — прямо к вашей двери. Без компромиссов.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button className="btn-flame px-8 py-4 rounded-2xl text-lg font-bold font-display uppercase tracking-wide"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
                Заказать сейчас
              </button>
              <button
                className="px-8 py-4 rounded-2xl text-lg font-bold font-display uppercase tracking-wide transition-all"
                style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(8px)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--flame)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)")}
                onClick={() => document.getElementById("combos")?.scrollIntoView({ behavior: "smooth" })}>
                Комбо-наборы
              </button>
            </div>

            <div className="flex gap-10 pt-2 animate-fade-in-up delay-400">
              {[{ val: "30 мин", label: "Доставка" }, { val: "4.9★", label: "Рейтинг" }, { val: "1000+", label: "Клиентов" }].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold" style={{ color: "var(--flame)" }}>{s.val}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO STRIP (2 wide banners) ── */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
          {/* Banner 1 */}
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 220 }}>
            <img src={IMGS.banner1} alt="promo" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,7,4,0.85) 0%, rgba(10,7,4,0.3) 100%)" }} />
            <div className="relative h-full flex flex-col justify-center px-8">
              <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>Акция</span>
              <h3 className="font-display text-3xl font-bold uppercase text-white leading-tight mb-3">
                Бесплатная<br />доставка
              </h3>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>При заказе от 800₽</p>
              <button className="btn-flame self-start px-5 py-2.5 rounded-xl text-sm font-bold font-display uppercase tracking-wide">
                Заказать
              </button>
            </div>
          </div>
          {/* Banner 2 */}
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 220 }}>
            <img src={IMGS.banner2} alt="promo2" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,7,4,0.85) 0%, rgba(10,7,4,0.3) 100%)" }} />
            <div className="relative h-full flex flex-col justify-center px-8">
              <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E8374A" }}>Новинка</span>
              <h3 className="font-display text-3xl font-bold uppercase text-white leading-tight mb-3">
                Сет на двоих<br />−20%
              </h3>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>Только до конца недели</p>
              <button
                className="self-start px-5 py-2.5 rounded-xl text-sm font-bold font-display uppercase tracking-wide transition-all"
                style={{ background: "rgba(232,55,74,0.9)", color: "white" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#E8374A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(232,55,74,0.9)")}
              >
                Смотреть
              </button>
            </div>
          </div>
        </div>
      </section>

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
                {/* Photo */}
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
                {/* Info */}
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

      {/* ── COMBOS ── */}
      <section id="combos" className="px-6 py-16" style={{ background: "rgba(255,107,26,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>Выгодно и вкусно</p>
            <h2 className="font-display text-5xl md:text-6xl uppercase font-bold" style={{ color: "hsl(var(--foreground))" }}>
              Комбо-<span className="text-gradient">наборы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMBOS.map((combo, i) => (
              <div key={combo.id}
                className="relative rounded-2xl overflow-hidden animate-fade-in-up food-card"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                {/* Photo header */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={combo.img} alt={combo.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)" }} />
                  {/* Save badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: combo.accent }}>
                    −{combo.save}₽
                  </div>
                  <div className="absolute bottom-4 left-4 right-12">
                    <div className="text-2xl mb-1">{combo.emoji}</div>
                    <h3 className="font-display text-xl font-bold uppercase text-white leading-tight">
                      Комбо «{combo.name}»
                    </h3>
                  </div>
                  <button onClick={() => toggleFav(combo.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                    <Icon name="Heart" size={16} style={{
                      color: favorites.includes(combo.id) ? "#E8374A" : "white",
                      fill: favorites.includes(combo.id) ? "#E8374A" : "none",
                    }} />
                  </button>
                </div>
                {/* Body */}
                <div className="p-5" style={{ background: "var(--dark-card)" }}>
                  <ul className="space-y-2 mb-5">
                    {combo.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: combo.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>{combo.price}₽</span>
                      <span className="ml-2 text-sm line-through" style={{ color: "hsl(var(--muted-foreground))" }}>{combo.oldPrice}₽</span>
                    </div>
                    <button onClick={() => addToCart(combo.id)}
                      className="btn-flame px-4 py-2 rounded-xl text-sm font-bold font-display uppercase tracking-wide">
                      {addedFlash === combo.id ? "✓" : "Взять"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-20"
        style={{ background: "var(--dark-card)", borderTop: "1px solid var(--dark-border)", borderBottom: "1px solid var(--dark-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl uppercase font-bold" style={{ color: "hsl(var(--foreground))" }}>
              Как это <span className="text-gradient">работает</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "Smartphone", title: "Выберите блюда", desc: "Просматривайте меню, добавляйте в корзину" },
              { step: "02", icon: "MapPin", title: "Укажите адрес", desc: "Доставим куда вам удобно" },
              { step: "03", icon: "CreditCard", title: "Оплатите", desc: "Онлайн или наличными при получении" },
              { step: "04", icon: "Zap", title: "Получите заказ", desc: "Горячим — за 30 минут" },
            ].map((step, i) => (
              <div key={step.step} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}>
                <div className="relative w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(255,107,26,0.1)", border: "1px solid rgba(255,107,26,0.25)" }}>
                  <Icon name={step.icon as "Smartphone"} size={26} style={{ color: "var(--flame)" }} />
                  <span className="absolute -top-2 -right-2 font-display text-xs font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: "var(--flame)", color: "white" }}>{step.step}</span>
                </div>
                <h3 className="font-display text-lg font-semibold uppercase mb-2" style={{ color: "hsl(var(--foreground))" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-12" style={{ background: "var(--dark-card)", borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-display text-xl font-bold tracking-widest uppercase" style={{ color: "var(--flame)" }}>ВКУСНО</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {["О нас", "Условия доставки", "Конфиденциальность", "Контакты"].map((link) => (
              <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>© 2026 ВКУСНО</p>
        </div>
      </footer>
    </div>
  );
}
