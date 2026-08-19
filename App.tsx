import { useState, useEffect } from "react";
import Chapter1 from "./chapters/Chapter1";

interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

const chapters: ChapterInfo[] = [
  {
    id: 1,
    title: "Introduction to C",
    subtitle: "History, Structure, Conventions, Character Set",
    icon: "📖",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Identifiers, Data Types & Variables",
    subtitle: "Keywords, Modifiers, Constants",
    icon: "🔤",
    color: "from-cyan-500 to-sky-500",
  },
  {
    id: 3,
    title: "Operators & Precedence",
    subtitle: "All operators & their rules",
    icon: "➗",
    color: "from-sky-500 to-violet-500",
  },
  {
    id: 4,
    title: "Input & Output Operations",
    subtitle: "printf, scanf, getchar, putchar",
    icon: "⌨️",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: 5,
    title: "Conditional Statements",
    subtitle: "if, else, nested, switch",
    icon: "🔀",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 6,
    title: "Looping Statements",
    subtitle: "for, while, break, continue, nested",
    icon: "🔁",
    color: "from-amber-500 to-orange-500",
  },
];

function ComingSoon({ chapter, onBack }: { chapter: ChapterInfo; onBack: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-3xl">
          🔒
        </div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Chapter {chapter.id} · Unlocks next
        </div>
        <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">{chapter.title}</h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">
          We teach these chapters one by one, in order. Finish{" "}
          <strong className="text-emerald-300">Chapter 1</strong> first — everything else builds on
          it. Just say "teach me chapter {chapter.id}" and I'll create it in full depth.
        </p>
        <button
          onClick={onBack}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-cyan-500"
        >
          ← Back to Chapter 1
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const current = chapters.find((c) => c.id === activeChapter)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSidebarOpen(false);
  }, [activeChapter]);

  const goTo = (id: number) => setActiveChapter(id);
  const next = () => activeChapter < chapters.length && setActiveChapter(activeChapter + 1);
  const prev = () => activeChapter > 1 && setActiveChapter(activeChapter - 1);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl md:h-96 md:w-96"></div>
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl md:h-96 md:w-96"></div>
      </div>

      {/* ===== Top bar ===== */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800 md:hidden"
              aria-label="Open chapter menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 sm:h-10 sm:w-10 sm:text-base">
              C
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold leading-tight text-white sm:text-base md:text-lg">
                C Programming — Unit 1
              </h1>
              <p className="hidden truncate text-xs text-slate-400 sm:block">
                Fundamentals &amp; Control Structures
              </p>
            </div>
          </div>
          <span className="hidden shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 sm:inline-flex">
            Chapter {current.id} / {chapters.length}
          </span>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-7xl">
        {/* ===== Backdrop (mobile) ===== */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          ></div>
        )}

        {/* ===== Sidebar ===== */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform overflow-y-auto border-r border-slate-800 bg-slate-950 transition-transform duration-200 md:sticky md:top-16 md:z-10 md:h-[calc(100vh-64px)] md:max-w-none md:translate-x-0 md:border-r-0 md:pl-2 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 md:hidden">
            <span className="text-sm font-bold text-white">Chapters</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-slate-300 hover:bg-slate-800"
              aria-label="Close menu"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="px-4 pb-6 md:pt-4">
            <h2 className="mb-4 px-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Unit I — Chapters
            </h2>
            <nav className="space-y-2">
              {chapters.map((ch) => {
                const isActive = ch.id === activeChapter;
                const isLocked = ch.id > 1;
                return (
                  <button
                    key={ch.id}
                    onClick={() => goTo(ch.id)}
                    className={`group relative flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-slate-700 bg-slate-800/80"
                        : "border-transparent hover:border-slate-800 hover:bg-slate-900/60"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg shadow-lg ${ch.color} ${
                        isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                      }`}
                    >
                      {ch.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            isActive ? "text-emerald-300" : "text-slate-500"
                          }`}
                        >
                          CH {ch.id}
                        </span>
                        {isLocked && !isActive && (
                          <span className="text-[10px] text-slate-600">🔒</span>
                        )}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        )}
                      </div>
                      <div
                        className={`truncate text-sm font-semibold ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {ch.title}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-slate-500">{ch.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Your position</span>
                <span className="text-emerald-300">
                  Chapter {activeChapter} of {chapters.length}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
                  style={{ width: `${(activeChapter / chapters.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== Main content ===== */}
        <main className="min-w-0 flex-1 px-3 py-6 sm:px-6 md:px-8 md:py-10">
          <div className="mx-auto max-w-3xl">
            {activeChapter === 1 ? (
              <Chapter1 />
            ) : (
              <ComingSoon chapter={current} onBack={() => goTo(1)} />
            )}

            {/* Prev / Next */}
            <div className="mt-10 flex items-center gap-2 border-t border-slate-800 pt-5 sm:gap-3 sm:pt-6">
              <button
                onClick={prev}
                disabled={activeChapter === 1}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:gap-2 sm:px-5 sm:text-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="hidden shrink-0 text-center text-xs text-slate-500 md:block">
                {activeChapter} of {chapters.length}
              </div>

              <button
                onClick={next}
                disabled={activeChapter === chapters.length}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-600/50 bg-gradient-to-r from-emerald-600 to-cyan-600 px-3 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:flex-none sm:gap-2 sm:px-5 sm:text-sm"
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-center text-[11px] text-slate-600">
              C Programming · Unit 1: Fundamentals of C &amp; Control Structures
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
