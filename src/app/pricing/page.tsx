import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Доступ к урокам | Go школа",
  description:
    "Все 12 уроков по Go доступны бесплатно. Изучайте язык в своем темпе и переходите к практике.",
};

const benefits = [
  {
    number: "01",
    title: "Полный курс",
    description: "Все 12 уроков открыты с самого начала — без подписки и ограничений.",
  },
  {
    number: "02",
    title: "Практика в каждом шаге",
    description: "Разбирайте примеры, выполняйте задания и закрепляйте новые понятия.",
  },
  {
    number: "03",
    title: "Учитесь в своем темпе",
    description: "Возвращайтесь к темам и проходите программу тогда, когда вам удобно.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f5] text-[#112a2b]">
      <section className="relative isolate px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#d9efeb] blur-3xl"
        />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9d8d2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#287d77]">
                <span className="h-2 w-2 rounded-full bg-[#42b49e]" />
                Прозрачно и без условий
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl">
                Учитесь Go.
                <br />
                <span className="text-[#318b80]">Курс уже открыт.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#536968] sm:text-xl">
                Все 12 уроков доступны бесплатно. Читайте объяснения, пробуйте
                примеры и собирайте знания шаг за шагом.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/tutorials"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#123b3b] px-7 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(18,59,59,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1b5551]"
                  style={{ color: "#fff" }}
                >
                  Открыть программу
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <span className="inline-flex min-h-14 items-center justify-center rounded-xl border border-[#cbdad7] bg-white/70 px-6 py-4 text-sm font-medium text-[#536968]">
                  Без карты и регистрации для чтения
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rotate-3 rounded-[2rem] bg-[#b9e0d8]" />
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[#102e31] p-7 text-white shadow-[0_28px_80px_rgba(16,46,49,0.22)] sm:p-9">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#a8ceca]">Доступ к программе</p>
                    <p className="mt-5 text-6xl font-bold tracking-[-0.06em]">0 ₽</p>
                    <p className="mt-2 text-sm text-[#a8ceca]">все уроки · без оплаты</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#55c5aa] text-[#103432]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="my-8 h-px bg-white/15" />
                <ul className="space-y-4">
                  {[
                    "12 последовательных уроков",
                    "Кодовые примеры и упражнения",
                    "Итоговые практические проекты",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#e0efec]">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#55c5aa]/20 text-[#71ddbf]">
                        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                          <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-xs leading-5 text-[#bdd7d3]">
                  Никаких скрытых платежей — просто открывайте урок и начинайте.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe5e2] bg-white/65 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#398f82]">Что внутри</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              Все необходимое для старта
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.number} className="rounded-2xl border border-[#dfe9e6] bg-white p-6 sm:p-7">
                <p className="font-mono text-sm font-semibold text-[#45a994]">{benefit.number} / 03</p>
                <h3 className="mt-7 text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-[#607372]">{benefit.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#e7f2ef] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-bold">Готовы начать?</h3>
              <p className="mt-1 text-[#5d7370]">Выберите первый урок и двигайтесь дальше в своем ритме.</p>
            </div>
            <Link
              href="/tutorials"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#123b3b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1b5551]"
              style={{ color: "#fff" }}
            >
              Перейти к урокам
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
