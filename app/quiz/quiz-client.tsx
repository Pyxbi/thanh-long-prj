'use client'

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { SharePreview } from "@/components/quiz/ShareCard";
import { readLongGiaUser } from "@/components/long-gia-auth";
import {
  calcResult,
  colorLabel,
  images,
  questions,
  results,
  type AnswerColor,
} from "@/components/quiz/quiz-data";
import { cn } from "@/lib/utils";

type Screen = "landing" | "quiz" | "loading" | "result";
const REWARD = 100;
const MOCK_PREV_POINTS = 60;

const accent: Record<AnswerColor, { selected: string; text: string; soft: string }> = {
  red: { selected: "border-[#BA466D] bg-[#BA466D]/10", text: "text-[#BA466D]", soft: "bg-[#BA466D]/10" },
  white: { selected: "border-[#6E8644] bg-[#F0E8DD]", text: "text-[#6E8644]", soft: "bg-[#F0E8DD]" },
  yellow: { selected: "border-[#E8CDA8] bg-[#E8CDA8]/25", text: "text-[#822944]", soft: "bg-[#E8CDA8]/30" },
};

export function QuizClient() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerColor[]>([]);

  const begin = () => {
    setAnswers([]);
    setStep(0);
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = () => (loggedIn ? begin() : setLoginOpen(true));

  useEffect(() => {
    const user = readLongGiaUser();
    setLoggedIn(Boolean(user));

    const params = new URLSearchParams(window.location.search);
    if (params.get("start") !== "1") return;

    window.history.replaceState(null, "", "/quiz");
    if (user) {
      begin();
    } else {
      setLoginOpen(true);
    }
  }, []);

  const choose = (c: AnswerColor) => {
    const next = [...answers.slice(0, step), c];
    setAnswers(next);
    setTimeout(() => {
      if (step < 4) setStep(step + 1);
      else setScreen("loading");
    }, 450);
  };

  useEffect(() => {
    if (screen !== "loading") return;
    const t = setTimeout(() => setScreen("result"), 1800);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main
        data-testid="quiz-main"
        className={cn("flex-1", screen === "landing" ? "pb-0 pt-0" : "pb-12 pt-28 md:pb-20 md:pt-36")}
      >
        {screen === "landing" && <QuizHero onStart={start} />}
        {screen === "quiz" && (
          <QuizQuestion key={step} step={step} selected={answers[step]} onChoose={choose} onBack={() => { if (step > 0) setStep(step - 1); }} />
        )}
        {screen === "loading" && <ResultLoading />}
        {screen === "result" && <QuizResult answers={answers} onReplay={begin} />}
      </main>
      <Footer />
      <QuizLoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={() => {
          setLoggedIn(true);
          setLoginOpen(false);
          begin();
        }}
      />
    </div>
  );
}

function QuizHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#f8f1e7]">
      <img
        src="/images/quiz-hero-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fffaf3]/85 via-[#fffaf3]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fffaf3]/45 via-transparent to-white/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fffaf3]/60 to-transparent" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 py-14 md:px-8 lg:py-20">
        <div className="relative z-20 w-full max-w-xl animate-reveal rounded-[2rem] border border-white/70 bg-[#fffaf3]/72 p-6 shadow-[0_24px_70px_rgba(130,41,68,0.12)] backdrop-blur-[3px] sm:p-8 md:ml-auto md:mr-[5%] md:max-w-[34rem] md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F0E8DD] px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#6E8644]">
            <Sparkles className="h-3.5 w-3.5" /> TRẮC NGHIỆM LONG GIA
          </span>
          <h1 className="mt-6 text-5xl font-medium leading-[1.05] text-[#822944] md:text-6xl lg:text-7xl">
            Bí Kíp Sống <em className="text-[#BA466D]">Trọn Ngày!</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Chỉ với 5 câu hỏi nhanh để hiểu hơn về bản thân và nhận ngay{" "}
            <strong className="font-semibold text-[#BA466D]">100 điểm thưởng</strong> tích lũy.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button type="button" size="lg" onClick={onStart} className="h-13 rounded-full bg-[#BA466D] px-7 text-base text-white shadow-sm hover:bg-[#BA466D]/90">
              Làm Trắc Nghiệm Ngay <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" asChild className="h-13 rounded-full border-[#6E8644]/40 px-7 text-base text-[#6E8644] hover:bg-[#F0E8DD] hover:text-[#6E8644]">
              <a href="/">Tìm hiểu thêm về Long Gia</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-5 text-sm text-muted-foreground">
            {(["red", "white", "yellow"] as AnswerColor[]).map((c) => (
              <span key={c} className="flex items-center gap-2">
                Long {colorLabel[c]}
              </span>
            ))}
          </div>
        </div>
        <img
          src="/images/mascot-red-transparent.png"
          alt="Mascot thanh long đỏ Long Gia"
          width={1052}
          height={1494}
          className="quiz-mascot pointer-events-none absolute bottom-[-1.5rem] left-[-1.5rem] z-10 w-[clamp(12rem,26vw,21rem)] drop-shadow-[0_18px_12px_rgba(80,55,25,0.2)] md:left-[4%] lg:w-[clamp(15rem,25vw,24rem)]"
        />
        <div className="absolute bottom-5 left-[7%] z-0 hidden h-8 w-48 rounded-[50%] bg-[#822944]/15 blur-xl md:block" />
      </div>
    </section>
  );
}

function QuizLoginDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSuccess: () => void;
}) {
  const isMobile = useIsMobile();
  const [phone, setPhone] = useState("");
  const valid = phone.replace(/\D/g, "").length >= 9;

  const body = (
    <form
      className="mt-2 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSuccess();
      }}
    >
      <label className="block text-sm font-medium" htmlFor="phone">
        Số điện thoại
      </label>
      <Input
        id="phone"
        type="tel"
        inputMode="tel"
        placeholder="Nhập số điện thoại..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 rounded-xl"
      />
      <Button type="submit" disabled={!valid} className="h-12 w-full rounded-full text-base bg-[#BA466D] text-white hover:bg-[#BA466D]/90">
        Tiếp tục
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <a href="/long-gia-nha-toi/dang-ky?returnTo=%2Fquiz%3Fstart%3D1" className="font-medium text-[#BA466D] underline-offset-4 hover:underline">
          Đăng ký tài khoản
        </a>
      </p>
    </form>
  );

  const title = "Bạn chưa đăng nhập?";
  const desc = "Đăng nhập để lưu kết quả quiz và nhận điểm thưởng Long Gia.";

  if (isMobile)
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-8">
          <SheetHeader className="px-0 text-left">
            <SheetTitle className="font-serif text-2xl text-[#822944]">{title}</SheetTitle>
            <SheetDescription>{desc}</SheetDescription>
          </SheetHeader>
          {body}
        </SheetContent>
      </Sheet>
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl p-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl font-medium text-[#822944]">{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  );
}

