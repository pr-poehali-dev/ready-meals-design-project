import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Бургеры", "Суши", "Пицца", "Вок", "Салаты", "Десерты"];

const DISHES = [
  {
    id: 1,
    name: "Смоки Бургер",
    category: "Бургеры",
    price: 490,
    oldPrice: 590,
    emoji: "🍔",
    tag: "ХИТ",
    tagColor: "#FF6B1A",
    desc: "Двойная котлета, бекон, чеддер, копчёный соус",
    weight: "350г",
    time: "25 мин",
  },
  {
    id: 2,
    name: "Филадельфия XL",
    category: "Суши",
    price: 720,
    oldPrice: null,
    emoji: "🍣",
    tag: "НОВИНКА",
    tagColor: "#E8374A",
    desc: "Лосось, сливочный сыр, огурец, икра",
    weight: "280г",
    time: "20 мин",
  },
  {
    id: 3,
    name: "Маргарита Deluxe",
    category: "Пицца",
    price: 650,
    oldPrice: 780,
    emoji: "🍕",
    tag: "−17%",
    tagColor: "#FFB830",
    desc: "Томаты, моцарелла, базилик, оливковое масло",
    weight: "500г",
    time: "30 мин",
  },
  {
    id: 4,
    name: "Вок с уткой",
    category: "Вок",
    price: 550,
    oldPrice: null,
    emoji: "🥢",
    tag: "ОСТРЫЙ",
    tagColor: "#E8374A",
    desc: "Утиное филе, лапша удон, овощи, терияки",
    weight: "420г",
    time: "22 мин",
  },
  {
    id: 5,
    name: "Цезарь Роял",
    category: "Салаты",
    price: 380,
    oldPrice: null,
    emoji: "🥗",
    tag: null,
    tagColor: "",
    desc: "Курица гриль, романо, пармезан, анчоусы",
    weight: "300г",
    time: "15 мин",
  },
  {
    id: 6,
    name: "Тирамису",
    category: "Десерты",
    price: 290,
    oldPrice: 350,
    emoji: "🍰",
    tag: "ХИТ",
    tagColor: "#FF6B1A",
    desc: "Маскарпоне, эспрессо, савоярди, какао",
    weight: "180г",
    time: "10 мин",
  },
];

