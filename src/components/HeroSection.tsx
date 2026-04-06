const IMGS = {
  hero:    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=85&fit=crop",
  banner1: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85&fit=crop",
  banner2: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=85&fit=crop",
};

export default function HeroSection() {
  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden" style={{ height: "92vh", minHeight: 560 }}>
        <img
          src={IMGS.hero}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.65) 50%, rgba(10,7,4,0.2) 100%)" }}
        />
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

      {/* ── PROMO STRIP ── */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
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
    </>
  );
}
