import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../components/CaseStudies";
import SmoothScroll from "../components/SmoothScroll";
import gsap from "gsap";

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force native scroll to top immediately
    window.scrollTo(0, 0);
    
    // Use gsap.context to scope animations to this component only
    // and prevent conflicts with the previous route's elements
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-el",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-grit-900 text-white">
        <h1 className="text-4xl font-poster uppercase mb-4">Project Not Found</h1>
        <button onClick={() => navigate("/")} className="text-sm font-header tracking-widest border-b border-white/30 pb-1">
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div ref={containerRef} className="min-h-screen bg-grit-900 text-white selection:bg-white selection:text-grit-900 relative">
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 text-xs font-header font-bold tracking-[0.2em] uppercase text-white hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </button>
          <div className="text-xs font-header tracking-[0.3em] uppercase text-white/50">
            PROJECT {project.num}
          </div>
        </nav>

        <main className="pt-32 pb-32 md:pt-48 md:pb-48 px-6 md:px-12 max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <header className="mb-24 md:mb-40 relative">
            <h1 className="reveal-el text-6xl md:text-9xl lg:text-[11rem] font-poster font-bold tracking-[-0.02em] leading-[0.85] uppercase mb-12">
              {project.title}
            </h1>
            
            <div className="reveal-el grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-white/10">
              <div className="md:col-span-1">
                <h3 className="text-[0.65rem] font-header font-bold tracking-[0.25em] text-white/40 uppercase mb-4">
                  Overview
                </h3>
                <p className="text-sm md:text-base font-body text-white/80 leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
              
              <div className="md:col-span-1">
                <h3 className="text-[0.65rem] font-header font-bold tracking-[0.25em] text-white/40 uppercase mb-4">
                  Core Focus
                </h3>
                <ul className="flex flex-col gap-3">
                  {project.tags.map((tag) => (
                    <li key={tag} className="text-xs font-header font-bold tracking-[0.1em] text-white uppercase">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:col-span-1 flex md:justify-end">
                <div>
                  <h3 className="text-[0.65rem] font-header font-bold tracking-[0.25em] text-white/40 uppercase mb-4">
                    Live Demo
                  </h3>
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-header font-bold tracking-[0.15em] uppercase text-white border-b border-white pb-1 hover:text-white/70 hover:border-white/70 transition-colors group">
                    VISIT PROJECT
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="reveal-el w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden mb-24 md:mb-40">
            <img 
              src={project.image} 
              alt={project.title.replace('\n', ' ')} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          </div>

          {project.id === "shitha" ? (
            <>
              {/* Performance Matrix */}
              <div className="reveal-el grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 md:mb-40 border-y border-white/10 py-12">
                <div className="text-center md:border-r border-white/10 md:pr-8">
                  <h4 className="text-[0.65rem] font-header font-bold tracking-[0.2em] text-white/40 uppercase mb-4">Throughput</h4>
                  <p className="text-3xl md:text-5xl font-poster font-bold text-white">2,500+</p>
                  <p className="text-sm font-header text-white/60 tracking-widest mt-2 uppercase">Req / Second</p>
                </div>
                <div className="text-center md:border-r border-white/10 md:px-8">
                  <h4 className="text-[0.65rem] font-header font-bold tracking-[0.2em] text-white/40 uppercase mb-4">P99 Latency</h4>
                  <p className="text-3xl md:text-5xl font-poster font-bold text-white">32ms</p>
                  <p className="text-sm font-header text-white/60 tracking-widest mt-2 uppercase">Global Average</p>
                </div>
                <div className="text-center md:pl-8">
                  <h4 className="text-[0.65rem] font-header font-bold tracking-[0.2em] text-white/40 uppercase mb-4">Stock Accuracy</h4>
                  <p className="text-3xl md:text-5xl font-poster font-bold text-white">100%</p>
                  <p className="text-sm font-header text-white/60 tracking-widest mt-2 uppercase">Strict Atomic</p>
                </div>
              </div>

              {/* 1. The Challenge */}
              <div className="reveal-el grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24 md:mb-40">
                <div className="md:col-span-4 flex flex-col justify-start">
                  <h2 className="text-4xl md:text-6xl font-poster font-bold tracking-tight uppercase leading-[0.9]">
                    01.<br />The<br />Challenge
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-2xl font-poster font-bold text-white mb-6 uppercase">The High-Traffic Paradox</h3>
                  <p className="text-base md:text-lg font-body text-white/80 leading-relaxed font-light mb-8">
                    When an influencer drops a product link via an Instagram Story, traffic does not scale linearly—it hits the backend infrastructure like a DDoS attack. Traditional "check-then-write" database operations immediately crumble under this load, causing database thread exhaustion, payment discrepancies, and severe inventory overselling.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    <div>
                      <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white uppercase mb-3">Zero Overselling</h4>
                      <p className="text-sm font-body text-white/60 leading-relaxed">If two users attempt to purchase the exact last item concurrently, the system must prioritize one and gracefully reject the other at the database level.</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white uppercase mb-3">Graceful Degradation</h4>
                      <p className="text-sm font-body text-white/60 leading-relaxed">External dependency failures (e.g., payment gateways or Redis cache crashes) must be completely isolated so the entire application loop doesn't crash.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Architecture Diagram */}
              <div className="reveal-el mb-24 md:mb-40">
                <h2 className="text-xs font-header font-bold tracking-[0.3em] text-white/40 uppercase mb-12 text-center">System Architecture</h2>
                <div className="bg-white/5 border border-white/10 p-8 md:p-16 rounded-sm overflow-x-auto">
                  <pre className="font-mono text-xs md:text-sm text-white/70 leading-relaxed whitespace-pre w-max mx-auto">
{`                       [ INSTAGRAM STORY DROP ]
                                  │
                                  ▼
                        [ VERCEL EDGE ROUTER ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
 [ REDIS MEMORY LAYER ]                           [ NODE.JS CORE API ]
 (Compound Filters Caching)                       (Distributed Routing)
         │                                                 │
  Cache Hit: 12ms                                  Cache Miss / Mutation
         │                                                 │
         ▼                                                 ▼
[ IMMEDIATE RESPONSE ]                         [ MONGO TRANSACTION SESSION ]
                                                           │
                                            ┌──────────────┴──────────────┐
                                            ▼                             ▼
                                   [ ATOMIC STOCK ]              [ WEBHOOK QUEUE ]
                                  ($inc Matrix Lock)            (MongoDB Asynchronous)`}
                  </pre>
                </div>
              </div>

              {/* 3. Engineering Deep-Dives */}
              <div className="reveal-el mb-24 md:mb-40">
                <h2 className="text-4xl md:text-6xl font-poster font-bold tracking-tight uppercase leading-[0.9] mb-16">
                  02.<br />Engineering<br />Deep-Dives
                </h2>

                <div className="space-y-24">
                  {/* A */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-poster font-bold text-white uppercase mb-2">A. Eradicating Race Conditions via Pure MongoDB Atomicity</h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-sm font-body text-white/60 mb-6 leading-relaxed">
                        <strong className="text-white">The Problem:</strong> Standard implementations read inventory status from the database, validate it via application code, and then execute a write. Under flash traffic, dozens of parallel Node.js threads read the same stock value simultaneously before any can update it, leading to massive data corruption and catastrophic overselling.
                      </p>
                      <p className="text-sm font-body text-white/60 mb-8 leading-relaxed">
                        <strong className="text-white">The Solution:</strong> Abandoned standard verification logic in favor of database-level, single-operation locks. Utilizing native MongoDB transaction sessions, the update and confirmation are coupled into an isolated, atomic $inc modifier execution query.
                      </p>
                      <div className="bg-grit-900 border border-white/10 p-6 rounded-sm mb-6 overflow-x-auto">
<pre className="font-mono text-xs text-[#a6accd] leading-loose whitespace-pre">
<span className="text-[#c792ea]">async function</span> <span className="text-[#82aaff]">reserveStockAtomic</span>(productId, size, qty, session) {'{'}
  <span className="text-[#c792ea]">const</span> result = <span className="text-[#c792ea]">await</span> Product.<span className="text-[#82aaff]">updateOne</span>(
    {'{'} 
      _id: productId, 
      <span className="text-[#c3e88d]">'sizes.size'</span>: size, 
      <span className="text-[#c3e88d]">'sizes.stock'</span>: {'{'} <span className="text-[#89ddff]">$gte</span>: qty {'}'} <span className="text-[#676e95]">// Evaluated natively at execution instant</span>
    {'}'},
    {'{'} 
      <span className="text-[#89ddff]">$inc</span>: {'{'} 
        <span className="text-[#c3e88d]">'sizes.$.stock'</span>: -qty, 
        <span className="text-[#c3e88d]">'sizes.$.reserved'</span>: qty 
      {'}'} 
    {'}'},
    {'{'} session {'}'}
  );
  <span className="text-[#c792ea]">return</span> result.modifiedCount === <span className="text-[#f78c6c]">1</span>;
{'}'}
</pre>
                      </div>
                      <p className="text-sm font-body text-white/60 leading-relaxed border-l-2 border-white/20 pl-4 italic">
                        <strong className="text-white not-italic">The Result:</strong> It is mathematically impossible to deduct below zero. Multi-item checkouts are handled via an automated retry manager that injects random jitter to resolve transient write conflicts automatically.
                      </p>
                    </div>
                  </div>

                  {/* B */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-poster font-bold text-white uppercase mb-2">B. Dynamic Compound Caching & Graceful Degradation</h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-sm font-body text-white/60 mb-6 leading-relaxed">
                        <strong className="text-white">The Problem:</strong> Complex product query mutations (filtering sizes, tracking price metrics, and checking category constraints) frequently lock database resources when requested thousands of times sequentially.
                      </p>
                      <p className="text-sm font-body text-white/60 mb-6 leading-relaxed">
                        <strong className="text-white">The Solution:</strong> Built a highly specialized caching wrapper using ioredis. Read-heavy product listings generate dynamic, serialized compound cache keys.
                      </p>
                      <p className="text-sm font-body text-white/60 leading-relaxed border-l-2 border-white/20 pl-4 italic">
                        <strong className="text-white not-italic">The Edge-Case Solution:</strong> If the Redis cluster goes completely offline, standard applications fail instantly. This wrapper implements an exponential backoff error-handler that flags isAvailable() = false. The app silently bypasses Redis and falls back to clean database querying without a single visible interruption to the user.
                      </p>
                    </div>
                  </div>

                  {/* C */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-poster font-bold text-white uppercase mb-2">C. Preventing Event-Loop Starvation</h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-sm font-body text-white/60 mb-6 leading-relaxed">
                        <strong className="text-white">The Problem:</strong> Third-party webhooks require heavy computing tasks—like generating invoice PDFs and opening long-running SMTP mail pipes. Running these directly inside the HTTP response cycle quickly blocks the single-threaded Node.js event loop.
                      </p>
                      <p className="text-sm font-body text-white/60 mb-8 leading-relaxed">
                        <strong className="text-white">The Solution:</strong> Engineered a localized WebhookQueueManager. Incoming webhooks are immediately written to a RawWebhook collection as a lightweight log and closed with an instant HTTP 200 response.
                      </p>
                      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm overflow-x-auto">
                        <pre className="font-mono text-xs text-white/70 leading-relaxed whitespace-pre w-max mx-auto">
{`[ RAW PAYMENT WEBHOOK ] ──► Written to DB (Instant HTTP 200 Response)
                                  │
                                  ▼
                      [ processWebhookQueue() ] 
                      (Capped Concurrency: 10)
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   [ SUCCESSFUL ]                                     [ FAILURES ]
Generates Invoice / Mail                             Diverts to Dead Letter Queue`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Architectural Safeguards */}
              <div className="reveal-el grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                <div className="md:col-span-4">
                  <h2 className="text-4xl md:text-6xl font-poster font-bold tracking-tight uppercase leading-[0.9]">
                    03.<br />Safeguards
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-base font-body text-white/80 leading-relaxed mb-12 font-light">
                    To guarantee the site remains resilient under production stresses, two critical infrastructure patterns were hardcoded across all routes:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white uppercase mb-4 border-b border-white/20 pb-4">
                        The Circuit Breaker Pattern
                      </h4>
                      <p className="text-sm font-body text-white/60 leading-relaxed">
                        To protect against cascading third-party API lag, all external transactions are executed within a protective <code className="font-mono text-[11px] bg-white/10 px-1 py-0.5 rounded text-white/90">CircuitBreakerManager</code>. If the gateway encounters more than 5 consecutive network exceptions within a 45-second window, the breaker trips OPEN. This instantly stops incoming traffic from overloading the failing service and initiates a safe HALF_OPEN probing test after a cooldown period.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white uppercase mb-4 border-b border-white/20 pb-4">
                        Abandoned Cart Inventory Recovery
                      </h4>
                      <p className="text-sm font-body text-white/60 leading-relaxed">
                        Stock locked during checkout sessions must not stay frozen indefinitely. A low-overhead background cron job task wakes up every 2 minutes via <code className="font-mono text-[11px] bg-white/10 px-1 py-0.5 rounded text-white/90">node-cron</code>. It sweeps the database for inventory holds older than 15 minutes, safely rolls the stock back into the active public inventory pool inside an isolated database session.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Case Study Content Grid (Placeholder for other projects) */}
              <div className="reveal-el grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24 md:mb-40">
                <div className="md:col-span-4 flex flex-col justify-between">
                  <h2 className="text-4xl md:text-6xl font-poster font-bold tracking-tight uppercase leading-[0.9]">
                    The<br />Challenge
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-lg md:text-2xl font-body text-white/80 leading-relaxed font-light">
                    Developing high-performance digital architecture requires a delicate balance between aesthetics and engineering. The primary challenge was architecting a scalable foundation that could handle intense load without compromising the premium, fluid user experience. Every interaction needed to feel instantaneous, and the backend infrastructure had to be perfectly synchronized with the client-facing interface.
                  </p>
                </div>
              </div>

              {/* Large typography breakdown */}
              <div className="reveal-el w-full py-24 md:py-40 border-y border-white/10 mb-24 md:mb-40 text-center">
                 <h3 className="text-[5vw] font-helvetica font-bold tracking-tight leading-[1] uppercase text-white/20">
                   "Architecture is not just about structure. It's about establishing <span className="text-white">a rhythm for the experience.</span>"
                 </h3>
              </div>

              {/* Solution & Tech Stack */}
              <div className="reveal-el grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                <div className="md:col-span-4">
                  <h2 className="text-4xl md:text-6xl font-poster font-bold tracking-tight uppercase leading-[0.9]">
                    The<br />Solution
                  </h2>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white/50 uppercase mb-6">
                      01. Technical Foundation
                    </h4>
                    <p className="text-sm font-body text-white/80 leading-relaxed">
                      We engineered a custom backend system capable of real-time synchronization, minimizing latency across geographic nodes. The architecture prioritizes edge-caching and lazy-loading heavy assets.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-header font-bold tracking-[0.2em] text-white/50 uppercase mb-6">
                      02. Fluid Interface
                    </h4>
                    <p className="text-sm font-body text-white/80 leading-relaxed">
                      To achieve the cinematic feel, we implemented custom WebGL shaders alongside advanced GSAP physics. Scroll events are decoupled from the main thread, ensuring a perfect 60fps experience.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

        </main>
        
        {/* Next Project Footer */}
        <footer className="w-full border-t border-white/10 flex flex-col md:flex-row">
          <div className="flex-1 p-12 md:p-24 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-[0.65rem] font-header font-bold tracking-[0.3em] text-white/40 uppercase mb-6">
              Return to Portfolio
            </span>
            <h2 className="text-4xl md:text-7xl font-poster font-bold uppercase tracking-tight">
              All Works
            </h2>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
