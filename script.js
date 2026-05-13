const aggregateData = [
    {
        label: "Hyperparameter Search",
        value: 11.53,
        caption: "Best search",
        bar: "#c4bcb0",
        dot: "#2c365a"
    },
    {
        label: "Claude Sonnet 4.6",
        value: 8.08,
        caption: "Agent rank 1",
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "GLM-5",
        value: 6.20,
        caption: "Agent rank 2",
        bar: "#657091",
        dot: "#2c365a"
    },
    {
        label: "Gemini 3.1 Pro",
        value: 6.16,
        caption: "Agent rank 3",
        bar: "#8f96ad",
        dot: "#2c365a"
    },
    {
        label: "vLLM Default",
        value: 4.05,
        caption: "Default engine",
        bar: "#d6cec2",
        dot: "#8e887d"
    },
    {
        label: "PyTorch Baseline",
        value: 1.0,
        caption: "Naive baseline",
        bar: "#9ca3ad",
        dot: "#2c365a"
    }
];

const scenarioData = [
    {
        id: "A",
        key: "a",
        title: "Time to First Token (TTFT)",
        metric: "Prefill Latency",
        headline: 3.47,
        description: "Agents reduce time to first token substantially, though search still leads.",
        values: [
            { label: "Search", value: 4.37, color: "#2c365a" },
            { label: "Best agent", value: 3.47, color: "#657091" },
            { label: "vLLM", value: 1.25, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "B",
        key: "b",
        title: "Time Per Output Token (TPOT)",
        metric: "Decode Latency",
        headline: 12.03,
        description: "Agents dramatically improve per-token latency, narrowing much of the gap.",
        values: [
            { label: "Search", value: 15.23, color: "#2c365a" },
            { label: "Best agent", value: 12.03, color: "#657091" },
            { label: "vLLM", value: 2.25, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "C",
        key: "c",
        title: "Throughput (Requests / s)",
        metric: "Concurrent Traffic",
        headline: 33.93,
        description: "Agents unlock major throughput gains, but search and defaults can climb higher.",
        values: [
            { label: "Search", value: 46.7, color: "#2c365a" },
            { label: "Best agent", value: 33.93, color: "#657091" },
            { label: "vLLM", value: 48.69, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "D",
        key: "d",
        title: "Aggregate (Geometric Mean)",
        metric: "All-In-One",
        headline: 3.01,
        description: "Balanced objectives expose the discipline gap most clearly.",
        values: [
            { label: "Search", value: 5.69, color: "#2c365a" },
            { label: "Best agent", value: 3.01, color: "#657091" },
            { label: "vLLM", value: 1.96, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    }
];

const leaderboardRows = [
    { rank: 1, model: "Claude Sonnet 4.6", scaffold: "Claude Code", value: 8.08, type: "agent", a: 3.47, b: 12.03, c: 33.93, d: 3.01 },
    { rank: 2, model: "GLM-5", scaffold: "OpenCode", value: 6.20, type: "agent", a: 3.44, b: 4.45, c: 26.36, d: 3.66 },
    { rank: 3, model: "Gemini 3.1 Pro", scaffold: "OpenCode", value: 6.16, type: "agent", a: 3.35, b: 4.81, c: 31.24, d: 2.87 },
    { rank: 4, model: "GPT-5.3 Codex (High)", scaffold: "Codex CLI", value: 5.48, type: "agent", a: 3.54, b: 3.38, c: 29.0, d: 2.60 },
    { rank: 5, model: "GPT-5.4 (High)", scaffold: "Codex CLI", value: 5.08, type: "agent", a: 3.53, b: 2.24, c: 25.84, d: 3.25 },
    { rank: 6, model: "GPT-5.3 Codex (Medium)", scaffold: "Codex CLI", value: 4.86, type: "agent", a: 2.75, b: 3.73, c: 19.30, d: 2.82 },
    { rank: 7, model: "GPT-5.5 (High)", scaffold: "Codex CLI", value: 4.22, type: "agent", a: 3.06, b: 2.59, c: 19.11, d: 2.08 },
    { rank: 8, model: "Claude Opus 4.6", scaffold: "Claude Code", value: 3.89, type: "agent", a: 1.00, b: 2.77, c: 25.64, d: 3.21 },
    { rank: 9, model: "GPT-5.2", scaffold: "Codex CLI", value: 3.82, type: "agent", a: 3.12, b: 1.00, c: 32.61, d: 2.09 },
    { rank: 10, model: "GPT-5.1 Codex Max", scaffold: "Codex CLI", value: 3.54, type: "agent", a: 1.00, b: 4.66, c: 15.00, d: 2.23 },
    { rank: 11, model: "Claude Opus 4.5", scaffold: "Claude Code", value: 3.37, type: "agent", a: 3.69, b: 1.00, c: 18.01, d: 1.93 },
    { rank: 12, model: "Claude Sonnet 4.5", scaffold: "Claude Code", value: 2.96, type: "agent", a: 2.67, b: 1.00, c: 9.65, d: 2.97 },
    { rank: 13, model: "Claude Opus 4.7", scaffold: "Claude Code", value: 2.25, type: "agent", a: 1.07, b: 1.00, c: 19.02, d: 1.27 },
    { rank: 14, model: "GPT-5.2 Codex", scaffold: "Codex CLI", value: 1.55, type: "agent", a: 3.07, b: 1.00, c: 1.00, d: 1.87 },
    { rank: 15, model: "Claude Haiku 4.5", scaffold: "Claude Code", value: 1.24, type: "agent", a: 0.77, b: 1.00, c: 3.11, d: 1.00 }
];

const scenarioColumns = [
    { key: "a", label: "A Prefill Latency", shortLabel: "Prefill", color: "#657091", max: 4 },
    { key: "b", label: "B Decode Latency", shortLabel: "Decode", color: "#2c365a", max: 13 },
    { key: "c", label: "C Throughput", shortLabel: "Throughput", color: "#202944", max: 35 },
    { key: "d", label: "D All-In-One", shortLabel: "All-in-one", color: "#8e887d", max: 4 }
];

const scenarioFocusNotes = {
    a: "Prefill optimization is driven by long-context prompt processing, where prefix caching, chunked prefill, and memory bandwidth matter more than decode throughput.",
    b: "Decode optimization is dominated by per-token generation latency, so batching policy, KV-cache layout, and speculative decoding become more important than prompt ingestion.",
    c: "Throughput optimization rewards serving many concurrent requests, making scheduling, batching limits, and engine-level queueing behavior central.",
    d: "All-in-one optimization balances latency and throughput, so robust configurations need to avoid overfitting to a single bottleneck."
};

const modelKey = (model) => model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function sortedLeaderboardRows(focus = "all") {
    const key = focus === "all" ? "value" : focus;
    return [...leaderboardRows].sort((a, b) => b[key] - a[key] || a.rank - b.rank);
}

function updateLeaderboardSummary(focus = "all", topRow = sortedLeaderboardRows(focus)[0]) {
    const label = document.getElementById("leaderboard-top-label");
    const name = document.getElementById("leaderboard-top-name");
    const copy = document.getElementById("leaderboard-top-copy");
    if (!label || !name || !copy || !topRow) return;

    if (focus === "all") {
        label.textContent = "Top agent";
        name.textContent = topRow.model;
        copy.textContent = `${topRow.model} ranks first by combining competitive per-scenario speedups with reliably valid final submissions. Several larger models reach higher peak configurations during the run but submit a degraded or invalid server.`;
        return;
    }

    const column = scenarioColumns.find((item) => item.key === focus);
    const scenarioName = column?.shortLabel ?? "scenario";
    label.textContent = `Top ${scenarioName}`;
    name.textContent = topRow.model;
    copy.textContent = `${topRow.model} leads this scenario with a ${fmt(topRow[focus])} mean speedup. ${scenarioFocusNotes[focus] ?? ""}`;
}

const outcomeData = [
    { label: "Passed both gates", value: 65.0, color: "#2c365a" },
    { label: "Failed correctness check", value: 18.9, color: "#c4bcb0" },
    { label: "Integrity-flagged", value: 6.1, color: "#d9d2c7" },
    { label: "Server/runtime failure", value: 10.0, color: "#586078" }
];

const configDistribution = [
    { label: "0", note: "No changes", value: 31, color: "#eee8df" },
    { label: "1", note: "One change", value: 61, color: "#c4bcb0" },
    { label: "2", note: "Two changes", value: 6, color: "#d9d2c7" },
    { label: "3+", note: "Three or more", value: 2, color: "#2c365a" }
];

const foundData = [
    {
        label: "Best final-submitted agent aggregate",
        description: "What agents reliably preserve and submit.",
        value: 8.62,
        gap: "+3.72×"
    },
    {
        label: "Best-seen agent aggregate",
        description: "Best valid configuration discovered at any point.",
        value: 12.34,
        gap: "+1.96×"
    },
    {
        label: "Best non-agent search",
        description: "Upper bound from disciplined hyperparameter search.",
        value: 14.30
    }
];

const timeBudgetData = [
    { model: "Claude Haiku 4.5", values: [1.05, 1.24, 1.30, 1.35] },
    { model: "Claude Sonnet 4.5", values: [1.92, 2.96, 2.92, 2.81] },
    { model: "Claude Opus 4.5", values: [2.42, 3.37, 3.31, 3.24] }
];

const timeLabels = ["1h", "2h", "4h", "8h"];

function fmt(value) {
    return `${value.toFixed(2)}×`;
}

function median(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2) return sorted[middle];
    return (sorted[middle - 1] + sorted[middle]) / 2;
}

function renderAggregateChart() {
    const target = document.getElementById("aggregate-chart");
    if (!target) return;

    const max = 12;
    target.innerHTML = aggregateData.map((item) => {
        const height = Math.max(24, (item.value / max) * 250);
        return `
            <div class="aggregate-item">
                <div class="aggregate-label">
                    ${item.label}
                    <span class="aggregate-value">${fmt(item.value)}</span>
                </div>
                <div class="lollipop" style="--height:${height}px; --bar:${item.bar}; --dot:${item.dot};"></div>
                <div class="aggregate-caption">${item.caption}</div>
            </div>
        `;
    }).join("");
}

function renderScenarioBreakdown() {
    const target = document.getElementById("scenario-breakdown");
    if (!target) return;

    target.innerHTML = scenarioData.map((scenario) => {
        const agentValues = leaderboardRows
            .filter((row) => row.type === "agent")
            .map((row) => row[scenario.key]);
        const medianValue = median(agentValues);
        const minValue = Math.min(...agentValues);
        const maxValue = Math.max(...agentValues);
        const searchValue = scenario.values.find((item) => item.label === "Search")?.value;
        const max = Math.max(...scenario.values.map((item) => item.value), maxValue);
        const bars = scenario.values.map((item) => {
            const height = Math.max(14, (item.value / max) * 108);
            return `<span class="small-bar" title="${item.label}: ${fmt(item.value)}" style="--h:${height}px; --bar:${item.color}; --dot:${item.color};"></span>`;
        }).join("");

        return `
            <article class="breakdown-card">
                <header>
                    <span class="scenario-letter">${scenario.id}</span>
                    <div>
                        <h4>${scenario.title}</h4>
                        <span class="metric-row"><span>Median agent</span><strong>${fmt(medianValue)}</strong></span>
                        <span class="range-line">${fmt(minValue)}-${fmt(maxValue)}</span>
                        ${searchValue ? `<span class="search-line"><span>Median search baseline</span><strong>${fmt(searchValue)}</strong></span>` : ""}
                    </div>
                </header>
                <div class="small-bars">${bars}</div>
                <p>${scenario.description}</p>
            </article>
        `;
    }).join("");
}

function renderLeaderboard(focus = "all") {
    const target = document.getElementById("leaderboard-list");
    if (!target) return;

    const max = Math.max(...leaderboardRows.map((row) => row.value));
    const rows = sortedLeaderboardRows(focus);
    target.innerHTML = rows.map((row, index) => {
        const width = (row.value / max) * 100;
        const rankClass = index < 3 ? "top" : "";
        const scenarioCells = scenarioColumns.map((column) => {
            const value = row[column.key];
            const scenarioWidth = Math.min(100, Math.max(4, (value / column.max) * 100));
            return `
                <span class="leaderboard-scenario-cell" data-scenario="${column.key}" aria-label="${column.shortLabel} speedup ${fmt(value)}">
                    <span class="scenario-score-value">${fmt(value)}</span>
                    <span class="scenario-score-line" aria-hidden="true">
                        <i style="--w:${scenarioWidth}%; --bar:${column.color};"></i>
                    </span>
                </span>
            `;
        }).join("");
        return `
            <div class="leaderboard-row ${row.type}" data-model-key="${modelKey(row.model)}">
                <span class="rank-badge ${rankClass}">${index + 1}</span>
                <div>
                    <span class="model-name">${row.model}</span>
                    <span class="model-subtitle">${row.scaffold}</span>
                </div>
                <div class="speed-track" aria-hidden="true">
                    <span class="speed-fill" style="--w:${width}%"></span>
                </div>
                <span class="row-speed">${fmt(row.value)}</span>
                ${scenarioCells}
            </div>
        `;
    }).join("");
    updateLeaderboardSummary(focus, rows[0]);
}

function setupScenarioFocus() {
    const wrap = document.querySelector(".leaderboard-table-wrap");
    const controls = document.getElementById("scenario-focus");
    const list = document.getElementById("leaderboard-list");
    if (!wrap || !controls || !list) return;

    const rowByKey = () => new Map([...list.children].map((row) => [row.dataset.modelKey, row]));

    const applyFocus = (focus, animate = true) => {
        const orderedRows = sortedLeaderboardRows(focus);
        const firstRects = new Map([...list.children].map((row) => [row.dataset.modelKey, row.getBoundingClientRect()]));
        const existingRows = rowByKey();

        orderedRows.forEach((row, index) => {
            const element = existingRows.get(modelKey(row.model));
            if (!element) return;
            const badge = element.querySelector(".rank-badge");
            if (badge) {
                badge.textContent = String(index + 1);
                badge.classList.toggle("top", index < 3);
            }
            list.appendChild(element);
        });

        wrap.dataset.focus = focus;
        updateLeaderboardSummary(focus, orderedRows[0]);

        if (!animate) return;
        [...list.children].forEach((row) => {
            const first = firstRects.get(row.dataset.modelKey);
            const last = row.getBoundingClientRect();
            if (!first) return;
            const deltaY = first.top - last.top;
            if (Math.abs(deltaY) < 1) return;
            row.animate([
                { transform: `translateY(${deltaY}px)` },
                { transform: "translateY(0)" }
            ], {
                duration: 560,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)"
            });
        });
    };

    controls.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-focus]");
        if (!button) return;

        const focus = button.dataset.focus;
        controls.querySelectorAll("button[data-focus]").forEach((control) => {
            const isActive = control === button;
            control.classList.toggle("is-active", isActive);
            control.setAttribute("aria-pressed", String(isActive));
        });
        applyFocus(focus);
    });
}

function renderScenarioMatrix() {
    const target = document.getElementById("scenario-matrix");
    if (!target) return;

    const rows = leaderboardRows.slice(0, 3);

    const header = `
        <div class="matrix-row matrix-header">
            <div class="matrix-cell">Model</div>
            ${scenarioColumns.map((column) => `<div class="matrix-cell">${column.label}</div>`).join("")}
        </div>
    `;

    const body = rows.map((row) => `
        <div class="matrix-row">
            <div class="matrix-cell matrix-model">${row.model}</div>
            ${scenarioColumns.map((column) => {
                const value = row[column.key];
                const x = Math.min(96, Math.max(4, (value / column.max) * 100));
                return `
                    <div class="matrix-cell">
                        <div class="metric-line">
                            <span class="metric-dot" style="--x:${x}%; --dot:${column.color};"></span>
                        </div>
                        <span class="metric-value">${fmt(value)}</span>
                    </div>
                `;
            }).join("")}
        </div>
    `).join("");

    target.innerHTML = header + body;
}

function renderOutcomes() {
    const bar = document.getElementById("outcome-bar");
    const grid = document.getElementById("outcome-grid");
    if (!bar || !grid) return;

    let cumulative = 0;
    bar.innerHTML = outcomeData.map((item) => {
        const midpoint = cumulative + item.value / 2;
        const segment = `<span class="stack-segment" title="${item.label}: ${item.value.toFixed(1)}%" style="--w:${item.value}%; --segment:${item.color}; --mid:${midpoint}%;"></span>`;
        cumulative += item.value;
        return segment;
    }).join("");

    cumulative = 0;
    const connectors = [];
    const items = [];
    outcomeData.forEach((item, index) => {
        const midpoint = cumulative + item.value / 2;
        const labelX = [12, 38, 64, 88][index] ?? midpoint;
        const connectorLeft = Math.min(midpoint, labelX);
        const connectorWidth = Math.abs(labelX - midpoint);
        const connectorDirection = labelX >= midpoint ? "to-right" : "to-left";
        cumulative += item.value;
        connectors.push(`<span class="outcome-connector ${connectorDirection}" style="--left:${connectorLeft}%; --width:${connectorWidth}%;"></span>`);
        items.push(`
        <div class="outcome-item" style="--x:${midpoint}%; --label-x:${labelX}%;">
            <strong>${item.value.toFixed(1)}%</strong>
            <span>${item.label}</span>
        </div>
    `);
    });
    grid.innerHTML = connectors.join("") + items.join("");
}

function renderHistogram() {
    const target = document.getElementById("config-histogram");
    if (!target) return;

    const max = Math.max(...configDistribution.map((item) => item.value));
    target.innerHTML = configDistribution.map((item) => {
        const height = Math.max(18, (item.value / max) * 220);
        return `
            <div class="histogram-bar">
                <strong>${item.value}%</strong>
                <span class="histogram-column" style="--h:${height}px; --bar:${item.color};"></span>
                <span>${item.label}<em>${item.note}</em></span>
            </div>
        `;
    }).join("");
}

function renderFoundChart() {
    const target = document.getElementById("found-chart");
    if (!target) return;

    const max = Math.max(...foundData.map((item) => item.value));
    target.innerHTML = foundData.map((item) => {
        const height = Math.max(60, (item.value / max) * 210);
        return `
            <div class="found-item" style="--h:${height}px;" data-gap="${item.gap || ""}">
                <span class="found-value">${fmt(item.value)}</span>
                <span class="found-bar"></span>
                <span class="found-label">${item.label}</span>
                <span class="found-desc">${item.description}</span>
            </div>
        `;
    }).join("");
}

function renderTimeAblation() {
    const target = document.getElementById("time-ablation");
    if (!target) return;

    target.innerHTML = timeBudgetData.map((series) => {
        const width = 300;
        const height = 190;
        const left = 38;
        const right = 18;
        const top = 16;
        const bottom = 34;
        const plotW = width - left - right;
        const plotH = height - top - bottom;
        const minY = 1;
        const maxY = 4;

        const point = (value, index) => {
            const x = left + (index / (series.values.length - 1)) * plotW;
            const y = top + ((maxY - value) / (maxY - minY)) * plotH;
            return { x, y };
        };

        const points = series.values.map(point);
        const path = points.map((p, index) => `${index === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
        const gridLines = [1, 1.5, 2, 2.5, 3, 3.5, 4].map((tick) => {
            const y = top + ((maxY - tick) / (maxY - minY)) * plotH;
            return `<line class="grid" x1="${left}" x2="${width - right}" y1="${y}" y2="${y}"></line>`;
        }).join("");
        const xLabels = timeLabels.map((label, index) => {
            const x = point(series.values[index], index).x;
            return `<text x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
        }).join("");
        const valueLabels = points.map((p, index) => (
            `<text x="${p.x}" y="${p.y - 10}" text-anchor="middle">${fmt(series.values[index])}</text>`
        )).join("");
        const circles = points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="5"></circle>`).join("");

        return `
            <div class="line-chart">
                <h4>${series.model}</h4>
                <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${series.model} time budget ablation">
                    ${gridLines}
                    <line class="axis" x1="${left}" x2="${left}" y1="${top}" y2="${height - bottom}"></line>
                    <line class="axis" x1="${left}" x2="${width - right}" y1="${height - bottom}" y2="${height - bottom}"></line>
                    <path class="series" d="${path}"></path>
                    ${circles}
                    ${valueLabels}
                    ${xLabels}
                </svg>
            </div>
        `;
    }).join("");
}

function setupNavigation() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const open = !nav.classList.contains("open");
        nav.classList.toggle("open", open);
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            document.body.classList.remove("nav-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupScrollExperience() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("site-nav");
    if (!header || !nav) return;

    const navLinks = [...nav.querySelectorAll("a[href^='#']")];
    const sections = navLinks
        .map((link) => {
            const id = link.getAttribute("href").slice(1);
            const target = document.getElementById(id);
            return target ? { id, label: link.textContent.trim(), target } : null;
        })
        .filter(Boolean);

    const rail = document.createElement("nav");
    rail.className = "scroll-rail";
    rail.setAttribute("aria-label", "Section navigation");
    rail.innerHTML = sections.map((section) => (
        `<a class="scroll-rail-link" href="#${section.id}" aria-label="${section.label}"></a>`
    )).join("");
    document.body.appendChild(rail);

    const railLinks = [...rail.querySelectorAll(".scroll-rail-link")];
    let lastScrollY = window.scrollY;
    let ticking = false;
    let navVisible = null;

    const setNavVisible = (visible) => {
        if (navVisible === visible) return;
        navVisible = visible;
        header.classList.toggle("is-scroll-visible", visible);
        header.classList.toggle("is-scroll-hidden", !visible);
        document.body.classList.toggle("nav-hidden", !visible);
    };

    const setScrollState = () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;
        const nearTop = currentY < 80;
        const scrollingDown = delta > 4;
        const scrollingUp = delta < -4;

        document.body.classList.toggle("nav-at-top", nearTop);

        if (scrollingDown && !nearTop && !document.body.classList.contains("nav-open")) {
            setNavVisible(false);
        } else if (scrollingUp || nearTop) {
            setNavVisible(true);
        }

        document.body.classList.toggle("rail-visible", !nearTop);

        lastScrollY = currentY;
    };

    const activeObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const activeId = visible.target.id;
        railLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
    }, {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5]
    });

    sections.forEach((section) => activeObserver.observe(section.target));

    const revealTargets = [
        ...document.querySelectorAll([
            ".hero-copy",
            ".scenario-card",
            ".scenario-figure img",
            ".scenario-figure-copy",
            ".section-intro",
            ".aggregate-panel",
            ".benchmark-setup-heading",
            ".breakdown-card",
            ".scenario-matrix-wrap",
            ".leaderboard-hero",
            ".leaderboard-table-wrap",
            ".key-insight",
            ".ablation-card",
            ".analysis-hero",
            ".behavior-panel",
            ".found-panel",
            ".agent-quotes",
            ".quote-band",
            ".team-section"
        ].join(", "))
    ].filter(Boolean);

    revealTargets.forEach((target) => target.classList.add("reveal-item"));
    revealTargets.forEach((target) => {
        target.dataset.revealActive = "false";
        target.classList.add("is-reveal-hidden");
    });

    const setRevealActive = (target, active) => {
        const next = String(active);
        if (target.dataset.revealActive === next) return;
        target.dataset.revealActive = next;
        target.classList.toggle("is-reveal-visible", active);
        target.classList.toggle("is-reveal-hidden", !active);
    };

    const updateRevealStates = () => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const revealInLine = viewportHeight * 0.85;
        const revealOutLine = viewportHeight * 0.15;

        revealTargets.forEach((target) => {
            const rect = target.getBoundingClientRect();
            const active = rect.top < revealInLine && rect.bottom > revealOutLine;
            setRevealActive(target, active);
        });
    };

    const updateScrollFrame = () => {
        setScrollState();
        updateRevealStates();
        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollFrame);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", () => {
        setScrollState();
        updateRevealStates();
    }, { passive: true });
    setScrollState();
    requestAnimationFrame(() => {
        requestAnimationFrame(updateRevealStates);
    });
}

renderAggregateChart();
renderScenarioBreakdown();
renderLeaderboard();
setupScenarioFocus();
renderScenarioMatrix();
renderOutcomes();
renderHistogram();
renderFoundChart();
renderTimeAblation();
setupNavigation();
setupScrollExperience();
