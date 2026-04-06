import Icon from "@/components/ui/icon";

const TICKER_ITEMS = [
  "🔥 Бесплатная доставка от 800₽",
  "⚡ Доставка за 30 минут",
  "🎁 Подарок при первом заказе",
  "⭐ 4.9 — рейтинг клиентов",
  "🛵 1000+ довольных клиентов",
];
const tickerText = TICKER_ITEMS.join("   ·   ");

interface NavbarProps {
  favorites: number[];
  cart: number[];
}

export default function Navbar({ favorites, cart }: NavbarProps) {
  return (
    <>
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

      <div className="ticker-wrap" style={{ background: "var(--flame)", padding: "10px 0", paddingTop: "calc(72px + 10px)" }}>
        <div className="ticker-inner text-sm font-semibold text-white tracking-wide">
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>
    </>
  );
}