const COMBOS = [
  {
    id: 101,
    name: "Вечер вдвоём",
    emoji: "👫",
    items: ["Пицца Маргарита", "2× Цезарь", "2× Напиток"],
    price: 1290,
    oldPrice: 1680,
    save: 390,
    gradient: "linear-gradient(135deg, #FF6B1A 0%, #E8374A 100%)",
  },
  {
    id: 102,
    name: "Офисный обед",
    emoji: "💼",
    items: ["Смоки Бургер", "Картофель фри", "Напиток"],
    price: 690,
    oldPrice: 890,
    save: 200,
    gradient: "linear-gradient(135deg, #FFB830 0%, #FF6B1A 100%)",
  },
  {
    id: 103,
    name: "Суши-пати",
    emoji: "🎉",
    items: ["Филадельфия XL", "Дракон", "Мисо-суп ×2"],
    price: 1490,
    oldPrice: 1900,
    save: 410,
    gradient: "linear-gradient(135deg, #E8374A 0%, #9B1FBB 100%)",
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
  const [favFlash, setFavFlash] = useState<number | null>(null);
  const [addedFlash, setAddedFlash] = useState<number | null>(null);

  const toggleFav = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    setFavFlash(id);
    setTimeout(() => setFavFlash(null), 400);
  };

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    setAddedFlash(id);
    setTimeout(() => setAddedFlash(null), 800);
  };

  const filtered =
    activeCategory === "Все"
      ? DISHES
      : DISHES.filter((d) => d.category === activeCategory);

  const favDishes = DISHES.filter((d) => favorites.includes(d.id));

  return (
    <div className="min-h-screen font-body" style={{ background: "var(--dark)" }}>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(15,12,9,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--dark-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span
            className="font-display text-2xl font-bold tracking-widest uppercase"
            style={{ color: "var(--flame)" }}
          >
            ВКУСНО
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Меню", "Комбо", "Акции", "Доставка"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium tracking-wide transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--flame)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {favorites.length > 0 && (
            <a
              href="#favorites"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: "rgba(232,55,74,0.15)",
                border: "1px solid rgba(232,55,74,0.3)",
                color: "#E8374A",
              }}
            >
              <Icon name="Heart" size={14} />
              {favorites.length}
            </a>
          )}
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold btn-flame">
            <Icon name="ShoppingBag" size={16} />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: "var(--gold)", color: "#000" }}
              >
                {cart.length}
              </span>
            )}
            Корзина
          </button>
        </div>
      </nav>

      {/* TICKER */}
      <div
        className="ticker-wrap"
        style={{
          background: "var(--flame)",
          padding: "10px 0",
          paddingTop: "calc(72px + 10px)",
          marginTop: "0",
        }}
      >
        <div className="ticker-inner text-sm font-semibold text-white tracking-wide">
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 py-20 md:py-32"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,107,26,0.18) 0%, transparent 70%), var(--dark)",
        }}
      >
        <div
          className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--flame) 0%, transparent 70%)",
            transform: "translateX(30%)",
          }}
        />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in-up"
              style={{
                background: "rgba(255,107,26,0.12)",
                border: "1px solid rgba(255,107,26,0.3)",
                color: "var(--flame-light)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Доставим за 30 минут
            </div>

            <div className="animate-fade-in-up delay-100">
              <h1
                className="font-display uppercase leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.9 }}
              >
                <span style={{ color: "hsl(var(--foreground))" }}>ЕДА</span>
                <br />
                <span className="text-gradient">КОТОРУЮ</span>
                <br />
                <span style={{ color: "hsl(var(--foreground))" }}>ВЫ ЖДЁТЕ</span>
              </h1>
            </div>

            <p
              className="text-lg max-w-md animate-fade-in-up delay-200"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Горячие блюда из лучших ресторанов города — прямо к вашей двери. Без компромиссов.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                className="btn-flame px-8 py-4 rounded-2xl text-lg font-bold font-display uppercase tracking-wide"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                Заказать сейчас
              </button>
              <button
                className="px-8 py-4 rounded-2xl text-lg font-bold font-display uppercase tracking-wide transition-all"
                style={{
                  background: "transparent",
                  border: "2px solid var(--dark-border)",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--flame)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--dark-border)")}
                onClick={() => document.getElementById("combos")?.scrollIntoView({ behavior: "smooth" })}
              >
                Комбо-наборы
              </button>
            </div>

            <div className="flex gap-8 pt-4 animate-fade-in-up delay-400">
              {[
                { val: "30 мин", label: "Доставка" },
                { val: "4.9★", label: "Рейтинг" },
                { val: "1000+", label: "Клиентов" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold" style={{ color: "var(--flame)" }}>
                    {stat.val}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex items-center justify-center min-h-[320px]">
            <div
              className="absolute inset-0 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, var(--flame) 0%, transparent 70%)" }}
            />
            <div
              className="animate-float text-center select-none"
              style={{ fontSize: "clamp(8rem, 18vw, 14rem)", lineHeight: 1 }}
            >
              🍔
            </div>
            {[
              { style: { top: "10%", left: "5%" }, emoji: "🍕", delay: "0.5s" },
              { style: { top: "15%", right: "5%" }, emoji: "🍣", delay: "1s" },
              { style: { bottom: "20%", left: "10%" }, emoji: "🥗", delay: "1.5s" },
              { style: { bottom: "15%", right: "8%" }, emoji: "🍰", delay: "2s" },
            ].map((chip, i) => (
              <div
                key={i}
                className="absolute text-4xl animate-float"
                style={{
                  ...chip.style,
                  animationDelay: chip.delay,
                  animationDuration: "4s",
                  opacity: 0.7,
                }}
              >
                {chip.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--flame)" }}
              >
                Наше меню
              </p>
              <h2
                className="font-display text-5xl md:text-6xl uppercase font-bold"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Выбери <span className="text-gradient">вкус</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cat-pill px-4 py-2 rounded-full text-sm font-medium ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dish, i) => (
              <div
                key={dish.id}
                className="food-card rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
              >
                <div
                  className="relative h-44 flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 60% 40%, rgba(255,107,26,0.15) 0%, transparent 70%), var(--dark-card)",
                  }}
                >
                  <span className="text-7xl select-none">{dish.emoji}</span>
                  {dish.tag && (
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white"
                      style={{ background: dish.tagColor }}
                    >
                      {dish.tag}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFav(dish.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: favorites.includes(dish.id)
                        ? "rgba(232,55,74,0.2)"
                        : "rgba(255,255,255,0.05)",
                      border: `1px solid ${favorites.includes(dish.id) ? "rgba(232,55,74,0.5)" : "var(--dark-border)"}`,
                    }}
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={favFlash === dish.id ? "animate-heartbeat" : ""}
                      style={{
                        color: favorites.includes(dish.id) ? "#E8374A" : "hsl(var(--muted-foreground))",
                        fill: favorites.includes(dish.id) ? "#E8374A" : "none",
                      }}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h3
                    className="font-display text-xl font-semibold uppercase mb-2"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {dish.desc}
                  </p>

                  <div
                    className="flex items-center gap-4 mb-4 text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <span className="flex items-center gap-1">
                      <Icon name="Scale" size={12} fallback="Circle" />
                      {dish.weight}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {dish.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold" style={{ color: "var(--flame)" }}>
                        {dish.price}₽
                      </span>
                      {dish.oldPrice && (
                        <span className="text-sm line-through" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {dish.oldPrice}₽
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(dish.id)}
                      className="btn-flame px-4 py-2 rounded-xl text-sm font-bold font-display uppercase tracking-wide"
                    >
                      {addedFlash === dish.id ? "✓ Добавлено" : "В корзину"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMBOS */}
      <section
        id="combos"
        className="px-6 py-16"
        style={{
          background: "linear-gradient(180deg, var(--dark) 0%, rgba(255,107,26,0.06) 50%, var(--dark) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
              Выгодно и вкусно
            </p>
            <h2
              className="font-display text-5xl md:text-6xl uppercase font-bold"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Комбо-<span className="text-gradient">наборы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMBOS.map((combo, i) => (
              <div
                key={combo.id}
                className="relative rounded-2xl overflow-hidden animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  border: "1px solid var(--dark-border)",
                }}
              >
                <div className="p-6 pb-4" style={{ background: combo.gradient }}>
                  <div className="text-5xl mb-3">{combo.emoji}</div>
                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                    Комбо «{combo.name}»
                  </h3>
                  <div
                    className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(0,0,0,0.25)", color: "white" }}
                  >
                    Экономия {combo.save}₽
                  </div>
                </div>

                <div className="p-6" style={{ background: "var(--dark-card)" }}>
                  <ul className="space-y-2 mb-6">
                    {combo.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--flame)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>
                        {combo.price}₽
                      </span>
                      <span className="ml-2 text-sm line-through" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {combo.oldPrice}₽
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(combo.id)}
                      className="btn-flame px-4 py-2 rounded-xl text-sm font-bold font-display uppercase tracking-wide"
                    >
                      {addedFlash === combo.id ? "✓" : "Взять"}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleFav(combo.id)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <Icon
                    name="Heart"
                    size={16}
                    style={{
                      color: favorites.includes(combo.id) ? "#E8374A" : "white",
                      fill: favorites.includes(combo.id) ? "#E8374A" : "none",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAVORITES */}
      {favDishes.length > 0 && (
        <section id="favorites" className="px-6 py-16" style={{ background: "var(--dark)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(232,55,74,0.15)" }}
              >
                <Icon name="Heart" size={24} style={{ color: "#E8374A", fill: "#E8374A" }} />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#E8374A" }}>
                  Ваши
                </p>
                <h2
                  className="font-display text-4xl uppercase font-bold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  Избранные блюда
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="food-card rounded-2xl p-4 flex items-center gap-4 animate-fade-in-up"
                >
                  <span className="text-4xl">{dish.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display font-semibold uppercase text-sm truncate"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {dish.name}
                    </p>
                    <p className="font-bold mt-0.5" style={{ color: "var(--flame)" }}>
                      {dish.price}₽
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(dish.id)}
                    className="btn-flame w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section
        className="px-6 py-20"
        style={{
          background: "var(--dark-card)",
          borderTop: "1px solid var(--dark-border)",
          borderBottom: "1px solid var(--dark-border)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-display text-4xl md:text-5xl uppercase font-bold"
              style={{ color: "hsl(var(--foreground))" }}
            >
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
              <div
                key={step.step}
                className="relative text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}
              >
                <div
                  className="relative w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(255,107,26,0.1)",
                    border: "1px solid rgba(255,107,26,0.25)",
                  }}
                >
                  <Icon name={step.icon as "Smartphone"} size={26} style={{ color: "var(--flame)" }} />
                  <span
                    className="absolute -top-2 -right-2 font-display text-xs font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: "var(--flame)", color: "white" }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  className="font-display text-lg font-semibold uppercase mb-2"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,26,0.2) 0%, rgba(232,55,74,0.2) 100%)",
            border: "1px solid rgba(255,107,26,0.3)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, var(--flame) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--crimson) 0%, transparent 50%)",
            }}
          />
          <div className="relative">
            <div className="text-5xl mb-4">🎁</div>
            <h2
              className="font-display text-4xl md:text-5xl uppercase font-bold mb-4"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Первый заказ —<br />
              <span className="text-gradient">бесплатная доставка</span>
            </h2>
            <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              Зарегистрируйтесь и получите подарок к первому заказу
            </p>
            <button className="btn-flame px-10 py-4 rounded-2xl text-lg font-bold font-display uppercase tracking-wide">
              Получить подарок
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-6 py-12"
        style={{
          background: "var(--dark-card)",
          borderTop: "1px solid var(--dark-border)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span
              className="font-display text-xl font-bold tracking-widest uppercase"
              style={{ color: "var(--flame)" }}
            >
              ВКУСНО
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {["О нас", "Условия доставки", "Политика конфиденциальности", "Контакты"].map((link) => (
              <a key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            © 2026 ВКУСНО
          </p>
        </div>
      </footer>
    </div>
  );
}
