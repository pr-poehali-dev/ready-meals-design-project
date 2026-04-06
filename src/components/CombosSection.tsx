import Icon from "@/components/ui/icon";

const COMBOS = [
  {
    id: 101, name: "Вечер вдвоём", emoji: "👫",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&fit=crop",
    items: ["Пицца Маргарита", "2× Цезарь", "2× Напиток"],
    price: 1290, oldPrice: 1680, save: 390,
    accent: "#FF6B1A",
  },
  {
    id: 102, name: "Офисный обед", emoji: "💼",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    items: ["Смоки Бургер", "Картофель фри", "Напиток"],
    price: 690, oldPrice: 890, save: 200,
    accent: "#FFB830",
  },
  {
    id: 103, name: "Суши-пати", emoji: "🎉",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80&fit=crop",
    items: ["Филадельфия XL", "Дракон", "Мисо-суп ×2"],
    price: 1490, oldPrice: 1900, save: 410,
    accent: "#E8374A",
  },
];

interface CombosSectionProps {
  favorites: number[];
  toggleFav: (id: number) => void;
  addToCart: (id: number) => void;
  addedFlash: number | null;
}

export default function CombosSection({ favorites, toggleFav, addToCart, addedFlash }: CombosSectionProps) {
  return (
    <>
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
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={combo.img} alt={combo.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)" }} />
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
    </>
  );
}
