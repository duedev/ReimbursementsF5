<script lang="ts">
  import { app } from "../state.svelte.ts";

  /** The orchestrator owns the page's single hidden file input; the hero
      triggers it through this callback. */
  let { onAdd }: { onAdd: () => void } = $props();
</script>

<header class="wrap hero">
  <div class="hero-copy">
    <h1>Receipts in.<br />Reimbursement report out.</h1>
    <p class="hero-sub">
      Snap or drop a pile of receipts. They're read on your device: the
      printed text, plus any brand logos you've taught it. You review the
      flagged ones in seconds, and out comes a polished Excel workbook your
      office will actually accept.
    </p>
    <div class="hero-ctas">
      <button class="btn btn-primary btn-lg" onclick={onAdd}>
        Add receipts
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 16V4m0 0 4.5 4.5M12 4 7.5 8.5M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
        </svg>
      </button>
      {#if app.receipts.length > 0}
        <button class="btn btn-lg" onclick={() => app.enter()}>
          Back to your receipts ({app.receipts.length})
        </button>
      {:else}
        <a class="btn btn-lg" href="#how">See how it works</a>
      {/if}
    </div>
    <ul class="hero-trust" aria-label="Key facts">
      <li><strong>$0</strong> per receipt</li>
      <li>Runs on your device</li>
      <li>No account needed</li>
    </ul>
  </div>

  <!-- Stylized before/after: receipt → workbook. Pure CSS, no images. -->
  <div class="hero-visual" aria-hidden="true">
    <div class="paper receipt">
      <div class="r-vendor"><mark class="hl hl-vendor">MAPLE ST. HARDWARE</mark></div>
      <div class="r-line"><span>Wood screws #8</span><span>4.29</span></div>
      <div class="r-line"><span>Paint roller kit</span><span>12.99</span></div>
      <div class="r-line"><span>Drop cloth 9×12</span><span>8.49</span></div>
      <div class="r-line faint"><span>Subtotal</span><span>25.77</span></div>
      <div class="r-line faint"><span>Tax 6.5%</span><span>1.68</span></div>
      <div class="r-total"><span>TOTAL</span><mark class="hl hl-amount">$27.45</mark></div>
      <div class="r-date"><mark class="hl hl-date">06/24/2026</mark> · 14:07</div>
      <div class="r-scan"></div>
    </div>

    <div class="flow-arrow">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 12h14m0 0-5.5-5.5M18 12l-5.5 5.5" />
      </svg>
      <span class="flow-note">read · checked · filed</span>
    </div>

    <div class="paper sheet">
      <div class="s-head">
        <span>Vendor</span><span>Date</span><span>Category</span><span>Amount</span>
      </div>
      <div class="s-row">
        <span><mark class="hl hl-vendor">Maple St. Hardware</mark></span><span><mark class="hl hl-date">06/24</mark></span><span><i class="dot d1"></i>Materials</span><span><mark class="hl hl-amount">27.45</mark></span>
      </div>
      <div class="s-row">
        <span>Corner Bistro</span><span>06/24</span><span><i class="dot d2"></i>Meals</span><span>18.20</span>
      </div>
      <div class="s-row">
        <span>CityGas #214</span><span>06/25</span><span><i class="dot d3"></i>Fuel</span><span>41.03</span>
      </div>
      <div class="s-total">
        <span>TOTAL</span><span class="s-sum">$86.68</span>
      </div>
      <div class="s-foot">= SUM(D2:D4) · foots ✓</div>
    </div>
  </div>
</header>

<style>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    align-items: center;
    gap: 3rem;
    padding: 4.5rem 0 5rem;
  }
  .hero-copy h1 {
    font-size: clamp(2.5rem, 5.4vw, 4rem);
  }
  .hero-sub {
    font-size: 1.14rem;
    color: var(--ink-soft);
    max-width: 34rem;
  }
  .hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 1.6rem 0 1.4rem;
  }
  .hero-trust {
    display: flex;
    gap: 1.4rem;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.92rem;
  }
  .hero-trust li::before {
    content: "✓";
    color: var(--ok);
    font-weight: 700;
    margin-right: 0.4rem;
  }
  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      padding-top: 2.5rem;
    }
  }

  /* ---- hero visual ---- */
  .hero-visual {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.25fr);
    align-items: center;
    gap: 0.9rem;
  }
  .receipt {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    padding: 0.9rem 0.85rem 1.1rem;
    transform: rotate(-3deg);
    position: relative;
    overflow: hidden;
  }
  .r-vendor {
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.04em;
    margin-bottom: 0.7rem;
    border: 1.5px solid var(--accent);
    border-radius: 6px;
    padding: 0.3rem 0.2rem;
    color: var(--accent);
  }
  .r-line {
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.14rem 0;
  }
  .r-line.faint {
    color: var(--ink-faint);
  }
  .r-total {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    border-top: 1.5px dashed var(--line-strong);
    margin-top: 0.4rem;
    padding-top: 0.4rem;
    color: var(--gold);
  }
  .r-date {
    margin-top: 0.55rem;
    color: var(--ink-faint);
    text-align: center;
  }
  .r-scan {
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 34%;
    background: linear-gradient(180deg, var(--accent-soft), transparent);
    /* One unhurried pass, then a long rest (keyframes in landing.css). */
    animation: db-scan 8s ease-in-out infinite;
    pointer-events: none;
  }

  /* Receipt-side highlights: hidden until the scanner passes their line.
     The text itself stays visible; only the highlighter tint waits. */
  .receipt .hl {
    position: relative;
    background: transparent;
    box-shadow: none;
  }
  .receipt .hl::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 3px;
    opacity: 0;
    pointer-events: none;
  }
  .receipt .hl-vendor::after {
    background: color-mix(in srgb, #1d4ed8 22%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #1d4ed8 45%, transparent);
    animation: db-reveal-vendor 8s ease-out infinite;
  }
  .receipt .hl-amount::after {
    background: color-mix(in srgb, #147246 20%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #147246 45%, transparent);
    animation: db-reveal-amount 8s ease-out infinite;
  }
  .receipt .hl-date::after {
    background: color-mix(in srgb, #dc2626 18%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #dc2626 45%, transparent);
    animation: db-reveal-date 8s ease-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .r-scan {
      animation: none;
      opacity: 0;
    }
    .receipt .hl-vendor::after,
    .receipt .hl-amount::after,
    .receipt .hl-date::after {
      animation: none;
      opacity: 1;
    }
  }

  .flow-arrow {
    display: grid;
    justify-items: center;
    gap: 0.3rem;
    color: var(--accent);
  }
  .flow-note {
    font: 600 0.62rem/1 var(--font-ui);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .sheet {
    font: 500 0.66rem/1.25 var(--font-ui);
    padding: 0.7rem;
    transform: rotate(1.6deg);
  }
  .s-head,
  .s-row,
  .s-total {
    display: grid;
    /* minmax(0,…) lets cells shrink; nothing may bleed out of the card. */
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.7fr) minmax(0, 1.1fr) minmax(0, 0.75fr);
    gap: 0.45rem;
    padding: 0.32rem 0.45rem;
    align-items: center;
  }
  .s-head span,
  .s-row span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .s-head {
    background: var(--accent);
    color: var(--accent-ink);
    border-radius: 6px;
    font-weight: 700;
  }
  .s-row {
    border-bottom: 1px solid var(--line);
  }
  .s-row span:last-child,
  .s-head span:last-child {
    text-align: right;
  }
  .dot {
    display: inline-block;
    width: 0.45em;
    height: 0.45em;
    border-radius: 50%;
    margin-right: 0.3em;
    vertical-align: middle;
  }
  .d1 {
    background: var(--cat-3);
  }
  .d2 {
    background: var(--cat-2);
  }
  .d3 {
    background: var(--cat-1);
  }
  .s-total {
    grid-template-columns: 1fr auto;
    font-weight: 700;
    padding-top: 0.5rem;
  }
  .s-sum {
    color: var(--accent);
  }
  .s-foot {
    color: var(--ink-faint);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    padding: 0.15rem 0.45rem 0.05rem;
  }
  @media (max-width: 480px) {
    .flow-arrow svg {
      width: 30px;
      height: 30px;
    }
    .flow-note {
      display: none;
    }
  }
</style>
