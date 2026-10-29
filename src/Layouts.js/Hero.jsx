import { QRCodeSVG } from 'qrcode.react'

const features = ['No sign-up', 'No uploads', 'PNG and SVG downloads']

const CheckIcon = () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const LockIcon = () => (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
)

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-canvas">
            <style>{`
        @keyframes qrf-scan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes qrf-glow {
          0%, 100% { opacity: .5; transform: scale(1); }
          50%      { opacity: .85; transform: scale(1.05); }
        }
        .qrf-scan { animation: qrf-scan 3.2s ease-in-out infinite; }
        .qrf-glow { animation: qrf-glow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .qrf-scan, .qrf-glow { animation: none; }
          .qrf-scan { top: 50%; opacity: 1; }
        }
      `}</style>

            {/* soft light behind the QR side (white, not indigo, so it suits the green) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_45%,rgba(255,255,255,0.28),transparent_70%)]"
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:py-28">
                {/* LEFT: content */}
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-emerald-800 shadow-sm">
                        <LockIcon />
                        Runs fully in your browser
                    </span>

                    <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
                        QR codes that never leave your device.
                    </h1>

                    <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/80">
                        Create QR codes for links, Wi-Fi, and contacts. Nothing is uploaded, stored, or tracked,
                        so what you type stays with you.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#generator"
                            className="rounded-xl bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                        >
                            Generate QR code
                        </a>
                        <a
                            href="#how-it-works"
                            className="rounded-xl px-6 py-3 font-semibold text-ink transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                        >
                            How it works
                        </a>
                    </div>

                    <ul className="mt-8 flex flex-wrap gap-2">
                        {features.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-ink"
                            >
                                <CheckIcon />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT: scanner card */}
                <div className="relative mx-auto w-full max-w-[360px]">
                    <div
                        aria-hidden="true"
                        className="qrf-glow absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-white/50 via-emerald-200/40 to-teal-900/20 blur-3xl"
                    />

                    <div className="relative rounded-3xl bg-white p-4 shadow-[0_0_0_1px_rgba(6,78,59,0.15),0_30px_90px_-20px_rgba(6,78,59,0.6)]">
                        {/* scan area: padding keeps the corner brackets clear of the QR */}
                        <div className="relative overflow-hidden rounded-2xl bg-white p-8">
                            <QRCodeSVG
                                value="https://qrforge.app"
                                size={260}
                                level="M"
                                fgColor="#0F172A"
                                bgColor="#FFFFFF"
                                className="h-auto w-full"
                                role="img"
                                aria-label="Sample QR code"
                            />

                            {/* scanning beam */}
                            <div className="qrf-scan pointer-events-none absolute inset-x-0 z-10">
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas/25 to-transparent" />
                                <div className="h-[3px] w-full bg-canvas shadow-[0_0_16px_4px_rgba(31,171,137,0.6)]" />
                            </div>

                            {/* corner brackets */}
                            <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-tl-xl border-l-[3px] border-t-[3px] border-canvas" />
                            <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 rounded-tr-xl border-r-[3px] border-t-[3px] border-canvas" />
                            <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 rounded-bl-xl border-b-[3px] border-l-[3px] border-canvas" />
                            <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 rounded-br-xl border-b-[3px] border-r-[3px] border-canvas" />
                        </div>

                        {/* status row */}
                        <div className="flex items-center justify-center gap-2 pb-2 pt-1 text-sm text-slate-600">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            Generated on your device
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}   