function QuizQuestion({
  step,
  selected,
  onChoose,
  onBack,
}: {
  step: number;
  selected: AnswerColor | undefined;
  onChoose: (c: AnswerColor) => void;
  onBack: () => void;
}) {
  const q = questions[step]!;
  const [picked, setPicked] = useState<AnswerColor | undefined>(selected);
  return (
    <section className="mx-auto max-w-6xl px-5 py-4 md:py-8">
      <div className="sticky top-[88px] lg:top-[104px] z-10 -mx-5 bg-background/90 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-[#822944]">Câu {step + 1} / 5</span>
          {step > 0 && (
            <button onClick={onBack} className="text-muted-foreground hover:text-[#BA466D]">
              ← Câu trước
            </button>
          )}
        </div>
        <Progress value={((step + (picked ? 1 : 0)) / 5) * 100} className="mt-2 h-2 bg-[#F0E8DD] [&>div]:bg-[#BA466D] [&>div]:transition-all [&>div]:duration-500" />
      </div>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-reveal">
          <h2 className="text-3xl font-medium leading-tight text-[#822944] md:text-5xl">{q.q}</h2>
          <div className="mt-8 space-y-3">
            {(["red", "white", "yellow"] as AnswerColor[]).map((c) => {
              const active = picked === c;
              return (
                <button
                  key={c}
                  disabled={!!picked && picked !== selected}
                  onClick={() => {
                    setPicked(c);
                    onChoose(c);
                  }}
                  className={cn(
                    "group flex w-full items-center rounded-2xl border-2 border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BA466D]/40 hover:shadow-md",
                    active && accent[c].selected,
                  )}
                >
                  <span className="flex-1 text-base leading-snug md:text-lg">{q.answers[c]}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="order-first md:order-none">
          <div className="aspect-[16/10] overflow-hidden rounded-[2rem] shadow-md md:aspect-[4/5]">
            <img src={q.image} alt={q.imageAlt} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultLoading() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-5">
      <div className="text-center animate-reveal">
        <p className="font-serif text-2xl text-[#822944] md:text-3xl">Đang khám phá phong cách sống của bạn...</p>
      </div>
    </section>
  );
}

function QuizResult({ answers, onReplay }: { answers: AnswerColor[]; onReplay: () => void }) {
  const [shareOpen, setShareOpen] = useState(false);
  const result = calcResult(answers);
  const r = results[result];
  const a = accent[result];
  const counts = { red: 0, white: 0, yellow: 0 };
  answers.forEach((x) => counts[x]++);

  return (
    <section className="mx-auto max-w-6xl px-5 py-4 md:py-8">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative animate-reveal">
          <div className={cn("absolute -inset-4 -z-0 rounded-[3rem]", a.soft)} />
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-md">
            <img src={r.image} alt={r.title} width={1024} height={1024} className="h-full w-full object-cover bg-muted" />
          </div>
        </div>
        <div className="animate-reveal" style={{ animationDelay: '150ms' }}>
          <span className={cn("text-xs font-semibold tracking-[0.2em]", a.text)}>KẾT QUẢ CỦA BẠN</span>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-[#822944] md:text-5xl">{r.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{r.desc}</p>

          <div className="mt-8 flex items-center gap-5 rounded-3xl border border-border bg-[#F0E8DD]/60 p-5">
            <div className="animate-pop font-serif text-5xl text-[#BA466D]" style={{ animationDelay: '500ms' }}>+{REWARD}</div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">Điểm thưởng của bạn</p>
              <p className="text-muted-foreground">Điểm đã được cộng sau khi hoàn thành quiz.</p>
              <p className="mt-1 font-medium text-[#6E8644]">Tổng điểm: {MOCK_PREV_POINTS + REWARD}</p>
            </div>
          </div>

          <div className="mt-8">
            <Button size="lg" asChild className="h-13 rounded-full px-8 text-base shadow-sm bg-[#BA466D] text-white hover:bg-[#BA466D]/90">
              <a href="/long-gia-nha-toi">Sử dụng điểm ngay <ArrowRight /></a>
            </Button>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Khám phá Long Gia Nhà Tôi — nơi điểm tích lũy có thể được sử dụng cho các hoạt động và trải nghiệm của Long Gia.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground" onClick={() => setShareOpen(true)}>
              <Share2 /> Chia sẻ kết quả
            </Button>
            <Button variant="ghost" className="rounded-full text-[#6E8644] hover:bg-[#F0E8DD] hover:text-[#6E8644]" onClick={onReplay}>
              <RotateCcw /> Chơi lại
            </Button>
          </div>
          <SharePreview color={result} open={shareOpen} onOpenChange={setShareOpen} />

          <div className="mt-10 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">Bạn đã chọn</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {(["red", "white", "yellow"] as AnswerColor[]).map((c) => (
                <span key={c} className="flex items-center gap-2">
                  {colorLabel[c]}: {counts[c]} câu
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
