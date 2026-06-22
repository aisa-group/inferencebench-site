const aggregateData = [
    {
        label: "Hyperparameter Search",
        shortLabel: "Hyperparameter Search",
        value: 11.53,
        sem: 0.68,
        bar: "#d6cec2",
        dot: "#8e887d"
    },
    {
        label: "Claude Fable 5 (Low)",
        shortLabel: 'Fable 5 <span class="agg-nowrap">(Low) *†</span>',
        value: 8.74,
        sem: 1.91,
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "Claude Opus 4.8",
        shortLabel: "Opus 4.8 *",
        value: 7.6,
        sem: 2.16,
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "Claude Fable 5",
        shortLabel: "Fable 5 *†",
        value: 7.52,
        sem: 1.58,
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "GLM-5.2 (Max)",
        shortLabel: 'GLM-5.2 <span class="agg-nowrap">(Max) *†</span>',
        value: 7.0,
        sem: 0.24,
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "GPT-5.5 (xHigh)",
        shortLabel: '<span class="agg-nowrap">GPT-5.5 (xHigh)</span>',
        value: 5.45,
        sem: 1.25,
        bar: "#2c365a",
        dot: "#2c365a"
    },
    {
        label: "vLLM Default",
        shortLabel: "vLLM Default",
        value: 4.05,
        sem: 0.07,
        bar: "#d6cec2",
        dot: "#8e887d"
    },
    {
        label: "PyTorch Default",
        shortLabel: "PyTorch Default",
        value: 1.0,
        sem: 0.0,
        bar: "#d6cec2",
        dot: "#8e887d"
    }
];

const aggregateExpandedData = aggregateData;

const scenarioData = [
    {
        id: "A",
        key: "a",
        title: "Time to First Token (TTFT)",
        metric: "Prefill Latency",
        headline: 4.53,
        description: "Agents reduce time to first token substantially, though search still leads.",
        values: [
            { label: "Search", value: 4.37, color: "#2c365a" },
            { label: "Best agent", value: 4.53, color: "#657091" },
            { label: "vLLM", value: 1.25, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "B",
        key: "b",
        title: "Time Per Output Token (TPOT)",
        metric: "Decode Latency",
        headline: 12.16,
        description: "Agents dramatically improve per-token latency, narrowing much of the gap.",
        values: [
            { label: "Search", value: 15.23, color: "#2c365a" },
            { label: "Best agent", value: 12.16, color: "#657091" },
            { label: "vLLM", value: 2.25, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "C",
        key: "c",
        title: "Throughput (Requests / s)",
        metric: "Concurrent Traffic",
        headline: 38.52,
        description: "Agents unlock major throughput gains, but search and defaults can climb higher.",
        values: [
            { label: "Search", value: 46.7, color: "#2c365a" },
            { label: "Best agent", value: 38.52, color: "#657091" },
            { label: "vLLM", value: 48.69, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    },
    {
        id: "D",
        key: "d",
        title: "Aggregate (Geometric Mean)",
        metric: "All-In-One",
        headline: 4.65,
        description: "Balanced objectives expose the discipline gap most clearly.",
        values: [
            { label: "Search", value: 5.69, color: "#2c365a" },
            { label: "Best agent", value: 4.65, color: "#657091" },
            { label: "vLLM", value: 1.96, color: "#c4bcb0" },
            { label: "PyTorch", value: 1.0, color: "#8e887d" }
        ]
    }
];

const leaderboardRows = [
    { rank: 1, model: "Claude Fable 5 (Low)", scaffold: "Claude Code · v2.1.175 · strict prompt", value: 8.74, sem: 1.91, type: "agent", a: 4.17, b: 13.38, c: 21.37, d: 4.89, mark: "*†", key: "fable-5-low-strict", variant: true },
    { rank: 2, model: "Claude Opus 4.7", scaffold: "Claude Code · v2.1.175", value: 8.53, sem: 0.80, type: "agent", a: 2.83, b: 11.63, c: 38.52, d: 4.18, mark: "*" },
    { rank: 3, model: "Claude Opus 4.8", scaffold: "Claude Code · v2.1.175", value: 7.60, sem: 2.16, type: "agent", a: 4.53, b: 12.16, c: 18.62, d: 3.25, mark: "*" },
    { rank: 4, model: "Claude Fable 5", scaffold: "Claude Code · v2.1.175 · strict prompt", value: 7.52, sem: 1.58, type: "agent", a: 4.27, b: 15.64, c: 11.90, d: 4.03, mark: "*†", key: "fable-5-strict", variant: true },
    { rank: 5, model: "Claude Opus 4.8 (xHigh)", scaffold: "Claude Code", value: 7.34, sem: 2.37, type: "agent", a: 4.30, b: 7.72, c: 18.77, d: 4.65 },
    { rank: 6, model: "GLM-5.2 (Max)", scaffold: "Claude Code · strict prompt", value: 7.00, sem: 0.24, type: "agent", a: 3.86, b: 5.77, c: 32.47, d: 3.32, mark: "*†", key: "glm-5-2-max" },
    { rank: 7, model: "GPT-5.4 (High)", scaffold: "Codex CLI", value: 6.16, sem: 1.16, type: "agent", a: 3.60, b: 6.93, c: 17.78, d: 3.25 },
    { rank: 8, model: "Claude Sonnet 4.6", scaffold: "Claude Code", value: 5.56, sem: 1.62, type: "agent", a: 1.62, b: 8.21, c: 23.87, d: 3.01 },
    { rank: 9, model: "GPT-5.3 Codex (High)", scaffold: "Codex CLI", value: 5.49, sem: 0.54, type: "agent", a: 3.56, b: 3.38, c: 29.00, d: 2.60 },
    { rank: 10, model: "GPT-5.5 (xHigh)", scaffold: "Codex CLI", value: 5.45, sem: 1.25, type: "agent", a: 2.74, b: 6.07, c: 16.94, d: 3.14 },
    { rank: 11, model: "Gemini 3.1 Pro", scaffold: "OpenCode", value: 4.92, sem: 0.81, type: "agent", a: 2.52, b: 3.78, c: 31.24, d: 1.97 },
    { rank: 12, model: "Kimi K2.6", scaffold: "OpenCode", value: 4.51, sem: 0.48, type: "agent", a: 1.99, b: 4.73, c: 29.19, d: 1.51 },
    { rank: 13, model: "Claude Opus 4.6", scaffold: "Claude Code", value: 4.38, sem: 1.25, type: "agent", a: 1.00, b: 4.80, c: 23.85, d: 3.21 },
    { rank: 14, model: "GPT-5.2", scaffold: "Codex CLI", value: 4.28, sem: 1.29, type: "agent", a: 2.26, b: 2.87, c: 20.15, d: 2.57 },
    { rank: 15, model: "GPT-5.5 (High)", scaffold: "Codex CLI", value: 4.22, sem: 1.01, type: "agent", a: 3.06, b: 2.59, c: 19.11, d: 2.08 },
    { rank: 16, model: "Gemini 3.5 Flash", scaffold: "OpenCode", value: 4.16, sem: 0.72, type: "agent", a: 3.70, b: 3.05, c: 17.71, d: 1.50 },
    { rank: 17, model: "Claude Opus 4.5", scaffold: "Claude Code", value: 3.76, sem: 0.89, type: "agent", a: 3.69, b: 2.78, c: 10.03, d: 1.95 },
    { rank: 18, model: "GPT-5.1 Codex Max", scaffold: "Codex CLI", value: 3.59, sem: 1.24, type: "agent", a: 2.57, b: 3.44, c: 10.33, d: 1.82 },
    { rank: 19, model: "GLM-5", scaffold: "OpenCode", value: 3.22, sem: 0.85, type: "agent", a: 2.19, b: 1.00, c: 26.36, d: 1.87 },
    { rank: 20, model: "Claude Sonnet 4.5", scaffold: "Claude Code", value: 3.18, sem: 0.90, type: "agent", a: 2.67, b: 1.71, c: 9.65, d: 2.32 },
    { rank: 21, model: "Claude Fable 5", scaffold: "Claude Code · v2.1.175", value: 3.16, sem: 0.67, type: "agent", a: 3.92, b: 1.00, c: 25.42, d: 1.00, mark: "*", key: "fable-5-regular" },
    { rank: 22, model: "Claude Haiku 4.5", scaffold: "Claude Code", value: 2.78, sem: 0.57, type: "agent", a: 1.00, b: 1.99, c: 9.27, d: 3.24 },
    { rank: 23, model: "GPT-5.3 Codex (Medium)", scaffold: "Codex CLI", value: 2.32, sem: 0.31, type: "agent", a: 2.75, b: 3.73, c: 1.00, d: 2.82 },
    { rank: 24, model: "Claude Opus 4.7", scaffold: "Claude Code · v2.1.114", value: 2.25, sem: 0.32, type: "agent", a: 1.07, b: 1.00, c: 19.02, d: 1.27, key: "opus-4-7-v2114", variant: true },
    { rank: 25, model: "Claude Fable 5 (Low)", scaffold: "Claude Code · v2.1.175", value: 2.15, sem: 0.46, type: "agent", a: 1.00, b: 1.00, c: 21.21, d: 1.00, mark: "*", key: "fable-5-low", variant: true },
    { rank: 26, model: "GPT-5.2 Codex", scaffold: "Codex CLI", value: 1.98, sem: 0.18, type: "agent", a: 3.32, b: 2.48, c: 1.00, d: 1.87 }
];

const scenarioColumns = [
    { key: "a", label: "A Prefill Latency", shortLabel: "Prefill", color: "#657091", max: 5 },
    { key: "b", label: "B Decode Latency", shortLabel: "Decode", color: "#2c365a", max: 13 },
    { key: "c", label: "C Throughput", shortLabel: "Throughput", color: "#202944", max: 40 },
    { key: "d", label: "D All-In-One", shortLabel: "All-in-one", color: "#8e887d", max: 5 }
];

const scenarioFocusNotes = {
    a: "Opus 4.8 set its batched-token budget large enough to prefill the entire prompt in a single step, which is what drives time to first token down. It passed all three seeds cleanly, while a third of the runs on this scenario failed a gate.",
    b: "Scenario B is where FP8 helps most, so many agents reached for it by swapping in banned pre-quantized checkpoints, and 38% of runs here failed a gate. Fable 5 quantized to FP8 legitimately and added 16-token speculative decoding, making it one of only two agents to beat matched parameter search on any scenario.",
    c: "Most agents quantized only the model weights, but Opus 4.7 also quantized the KV cache to FP8, freeing enough memory to batch 384 concurrent requests and lift throughput far higher. Its three seeds all landed between 38.2 and 39.0×, though even that trails tuned parameter search.",
    d: "The all-in-one score is a geometric mean, so one weak metric sinks it. Rivals tuned hard for a single axis and lost ground elsewhere, while Fable 5 (Low) kept a moderate batch and light speculation that raise every metric at once, letting the lowest-effort run finish on top."
};

const modelKey = (model) => model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const rowKey = (row) => row.key || modelKey(row.model);
const markHtml = (row) => row.mark ? `<sup class="rank-mark">${row.mark}</sup>` : "";

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
        name.innerHTML = topRow.model + markHtml(topRow);
        copy.textContent = `${topRow.model} ranks first by combining competitive per-scenario speedups with reliably valid final submissions. Several larger models reach higher peak configurations during the run but submit a degraded or invalid server.`;
        return;
    }

    const column = scenarioColumns.find((item) => item.key === focus);
    const scenarioName = column?.shortLabel ?? "scenario";
    label.textContent = `Top ${scenarioName}`;
    name.innerHTML = topRow.model + markHtml(topRow);
    copy.textContent = scenarioFocusNotes[focus] ?? "";
}

const outcomeData = [
    { label: "Passed both gates", value: 67.5, color: "#2c365a" },
    { label: "Failed/incomplete quality gate", value: 9.9, color: "#c4bcb0" },
    { label: "Integrity-flagged", value: 13.9, color: "#d9d2c7" },
    { label: "Server/runtime failure", value: 8.7, color: "#586078" }
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
        value: 9.97,
        gap: "+3.94×"
    },
    {
        label: "Best-seen agent aggregate",
        description: "Best valid configuration discovered at any point.",
        value: 13.91,
        gap: "+0.39×"
    },
    {
        label: "Best non-agent search",
        description: "Upper bound from disciplined hyperparameter search.",
        value: 14.30
    }
];

const timeBudgetData = [
    {
        model: "Claude Haiku 4.5",
        values: [1.05, 2.78, 1.30, 1.35],
        sem: [0.16, 0.19, 0.20, 0.21],
        estimated: [true, false, true, true]
    },
    {
        model: "Claude Sonnet 4.5",
        values: [1.92, 3.18, 2.92, 2.81],
        sem: [0.66, 1.02, 1.01, 0.97],
        estimated: [true, false, true, true]
    },
    {
        model: "Claude Opus 4.5",
        values: [2.42, 3.76, 3.31, 3.24],
        sem: [0.70, 0.98, 0.96, 0.94],
        estimated: [true, false, true, true]
    }
];

const timeLabels = ["1h", "2h", "4h", "8h"];
const AGGREGATE_MIN = 1;
const AGGREGATE_MAX = 12.5;
const AGGREGATE_PLOT_HEIGHT = 250;

function fmt(value) {
    return `${value.toFixed(2)}×`;
}

function median(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2) return sorted[middle];
    return (sorted[middle - 1] + sorted[middle]) / 2;
}

function renderAggregateChart(targetId, data) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const plotHeight = (value) => {
        const clamped = Math.max(AGGREGATE_MIN, Math.min(AGGREGATE_MAX, value));
        return ((clamped - AGGREGATE_MIN) / (AGGREGATE_MAX - AGGREGATE_MIN)) * AGGREGATE_PLOT_HEIGHT;
    };

    const items = data.map((item) => {
        const height = plotHeight(item.value);
        const sem = item.sem ?? 0;
        const semLabel = sem > 0 ? `SEM ±${fmt(sem)}` : "no SEM";
        const whiskerLow = Math.max(AGGREGATE_MIN, item.value - sem);
        const whiskerHigh = item.value + sem;
        const whiskerLowHeight = plotHeight(whiskerLow);
        const whiskerHighHeight = Math.max(whiskerLowHeight, plotHeight(whiskerHigh));
        const whisker = sem > 0
            ? `<span class="ci-whisker" style="--ci-bottom:${whiskerLowHeight.toFixed(1)}px; --ci-top:${whiskerHighHeight.toFixed(1)}px;"></span>`
            : "";
        return `
            <div class="aggregate-item" aria-label="${item.label}: ${fmt(item.value)}, ${semLabel}">
                <div class="aggregate-label" title="${item.label}">
                    <span class="aggregate-name">${item.shortLabel ?? item.label}</span>
                    <span class="aggregate-value">${fmt(item.value)}</span>
                </div>
                <div class="lollipop" title="${item.label}: ${fmt(item.value)}; ${semLabel}" style="--height:${height}px; --bar:${item.bar === "#2c365a" ? "#6c7693" : item.bar}; --dot:${item.dot};">
                    ${whisker}
                </div>
            </div>
        `;
    }).join("");

    target.innerHTML = `<span class="aggregate-baseline" aria-hidden="true"><span>1x baseline</span></span>${items}`;
}

function renderAggregateCharts() {
    renderAggregateChart("aggregate-chart-expanded", aggregateExpandedData);
}

function renderScenarioBreakdown() {
    const target = document.getElementById("scenario-breakdown");
    if (!target) return;

    target.innerHTML = scenarioData.map((scenario) => {
        const agentValues = leaderboardRows
            .filter((row) => row.type === "agent" && !row.variant)
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
            <div class="leaderboard-row ${row.type}" data-model-key="${rowKey(row)}">
                <span class="rank-badge ${rankClass}">${index + 1}</span>
                <div>
                    <span class="model-name">${row.model}${markHtml(row)}</span>
                    <span class="model-subtitle">${row.scaffold}</span>
                </div>
                <div class="speed-track" aria-hidden="true">
                    <span class="speed-fill" style="--w:${width}%"></span>
                </div>
                <span class="row-speed">
                    <span class="row-speed-value">${fmt(row.value)}</span>
                    <span class="row-speed-sem">±${row.sem.toFixed(2)}×</span>
                </span>
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
            const element = existingRows.get(rowKey(row));
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
            <div class="matrix-cell matrix-model">${row.model}${markHtml(row)}</div>
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
                <div class="found-plot">
                    <span class="found-value">${fmt(item.value)}</span>
                    <span class="found-bar"></span>
                </div>
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

        const clampY = (value) => Math.max(minY, Math.min(maxY, value));
        const point = (value, index) => {
            const x = left + (index / (series.values.length - 1)) * plotW;
            const y = top + ((maxY - clampY(value)) / (maxY - minY)) * plotH;
            return { x, y };
        };

        const points = series.values.map(point);
        const path = points.map((p, index) => `${index === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
        const upperPoints = series.values.map((value, index) => point(value + (series.sem?.[index] ?? 0), index));
        const lowerPoints = series.values.map((value, index) => point(value - (series.sem?.[index] ?? 0), index)).reverse();
        const bandPath = [
            ...upperPoints.map((p, index) => `${index === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
            ...lowerPoints.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
            "Z"
        ].join(" ");
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
                    <path class="uncertainty" d="${bandPath}"></path>
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

renderAggregateCharts();
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
initBehaviorAtlas();

// ============================================================================
// Behavior Atlas
// ============================================================================
//
// Fetches data/trajectories.json (built offline by
// scripts/build_behavior_atlas.py) and renders a behavioral map of every run:
// tool-calls segmented into labeled episodes, positioned in a behavior space,
// with traceable per-run trajectories from Start, plus coverage / heatmap
// views. Rendering is a pure function of (atlasData, atlasState);
// hot paths (zoom/pan/hover/scrub) mutate attributes, never re-serialize.
// ============================================================================

const ATLAS_VB = 1000;                 // SVG viewBox size (world units)
const ATLAS_CENTER = ATLAS_VB / 2;
const ATLAS_DEFAULT_K = 0.5;           // start zoomed out so the spread layout fits
function atlasDefaultView() {
    const k = ATLAS_DEFAULT_K;
    return { x: ATLAS_CENTER * (1 - k), y: ATLAS_CENTER * (1 - k), k };
}

const ATLAS_OUTCOME_COLOR = {
    improved:               "#4f6b4a",
    regressed:              "#b66f3a",
    reverted:               "#c98a3a",
    launch_failed:          "#9a958a",
    neutral:                "#c4bdaf",
    invalid_or_reward_hack: "#9e4444",
    unknown:                "#d9d2c6",
};
const ATLAS_OUTCOME_LABEL = {
    improved: "Improved", regressed: "Regressed", reverted: "Reverted",
    launch_failed: "Launch failed", neutral: "Neutral",
    invalid_or_reward_hack: "Invalid / hack", unknown: "Unknown",
};

let atlasData = null;
let atlasIndex = null;
const atlasState = {
    scenario:   "all",
    agents:     null,                  // null = all, else Set
    ablation:   "main",
    families:   null,                  // null = all, else Set
    engines:    null,                  // null = all engine_selection engines, else Set
    projection: "semantic",            // "semantic" | "umap"
    pathStyle:  "agent",               // "agent" | "family" | "none"
    mainView:   "trace",               // "trace" | "map" — which view fills the centre stage
    view:       atlasDefaultView(),
    selectedRunId: null,
    hoveredRunId:  null,
    scrub:      { playing: false, step: null, rafId: null },
    famOpen:    { hp: false, engsel: false, eng: false },   // collapsible family-filter groups
    nodePos:    {},                    // epId -> [x,y] user-dragged overrides (viewbox units)
};

async function initBehaviorAtlas() {
    const shell = document.getElementById("atlas-shell");
    if (!shell) return;
    try {
        const res = await fetch("./data/trajectories.json", { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        atlasData = await res.json();
    } catch (e) {
        const c = document.getElementById("atlas-canvas");
        if (c) c.innerHTML = `<div class="atlas-error">Could not load trajectory data (${e.message}). The page expects <code>./data/trajectories.json</code>; serve locally via <code>python3 -m http.server</code> rather than opening the file directly.</div>`;
        return;
    }
    buildAtlasIndex();
    renderBehaviorAtlas();
}

function buildAtlasIndex() {
    const episodesById = {};
    atlasData.episodes.forEach((e) => { episodesById[e.id] = e; });
    const runsById = {};
    const runEpisodes = {};
    const runEvents = {};               // run -> total tool-calls across its episodes
    atlasData.runs.forEach((r) => {
        runsById[r.id] = r;
        runEpisodes[r.id] = r.episode_ids.map((id) => episodesById[id]).filter(Boolean);
        runEvents[r.id] = runEpisodes[r.id].reduce((s, e) => s + (e.n_events || 0), 0) || 1;
    });
    const familiesByKey = {};
    atlasData.families.forEach((f) => { familiesByKey[f.key] = f; });
    const agents = Array.from(new Set(atlasData.runs.map((r) => r.agent))).sort();
    // family centroids per projection (mean of member episode coords)
    const cent = { semantic: {}, umap: {} };
    ["semantic", "umap"].forEach((proj) => {
        const acc = {};
        atlasData.episodes.forEach((e) => {
            const k = e.strategy_family;
            const xy = e.xy[proj];
            (acc[k] = acc[k] || []).push(xy);
        });
        Object.entries(acc).forEach(([k, pts]) => {
            const sx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
            const sy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
            cent[proj][k] = [sx, sy];
        });
    });
    atlasIndex = { episodesById, runsById, runEpisodes, runEvents, familiesByKey, agents, centroids: cent };
}

function familyColor(key) {
    const f = atlasIndex.familiesByKey[key];
    return f ? f.color : "#999";
}
function outcomeColor(o) { return ATLAS_OUTCOME_COLOR[o] || "#999"; }

function atlasAgentColor(agent) {
    let h = 0;
    for (let i = 0; i < agent.length; i++) h = ((h * 31) + agent.charCodeAt(i)) | 0;
    return `hsl(${Math.abs(h) % 360}, 36%, 42%)`;
}

function renderBehaviorAtlas() {
    if (!atlasData) return;
    const stage = document.getElementById("atlas-stage");
    if (stage) stage.dataset.view = atlasState.mainView;
    placeAtlasViews();
    renderAtlasControls();
    renderAtlasToolbar();
    renderAtlasCanvas();
    renderAtlasLegend();
    renderAtlasTrace();
    syncScrubber();
}

// ---------------------------------------------------------------------------
// Filtering (shared by all views)
// ---------------------------------------------------------------------------
function atlasFilteredRuns() {
    if (!atlasData) return [];
    return atlasData.runs.filter((r) => {
        if (atlasState.scenario !== "all" && r.scenario !== atlasState.scenario) return false;
        const ab = r.ablation_kind || "main";
        if (atlasState.ablation !== "all" && ab !== atlasState.ablation) return false;
        if (atlasState.agents && !atlasState.agents.has(r.agent)) return false;
        if (atlasState.families) {
            if (!r.family_seq.some((f) => atlasState.families.has(f))) return false;
        }
        return true;
    });
}

function projXY(ep) {
    const o = atlasState.nodePos[ep.id];
    if (o) return [o[0], o[1]];
    const xy = ep.xy[atlasState.projection] || ep.xy.semantic;
    return [xy[0] * ATLAS_VB, xy[1] * ATLAS_VB];
}

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------
function renderAtlasCanvas() {
    const target = document.getElementById("atlas-canvas");
    if (!target) return;
    const runs = atlasFilteredRuns();
    const showEp = (e) => {
        if (e.strategy_family === "engine_selection")
            return !atlasState.engines || atlasState.engines.has(e.engine || "other");
        return !atlasState.families || atlasState.families.has(e.strategy_family);
    };

    // episodes in view = those of filtered runs
    const eps = [];
    runs.forEach((r) => atlasIndex.runEpisodes[r.id].forEach((e) => { if (showEp(e)) eps.push(e); }));

    // family regions (hulls)
    const regions = renderFamilyRegions(eps);
    // depth guide rings
    const rings = [0.30, 0.56, 0.80].map((rr, i) => {
        const px = rr * ATLAS_VB;
        return `<circle class="atlas-ring" cx="${ATLAS_CENTER}" cy="${ATLAS_CENTER}" r="${px.toFixed(1)}"/>`;
    }).join("") +
    `<text class="atlas-ring-label" x="${ATLAS_CENTER}" y="${ATLAS_CENTER - 0.30 * ATLAS_VB - 6}" text-anchor="middle">shallow loop</text>` +
    `<text class="atlas-ring-label" x="${ATLAS_CENTER}" y="${ATLAS_CENTER - 0.80 * ATLAS_VB - 6}" text-anchor="middle">deep optimization</text>`;

    // polylines from Start
    const edges = atlasState.pathStyle === "none" ? "" : runs.map((r) => buildRunPath(r)).join("");
    // nodes
    const nodes = eps.map((e) => {
        const [x, y] = projXY(e);
        // node radius ~ episode length (tool-calls), so bigger = more time spent
        const baseR = Math.max(2.6, Math.min(11, 2.6 + Math.sqrt(e.n_events || 1) * 1.25));
        // engineered technique episodes are drawn solid with a dark ring so the
        // rare "real engineering" stands out from flag-enabled technique use.
        const eng = e.tier === "engineered";
        return `<circle class="atlas-node ${eng ? "atlas-node--eng" : ""}" data-run-id="${e.run_id}" data-ep-id="${e.id}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${baseR.toFixed(2)}" data-base-r="${baseR.toFixed(2)}" fill="${familyColor(e.strategy_family)}"/>`;
    }).join("");
    // family labels
    const labels = renderFamilyLabels(eps);
    // start node
    const start = `<g class="atlas-start"><circle cx="${ATLAS_CENTER}" cy="${ATLAS_CENTER}" r="26"/><text x="${ATLAS_CENTER}" y="${ATLAS_CENTER - 2}" text-anchor="middle">Start</text><text x="${ATLAS_CENTER}" y="${ATLAS_CENTER + 11}" text-anchor="middle" class="atlas-start-sub">vanilla</text></g>`;

    const v = atlasState.view;
    target.innerHTML = `
        <svg class="atlas-svg" id="atlas-svg" viewBox="0 0 ${ATLAS_VB} ${ATLAS_VB}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Agent trajectory viewer">
            <g class="atlas-world" id="atlas-world" transform="translate(${v.x} ${v.y}) scale(${v.k})">
                <g class="atlas-rings">${rings}</g>
                <g class="atlas-regions">${regions}</g>
                <g class="atlas-edges" id="atlas-edges">${edges}</g>
                <g class="atlas-nodes" id="atlas-nodes">${nodes}</g>
                ${start}
                <g class="atlas-cluster-labels">${labels}</g>
                <g class="atlas-active" id="atlas-active"></g>
            </g>
        </svg>
        <div class="atlas-hint" id="atlas-hint">scroll to zoom · drag to pan</div>`;

    bindCanvasEvents();
    if (atlasState.selectedRunId) drawActiveRun(atlasState.selectedRunId);
    applyTrajectoryEmphasis();
}

function buildRunPath(r) {
    const eps = atlasIndex.runEpisodes[r.id];
    if (!eps.length) return "";
    let d = `M ${ATLAS_CENTER},${ATLAS_CENTER}`;
    eps.forEach((e) => { const [x, y] = projXY(e); d += ` L ${x.toFixed(1)},${y.toFixed(1)}`; });
    const color = atlasState.pathStyle === "agent" ? atlasAgentColor(r.agent) : "#9aa0ad";
    return `<path class="atlas-edge" data-run-id="${r.id}" d="${d}" stroke="${color}" fill="none" vector-effect="non-scaling-stroke"/>`;
}

function renderFamilyRegions(eps) {
    const byFam = {};
    eps.forEach((e) => { (byFam[e.strategy_family] = byFam[e.strategy_family] || []).push(projXY(e)); });
    return Object.entries(byFam).map(([fam, pts]) => {
        if (pts.length < 3) return "";
        const hull = atlasHull(pts);
        if (hull.length < 3) return "";
        const cx = hull.reduce((s, p) => s + p[0], 0) / hull.length;
        const cy = hull.reduce((s, p) => s + p[1], 0) / hull.length;
        const inf = 26;
        const d = hull.map(([x, y], i) => {
            const dx = x - cx, dy = y - cy, n = Math.hypot(dx, dy) || 1;
            return (i === 0 ? "M" : "L") + ` ${(x + dx / n * inf).toFixed(1)},${(y + dy / n * inf).toFixed(1)}`;
        }).join(" ") + " Z";
        return `<path class="atlas-region" d="${d}" fill="${familyColor(fam)}"/>`;
    }).join("");
}

function familyCanonicalXY(f) {
    const th = f.angle_deg * Math.PI / 180;
    return [(0.5 + f.base_radius * Math.cos(th)) * ATLAS_VB, (0.5 - f.base_radius * Math.sin(th)) * ATLAS_VB];
}

function renderFamilyLabels(eps) {
    // Live centroid per present family — follows the actual cluster (and any
    // nodes the user has dragged, since projXY honours overrides).
    const sum = {};
    eps.forEach((e) => {
        const [x, y] = projXY(e);
        const s = sum[e.strategy_family] || (sum[e.strategy_family] = [0, 0, 0]);
        s[0] += x; s[1] += y; s[2] += 1;
    });
    const centroid = (k) => { const s = sum[k]; return s ? [s[0] / s[2], s[1] / s[2]] : null; };
    // The whole hyperparameter-tuning cluster (tuning + every flag family) reads
    // as ONE cluster, so its single label centres on the combined mass.
    const hpCentroid = () => {
        const t = [0, 0, 0];
        atlasData.families.forEach((f) => {
            if (f.ring !== "tuning" && f.ring !== "flag") return;
            const s = sum[f.key];
            if (s) { t[0] += s[0]; t[1] += s[1]; t[2] += s[2]; }
        });
        return t[2] ? [t[0] / t[2], t[1] / t[2]] : null;
    };

    // Anchor each label: present families sit on their cluster centroid; empty
    // technique / engine / unused-space families fall back to their canonical
    // spoke so every category stays visible even at zero nodes.
    const items = [];
    atlasData.families.forEach((f) => {
        if (f.ring === "flag") return;                  // folded into the HP cluster
        const c = f.ring === "tuning" ? hpCentroid() : centroid(f.key);
        const present = !!c;
        if (f.ring === "operational" && !present) return;
        let mx, my;
        if (present) { [mx, my] = c; }
        else {
            const th = f.angle_deg * Math.PI / 180;
            mx = (0.5 + f.base_radius * Math.cos(th)) * ATLAS_VB;
            my = (0.5 - f.base_radius * Math.sin(th)) * ATLAS_VB;
        }
        const label = f.ring === "tuning" ? "Hyperparameter tuning" : f.label;
        const text = label + (f.n_episodes === 0 ? " (0)" : "");
        // approximate the label's rendered half-extent (viewBox units) so wide
        // labels are spread horizontally enough not to overlap.
        const hw = text.length * 4.3 + 9;
        items.push({ f, label, mx, my, x: mx, y: my - 24, empty: f.n_episodes === 0, hw, hh: 12 });
    });

    // Box-overlap separation: nudge any two labels whose text rectangles overlap
    // apart along their axis of least penetration. Wide (empty) rim labels get
    // pushed out horizontally so the whole ring reads as evenly spaced.
    for (let it = 0; it < 200; it++) {
        let moved = false;
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                const a = items[i], b = items[j];
                const dx = b.x - a.x, dy = b.y - a.y;
                const ox = (a.hw + b.hw + 6) - Math.abs(dx);   // horizontal overlap (+gap)
                const oy = (a.hh + b.hh + 4) - Math.abs(dy);   // vertical overlap (+gap)
                if (ox > 0 && oy > 0) {
                    if (ox < oy) {                              // separate horizontally
                        const s = (ox / 2) * (dx < 0 ? -1 : 1);
                        a.x -= s; b.x += s;
                    } else {                                    // separate vertically
                        const s = (oy / 2) * (dy < 0 ? -1 : 1);
                        a.y -= s; b.y += s;
                    }
                    moved = true;
                }
            }
        }
        if (!moved) break;
    }
    const lo = -360, hi = ATLAS_VB + 360;   // layout spreads beyond the viewBox
    const out = [];
    items.forEach((p) => {
        p.x = Math.max(lo, Math.min(hi, p.x));
        p.y = Math.max(lo, Math.min(hi, p.y));
        const f = p.f;
        const cls = "atlas-cluster-label"
            + (f.ring === "deep" ? " atlas-cluster-label--deep" : "")
            + (p.empty ? " atlas-cluster-label--empty" : "");
        if (p.empty) out.push(`<circle class="atlas-empty-marker" cx="${p.mx.toFixed(0)}" cy="${p.my.toFixed(0)}" r="3.2"/>`);
        if (Math.hypot(p.x - p.mx, p.y - p.my) > 32)
            out.push(`<line class="atlas-label-leader" x1="${p.mx.toFixed(0)}" y1="${p.my.toFixed(0)}" x2="${p.x.toFixed(0)}" y2="${(p.y - 4).toFixed(0)}"/>`);
        out.push(`<text class="${cls}" x="${p.x.toFixed(0)}" y="${p.y.toFixed(0)}" text-anchor="middle">${p.label}${p.empty ? " (0)" : ""}</text>`);
    });
    return out.join("");
}

// Andrew's monotone chain convex hull
function atlasHull(points) {
    const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (O, A, B) => (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
    const lower = [];
    for (const p of pts) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
    const upper = [];
    for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
    lower.pop(); upper.pop();
    return lower.concat(upper);
}

// ---------------------------------------------------------------------------
// Zoom / pan
// ---------------------------------------------------------------------------
function applyViewTransform() {
    const g = document.getElementById("atlas-world");
    const v = atlasState.view;
    if (g) g.setAttribute("transform", `translate(${v.x} ${v.y}) scale(${v.k})`);
    rescaleNodeVisuals();
}
let _rescaleRaf = null;
function rescaleNodeVisuals() {
    if (_rescaleRaf) return;
    _rescaleRaf = requestAnimationFrame(() => {
        _rescaleRaf = null;
        const k = atlasState.view.k;
        document.querySelectorAll("#atlas-nodes .atlas-node").forEach((el) => {
            const b = parseFloat(el.getAttribute("data-base-r"));
            el.setAttribute("r", (b / Math.sqrt(k)).toFixed(2));
        });
    });
}
function clientToWorld(svg, clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    // viewBox is square, preserveAspectRatio meet → letterboxed
    const side = Math.min(rect.width, rect.height);
    const offX = rect.left + (rect.width - side) / 2;
    const offY = rect.top + (rect.height - side) / 2;
    const sx = (clientX - offX) / side * ATLAS_VB;
    const sy = (clientY - offY) / side * ATLAS_VB;
    const v = atlasState.view;
    return [(sx - v.x) / v.k, (sy - v.y) / v.k];
}
function bindCanvasEvents() {
    const svg = document.getElementById("atlas-svg");
    if (!svg) return;
    svg.addEventListener("wheel", (ev) => {
        ev.preventDefault();
        const v = atlasState.view;
        const [wx, wy] = clientToWorld(svg, ev.clientX, ev.clientY);
        const k2 = Math.max(0.3, Math.min(7, v.k * Math.exp(-ev.deltaY * 0.0015)));
        // keep (wx,wy) under cursor: screen = world*k + offset
        const rect = svg.getBoundingClientRect();
        const side = Math.min(rect.width, rect.height);
        const offX = rect.left + (rect.width - side) / 2, offY = rect.top + (rect.height - side) / 2;
        const sx = (ev.clientX - offX) / side * ATLAS_VB, sy = (ev.clientY - offY) / side * ATLAS_VB;
        v.x = sx - wx * k2; v.y = sy - wy * k2; v.k = k2;
        applyViewTransform();
    }, { passive: false });
    let drag = null;
    svg.addEventListener("pointerdown", (ev) => {
        if (ev.target.closest(".atlas-node, .atlas-edge")) return;
        drag = { x: ev.clientX, y: ev.clientY, vx: atlasState.view.x, vy: atlasState.view.y };
        svg.setPointerCapture(ev.pointerId);
        svg.classList.add("is-dragging");
    });
    svg.addEventListener("pointermove", (ev) => {
        if (_nodeDrag) {
            if (!_nodeDrag.moved && Math.hypot(ev.clientX - _nodeDrag.startX, ev.clientY - _nodeDrag.startY) > 3) _nodeDrag.moved = true;
            if (_nodeDrag.moved) {
                const [wx, wy] = clientToWorld(svg, ev.clientX, ev.clientY);
                _nodeDrag.cur = [wx, wy];
                _nodeDrag.el.setAttribute("cx", wx.toFixed(1));
                _nodeDrag.el.setAttribute("cy", wy.toFixed(1));
                updateEdgeForNode(_nodeDrag.epId, wx, wy);
            }
            return;
        }
        if (!drag) return;
        const rect = svg.getBoundingClientRect();
        const side = Math.min(rect.width, rect.height);
        atlasState.view.x = drag.vx + (ev.clientX - drag.x) / side * ATLAS_VB;
        atlasState.view.y = drag.vy + (ev.clientY - drag.y) / side * ATLAS_VB;
        applyViewTransform();
    });
    const endDrag = (ev) => {
        if (_nodeDrag) {
            const nd = _nodeDrag;
            _nodeDrag = null;
            if (nd.moved && nd.cur) {
                atlasState.nodePos[nd.epId] = nd.cur;
                _suppressNodeClick = true;
                renderBehaviorAtlas();   // rebuild so edges/labels follow the new spot
            } else {
                // a click, not a drag → select the run (pointer capture can
                // swallow the native click event, so do it here)
                const ep = atlasIndex.episodesById[nd.epId];
                if (ep) selectRun(ep.run_id);
            }
            return;
        }
        if (drag) { drag = null; svg.classList.remove("is-dragging"); }
    };
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);
    svg.addEventListener("click", (ev) => {
        if (ev.target.closest(".atlas-node, .atlas-edge")) return;
        if (atlasState.selectedRunId) { atlasState.selectedRunId = null; stopScrub(); atlasState.view = atlasDefaultView(); renderBehaviorAtlas(); }
    });
    // node + edge interactivity
    svg.querySelectorAll(".atlas-edge").forEach((el) => {
        el.addEventListener("mouseenter", () => onRunHover(el.dataset.runId));
        el.addEventListener("mouseleave", onAtlasLeave);
        el.addEventListener("click", () => selectRun(el.dataset.runId));
    });
    svg.querySelectorAll(".atlas-node").forEach((el) => {
        el.addEventListener("mouseenter", (ev) => { if (!_nodeDrag) { onRunHover(el.dataset.runId); showEpisodeTooltip(ev, el.dataset.epId); } });
        el.addEventListener("mousemove", (ev) => { if (!_nodeDrag) positionAtlasTooltip(ev); });
        el.addEventListener("mouseleave", onAtlasLeave);
        el.addEventListener("pointerdown", (ev) => {
            ev.stopPropagation();
            _nodeDrag = { el, epId: el.dataset.epId, startX: ev.clientX, startY: ev.clientY, moved: false };
            svg.setPointerCapture(ev.pointerId);
            hideAtlasTooltip();
        });
    });
}

let _nodeDrag = null;
let _suppressNodeClick = false;

// Live-update the polyline(s) touching a dragged episode so the trajectory
// follows the node before the full re-render on drop.
function updateEdgeForNode(epId, wx, wy) {
    const ep = atlasIndex.episodesById[epId];
    if (!ep) return;
    const eps = atlasIndex.runEpisodes[ep.run_id];
    const i = eps.findIndex((e) => e.id === epId);
    if (i < 0) return;
    let d = `M ${ATLAS_CENTER},${ATLAS_CENTER}`;
    eps.forEach((e, j) => {
        const [x, y] = (j === i) ? [wx, wy] : projXY(e);
        d += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
    });
    document.querySelectorAll(`#atlas-edges .atlas-edge[data-run-id="${ep.run_id}"]`).forEach((p) => p.setAttribute("d", d));
}

function computeFitView(r) {
    const eps = atlasIndex.runEpisodes[r.id];
    const pts = [[ATLAS_CENTER, ATLAS_CENTER]].concat(eps.map((e) => projXY(e)));
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    pts.forEach(([x, y]) => { minx = Math.min(minx, x); miny = Math.min(miny, y); maxx = Math.max(maxx, x); maxy = Math.max(maxy, y); });
    const pad = 80;
    const w = (maxx - minx) + pad * 2, h = (maxy - miny) + pad * 2;
    const k = Math.max(0.6, Math.min(5, ATLAS_VB / Math.max(w, h)));
    return { k, x: ATLAS_CENTER - ((minx + maxx) / 2) * k, y: ATLAS_CENTER - ((miny + maxy) / 2) * k };
}
function fitToRun(r) { atlasState.view = computeFitView(r); }

// Camera helpers used by the play "tour" of the behavior map.
const ATLAS_PLAY_ZOOM = 2.4;
let _camRaf = null;
function easeInOut(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
function centerView(wx, wy, k) { return { k, x: ATLAS_CENTER - wx * k, y: ATLAS_CENTER - wy * k }; }
function cancelCamAnim() { if (_camRaf) { cancelAnimationFrame(_camRaf); _camRaf = null; } }
// Tween the viewport to a target {x,y,k}; calls done() when it arrives (if still playing).
function animateViewTo(target, dur, done) {
    cancelCamAnim();
    const from = { ...atlasState.view };
    const t0 = performance.now();
    const frame = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = easeInOut(p);
        atlasState.view = { x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e, k: from.k + (target.k - from.k) * e };
        applyViewTransform();
        if (p < 1) _camRaf = requestAnimationFrame(frame);
        else { _camRaf = null; if (done) done(); }
    };
    _camRaf = requestAnimationFrame(frame);
}
// Pan/zoom along one path segment (node[fromStep] → node[toStep]) while the
// trajectory line draws itself toward the next node, then call done().
function animateMapSegment(fromStep, toStep, dur, done) {
    cancelCamAnim();
    const eps = atlasIndex.runEpisodes[atlasState.selectedRunId];
    const node = (s) => (s < 0 ? [ATLAS_CENTER, ATLAS_CENTER] : projXY(eps[s]));
    const a = node(fromStep), b = node(toStep);
    const edge = document.getElementById("atlas-active-edge");
    const total = edge ? edge.getTotalLength() : 0;
    const fA = (fromStep + 1) / eps.length, fB = (toStep + 1) / eps.length;
    const t0 = performance.now();
    const frame = (t) => {
        if (!atlasState.scrub.playing) { _camRaf = null; return; }
        const p = Math.min(1, (t - t0) / dur);
        const e = easeInOut(p);
        atlasState.view = centerView(a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, ATLAS_PLAY_ZOOM);
        applyViewTransform();
        if (edge) { edge.style.strokeDasharray = total; edge.style.strokeDashoffset = (total * (1 - (fA + (fB - fA) * e))).toFixed(1); }
        if (p < 1) _camRaf = requestAnimationFrame(frame);
        else { _camRaf = null; if (done) done(); }
    };
    _camRaf = requestAnimationFrame(frame);
}

// ---------------------------------------------------------------------------
// Hover / select / emphasis (hot path: attributes only)
// ---------------------------------------------------------------------------
function onRunHover(id) { atlasState.hoveredRunId = id; applyTrajectoryEmphasis(); }
function onAtlasLeave() { atlasState.hoveredRunId = null; hideAtlasTooltip(); applyTrajectoryEmphasis(); }

function applyTrajectoryEmphasis() {
    const sel = atlasState.selectedRunId, hov = atlasState.hoveredRunId;
    const focus = sel || hov;
    document.querySelectorAll("#atlas-edges .atlas-edge").forEach((el) => {
        const id = el.dataset.runId;
        const on = id === sel || id === hov;
        el.style.strokeOpacity = on ? "0.95" : (focus ? "0.03" : (atlasState.pathStyle === "agent" ? 0.14 : 0.1));
        el.style.strokeWidth = on ? "2.4" : "1";
    });
    if (sel) return; // selected run's nodes handled by drawActiveRun
    document.querySelectorAll("#atlas-nodes .atlas-node").forEach((el) => {
        const on = el.dataset.runId === hov;
        el.style.opacity = (!focus || on) ? "1" : "0.12";
    });
}

function setMainView(v) {
    if (atlasState.mainView === v) return;
    atlasState.mainView = v;
    renderBehaviorAtlas();
}

// The trace panel and the behavior map swap between the big centre slot and the
// small companion slot (under "At a glance") whenever the view is toggled.
function placeAtlasViews() {
    const main = document.getElementById("atlas-main");
    const comp = document.getElementById("atlas-companion");
    const head = document.getElementById("atlas-companion-head");
    const trace = document.getElementById("atlas-trace");
    const canvas = document.getElementById("atlas-canvas");
    if (!main || !comp || !trace || !canvas) return;
    const mapMain = atlasState.mainView === "map";
    main.appendChild(mapMain ? canvas : trace);
    comp.appendChild(mapMain ? trace : canvas);
    // the legend belongs to the map, so it follows it between the two slots
    const legend = document.getElementById("atlas-legend");
    const scrubber = document.getElementById("atlas-scrubber");
    if (legend) {
        if (mapMain && scrubber) scrubber.after(legend);   // under the big map in the centre
        else comp.after(legend);                            // beside the small map in the side
    }
    if (head) {
        head.innerHTML = `<span>${mapMain ? "Run trace" : "Behavior map"}</span><button class="atlas-companion-enlarge" type="button" title="Show in main view">⤢ enlarge</button>`;
        const btn = head.querySelector(".atlas-companion-enlarge");
        if (btn) btn.addEventListener("click", () => setMainView(mapMain ? "trace" : "map"));
    }
}

function selectRun(id) {
    if (atlasState.selectedRunId === id) { atlasState.selectedRunId = null; stopScrub(); atlasState.view = atlasDefaultView(); }
    else { atlasState.selectedRunId = id; fitToRun(atlasIndex.runsById[id]); atlasState.scrub.step = null; }
    renderBehaviorAtlas();
}

function drawActiveRun(id) {
    const r = atlasIndex.runsById[id];
    const g = document.getElementById("atlas-active");
    if (!r || !g) return;
    const eps = atlasIndex.runEpisodes[id];
    let d = `M ${ATLAS_CENTER},${ATLAS_CENTER}`;
    const markers = [];
    eps.forEach((e, i) => {
        const [x, y] = projXY(e);
        d += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
        markers.push(`<g class="atlas-step" data-step="${i}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${familyColor(e.strategy_family)}"/><text x="${x.toFixed(1)}" y="${(y + 3.4).toFixed(1)}" text-anchor="middle">${i + 1}</text></g>`);
    });
    g.innerHTML = `<path class="atlas-active-edge" id="atlas-active-edge" d="${d}" fill="none" vector-effect="non-scaling-stroke"/>${markers.join("")}`;
    // dim all base nodes when a run is selected
    document.querySelectorAll("#atlas-nodes .atlas-node").forEach((el) => { el.style.opacity = "0.08"; });
    g.querySelectorAll(".atlas-step").forEach((el) => {
        el.addEventListener("click", () => setScrubStep(parseInt(el.dataset.step, 10)));
    });
}

// ---------------------------------------------------------------------------
// Tooltips
// ---------------------------------------------------------------------------
function ensureAtlasTooltip() {
    let tt = document.getElementById("atlas-tooltip");
    if (!tt) { tt = document.createElement("div"); tt.id = "atlas-tooltip"; tt.className = "atlas-tooltip"; document.body.appendChild(tt); }
    tt.style.display = "block";
    return tt;
}
function showEpisodeTooltip(ev, epId) {
    const e = atlasIndex.episodesById[epId];
    if (!e) return;
    const tt = ensureAtlasTooltip();
    const fam = atlasIndex.familiesByKey[e.strategy_family];
    const run = atlasIndex.runsById[e.run_id];
    const summary = e.summary ? `<span class="atlas-tt-sum">${escapeHtml(e.summary)}</span>` : "";
    const share = Math.round((e.n_events || 0) / atlasIndex.runEvents[e.run_id] * 100);
    const tier = e.tier === "flag" ? ` · <span class="atlas-tt-tier">flag-enabled</span>`
        : e.tier === "engineered" ? ` · <span class="atlas-tt-tier is-eng">engineered</span>` : "";
    tt.innerHTML = `<span style="color:${fam ? fam.color : '#999'}">● ${fam ? fam.label : e.strategy_family}</span>${tier}${e.score != null ? ` · ${e.score} tok/s` : ""}<br>${summary}<br><span class="atlas-tt-run">${run ? run.agent : e.run_id} · step ${e.idx + 1} · ${e.n_events} tool-calls (${share}% of run)</span>`;
    positionAtlasTooltip(ev);
}
function positionAtlasTooltip(ev) {
    const tt = document.getElementById("atlas-tooltip");
    if (!tt) return;
    tt.style.left = (ev.clientX + 14) + "px";
    tt.style.top = (ev.clientY + 14) + "px";
}
function hideAtlasTooltip() { const tt = document.getElementById("atlas-tooltip"); if (tt) tt.style.display = "none"; }

// ---------------------------------------------------------------------------
// Headline + Toolbar + Legend
// ---------------------------------------------------------------------------
function renderAtlasHeadline() {
    const el = document.getElementById("atlas-headline");
    if (!el) return;
    const s = atlasData.stats;
    const chips = [
        ["85.3%", "ship vLLM", "of runs submit a vLLM-based server"],
        [`${Math.round(s.pct_le1_distinct_config * 100)}%`, "explore ≤1 config", "barely iterate over the 2h budget"],
    ];
    el.innerHTML = chips.map(([n, l, sub]) => `<div class="atlas-chip"><span class="atlas-chip-n">${n}</span><span class="atlas-chip-l">${l}</span><span class="atlas-chip-sub">${sub}</span></div>`).join("");
}

function renderAtlasToolbar() {
    const el = document.getElementById("atlas-toolbar");
    if (!el) return;
    const sel = atlasState.selectedRunId ? atlasIndex.runsById[atlasState.selectedRunId] : null;
    const isMap = atlasState.mainView === "map";
    const mapControls = `
        <div class="atlas-seg" data-control="projection">
            <button data-value="semantic" class="${atlasState.projection === "semantic" ? "is-active" : ""}">Semantic</button>
            <button data-value="umap" class="${atlasState.projection === "umap" ? "is-active" : ""}">UMAP</button>
        </div>
        <div class="atlas-zoom">
            <button data-zoom="in" title="Zoom in">+</button>
            <button data-zoom="out" title="Zoom out">−</button>
            <button data-zoom="reset" title="Reset view">Reset</button>
        </div>`;
    const hint = isMap ? "click any run to trace it from Start" : "pick a run to replay its trace step by step";
    // the trace view has its own "pick another run" control, so only the map needs a clear button
    const tail = sel ? (isMap ? `<button class="atlas-clear" data-zoom="clear">✕ clear “${sel.agent}”</button>` : "") : `<span class="atlas-toolbar-hint">${hint}</span>`;
    el.innerHTML = `${isMap ? mapControls : ""}${tail}`;
    el.querySelectorAll("[data-control='projection'] button").forEach((b) => b.addEventListener("click", () => { atlasState.projection = b.dataset.value; renderBehaviorAtlas(); }));
    el.querySelectorAll("[data-zoom]").forEach((b) => b.addEventListener("click", () => {
        const z = b.dataset.zoom;
        if (z === "in") atlasState.view.k = Math.min(7, atlasState.view.k * 1.4);
        else if (z === "out") atlasState.view.k = Math.max(0.3, atlasState.view.k / 1.4);
        else if (z === "reset") atlasState.view = atlasDefaultView();
        else if (z === "clear") { atlasState.selectedRunId = null; stopScrub(); renderBehaviorAtlas(); return; }
        applyViewTransform();
    }));
}

function shortFam(f) {
    if (f.ring !== "flag") return f.label;
    const s = f.label.replace(/^Hyperparameter tuning \(/, "").replace(/\)$/, "");
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const ENGINE_META = {
    vllm:     { label: "vLLM",          color: "#2c365a" },
    sglang:   { label: "SGLang",        color: "#4a6b8a" },
    tgi:      { label: "TGI",           color: "#5a7a8c" },
    tensorrt: { label: "TensorRT-LLM",  color: "#6a5a8c" },
    lmdeploy: { label: "LMDeploy",      color: "#8a6b9c" },
    custom:   { label: "Custom server", color: "#1a1f33" },
    other:    { label: "Other engine",  color: "#9aa0b0" },
};
// engine breakdown of the engine_selection family (computed once from the data)
function atlasEngines() {
    if (atlasIndex._engines) return atlasIndex._engines;
    const c = {};
    atlasData.episodes.forEach((e) => {
        if (e.strategy_family !== "engine_selection") return;
        const g = e.engine || "other";
        c[g] = (c[g] || 0) + 1;
    });
    const order = Object.keys(ENGINE_META);
    atlasIndex._engines = Object.keys(c).sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .map((k) => ({ key: k, n: c[k], ...(ENGINE_META[k] || { label: k, color: "#9aa0b0" }) }));
    return atlasIndex._engines;
}

function renderFamilyFilter() {
    const cbox = (f) => {
        const on = !atlasState.families || atlasState.families.has(f.key);
        const empty = f.n_episodes === 0;
        return `<label class="${on ? "is-on" : ""} ${f.ring === "deep" ? "is-deep" : ""} ${empty ? "is-empty" : ""}" title="${f.label}"><input type="checkbox" data-value="${f.key}" ${on ? "checked" : ""}><i style="background:${f.color}"></i>${shortFam(f)}${empty ? " (0)" : ""}</label>`;
    };
    const ebox = (e) => {
        const on = !atlasState.engines || atlasState.engines.has(e.key);
        return `<label class="${on ? "is-on" : ""}" title="${e.label} (${e.n})"><input type="checkbox" data-eng="${e.key}" ${on ? "checked" : ""}><i style="background:${e.color}"></i>${e.label} <span class="atlas-sub">(${e.n})</span></label>`;
    };
    const inRings = (rs) => atlasData.families.filter((f) => rs.includes(f.ring)).sort((a, b) => a.order_index - b.order_index);
    const engines = atlasEngines();

    const blocks = [];
    // Operational (flat)
    const ops = inRings(["operational"]);
    blocks.push(`<div class="atlas-fam-group"><div class="atlas-fam-ghdr-static">Operational</div>${ops.map(cbox).join("")}</div>`);
    // Hyperparameter tuning (collapsible)
    const hp = inRings(["tuning", "flag"]);
    blocks.push(collGroup("hp", "Hyperparameter tuning", hp.length, hp.map(cbox).join("")));
    // Engine selection (collapsible, split by engine)
    blocks.push(collGroup("engsel", "Engine selection", engines.length, engines.map(ebox).join("")));
    // Unused action space (collapsible)
    const deep = inRings(["deep"]);
    blocks.push(collGroup("eng", "Unused action space", deep.length, deep.map(cbox).join("")));
    return blocks.join("");

    function collGroup(key, name, count, inner) {
        const open = atlasState.famOpen[key];
        return `<div class="atlas-fam-group"><button class="atlas-fam-grouphdr" data-fam-group="${key}">${open ? "▾" : "▸"} ${name} <span class="atlas-sub">(${count})</span></button>${open ? `<div class="atlas-fam-groupitems">${inner}</div>` : ""}</div>`;
    }
}

function renderAtlasLegend() {
    const el = document.getElementById("atlas-legend");
    if (!el) return;
    // Grouped legend over the FULL action space (empty categories shown dimmed).
    const groups = [
        ["Operational", "operational"],
        ["Hyperparameter tuning", "tuning,flag"],
        ["Engine selection", "engine"],
        ["Unused action space", "deep"],
    ];
    const chip = (f) => `<span class="atlas-legend-item ${f.ring === "deep" ? "is-deep" : ""} ${f.n_episodes === 0 ? "is-empty" : ""}"><i style="background:${f.color}"></i>${shortFam(f)}${f.n_episodes === 0 ? " (0)" : ""}</span>`;
    const echip = (e) => `<span class="atlas-legend-item"><i style="background:${e.color}"></i>${e.label} <span class="atlas-sub">(${e.n})</span></span>`;
    el.innerHTML = groups.map(([name, rings]) => {
        // engine_selection is broken out by the actual engine (vLLM, SGLang, …)
        if (rings === "engine") {
            const engines = atlasEngines();
            if (!engines.length) return "";
            return `<span class="atlas-legend-group"><span class="atlas-legend-gname">${name}</span>${engines.map(echip).join("")}</span>`;
        }
        const rs = rings.split(",");
        const items = atlasData.families.filter((f) => rs.includes(f.ring)).sort((a, b) => a.order_index - b.order_index);
        if (!items.length) return "";
        return `<span class="atlas-legend-group"><span class="atlas-legend-gname">${name}</span>${items.map(chip).join("")}</span>`;
    }).join("")
        + `<span class="atlas-legend-sep">node size = tool-calls</span>`;
}

// ---------------------------------------------------------------------------
// Scrubber
// ---------------------------------------------------------------------------
function syncScrubber() {
    const el = document.getElementById("atlas-scrubber");
    if (!el) return;
    const sel = atlasState.selectedRunId ? atlasIndex.runsById[atlasState.selectedRunId] : null;
    if (!sel) { el.hidden = true; el.innerHTML = ""; return; }
    el.hidden = false;
    const n = atlasIndex.runEpisodes[sel.id].length;
    const step = atlasState.scrub.step == null ? n - 1 : atlasState.scrub.step;
    el.innerHTML = `
        <button class="atlas-play" id="atlas-play">${atlasState.scrub.playing ? "❚❚" : "▶"}</button>
        <input type="range" id="atlas-range" min="0" max="${n - 1}" value="${step}">
        <span class="atlas-step-label">step ${step + 1}/${n}</span>`;
    document.getElementById("atlas-range").addEventListener("input", (e) => setScrubStep(parseInt(e.target.value, 10)));
    document.getElementById("atlas-play").addEventListener("click", toggleScrub);
    applyScrubFrame(step);
}
function setScrubStep(s) { stopScrub(); atlasState.scrub.step = s; applyScrubFrame(s); updateScrubSlider(s); }
function updateScrubSlider(s) {
    const r = document.getElementById("atlas-range"); if (r) r.value = s;
    const lbl = document.querySelector(".atlas-step-label");
    const n = atlasIndex.runEpisodes[atlasState.selectedRunId].length;
    if (lbl) lbl.textContent = `step ${s + 1}/${n}`;
}
function setPlayBtn(on) { const b = document.getElementById("atlas-play"); if (b) b.textContent = on ? "❚❚" : "▶"; }
function applyStepHighlights(step) {
    document.querySelectorAll("#atlas-active .atlas-step").forEach((el) => {
        const i = parseInt(el.dataset.step, 10);
        el.classList.toggle("is-active", i === step);
        el.style.opacity = i <= step ? "1" : "0.25";
    });
    document.querySelectorAll("#atlas-trace .atlas-tl-row").forEach((el) => {
        el.classList.toggle("is-active", parseInt(el.dataset.step, 10) === step);
        if (el.classList.contains("is-active")) el.scrollIntoView({ block: "nearest" });
    });
}
function applyScrubFrame(step) {
    const edge = document.getElementById("atlas-active-edge");
    if (edge) {
        const eps = atlasIndex.runEpisodes[atlasState.selectedRunId];
        const total = edge.getTotalLength();
        const frac = (step + 1) / eps.length;
        edge.style.strokeDasharray = total;
        edge.style.strokeDashoffset = (total * (1 - frac)).toFixed(1);
    }
    applyStepHighlights(step);
}
function toggleScrub() {
    if (atlasState.scrub.playing) { stopScrub(); return; }
    atlasState.scrub.playing = true;
    setPlayBtn(true);
    const eps = atlasIndex.runEpisodes[atlasState.selectedRunId];
    const n = eps.length;
    if (atlasState.scrub.step == null || atlasState.scrub.step >= n - 1) atlasState.scrub.step = -1;
    // On the behavior map the camera flies along the path, zoomed into each node;
    // elsewhere (trace view) it is the plain timeline step-through.
    const tour = atlasState.mainView === "map";
    const SEG = tour ? 850 : 650;
    const step = () => {
        if (!atlasState.scrub.playing) return;
        const from = atlasState.scrub.step;
        const to = from + 1;
        atlasState.scrub.step = to;
        updateScrubSlider(to);
        applyStepHighlights(to);
        const after = () => {
            if (to >= n - 1) {
                stopScrub();
                if (tour) animateViewTo(computeFitView(atlasIndex.runsById[atlasState.selectedRunId]), 700);
                return;
            }
            atlasState.scrub.rafId = setTimeout(step, tour ? 70 : SEG);
        };
        if (tour) animateMapSegment(from, to, SEG, after);
        else { applyScrubFrame(to); after(); }
    };
    if (tour) {
        applyScrubFrame(atlasState.scrub.step);   // sync the line's reveal to the start before flying in
        // ease from the current framing into a zoomed-in shot of the starting node first
        const nd = atlasState.scrub.step < 0 ? [ATLAS_CENTER, ATLAS_CENTER] : projXY(eps[atlasState.scrub.step]);
        animateViewTo(centerView(nd[0], nd[1], ATLAS_PLAY_ZOOM), 500, () => { if (atlasState.scrub.playing) step(); });
    } else step();
}
function stopScrub() {
    atlasState.scrub.playing = false;
    if (atlasState.scrub.rafId) { clearTimeout(atlasState.scrub.rafId); atlasState.scrub.rafId = null; }
    cancelCamAnim();
    setPlayBtn(false);
}

// ---------------------------------------------------------------------------
// Controls (left rail)
// ---------------------------------------------------------------------------
function renderAtlasControls() {
    const el = document.getElementById("atlas-controls");
    if (!el) return;
    const agents = atlasIndex.agents;
    const isOn = (a) => !atlasState.agents || atlasState.agents.has(a);
    const ablations = Array.from(new Set(atlasData.runs.map((r) => r.ablation_kind || "main")));
    const abLabel = { main: "Main", no_action_space: "No action space", structured_iteration: "Structured iter" };

    el.innerHTML = `
        <div class="atlas-cblock">
            <div class="atlas-clabel">Scenario</div>
            <div class="atlas-seg atlas-seg--wrap" data-control="scenario">
                ${["all", "A", "B", "C", "D"].map((s) => `<button data-value="${s}" class="${atlasState.scenario === s ? "is-active" : ""}">${s === "all" ? "All" : s}</button>`).join("")}
            </div>
        </div>
        ${ablations.length > 1 ? `<div class="atlas-cblock">
            <div class="atlas-clabel">Condition</div>
            <div class="atlas-seg atlas-seg--wrap" data-control="ablation">
                <button data-value="all" class="${atlasState.ablation === "all" ? "is-active" : ""}">All</button>
                ${ablations.map((a) => `<button data-value="${a}" class="${atlasState.ablation === a ? "is-active" : ""}">${abLabel[a] || a}</button>`).join("")}
            </div>
        </div>` : ""}
        <div class="atlas-cblock">
            <div class="atlas-clabel">Trajectory lines</div>
            <div class="atlas-seg atlas-seg--wrap" data-control="pathStyle">
                ${[["agent", "By agent"], ["family", "Plain"], ["none", "Hide"]].map(([v, l]) => `<button data-value="${v}" class="${atlasState.pathStyle === v ? "is-active" : ""}">${l}</button>`).join("")}
            </div>
        </div>
        <div class="atlas-cblock">
            <div class="atlas-clabel">Strategy family</div>
            <div class="atlas-checks atlas-checks--fam" data-control="family">
                <button class="atlas-fam-all" data-value="__all">${atlasState.families ? "All" : "Clear"}</button>
                ${renderFamilyFilter()}
            </div>
        </div>
        <div class="atlas-cblock">
            <div class="atlas-clabel">Agent (${agents.filter(isOn).length}/${agents.length})</div>
            <div class="atlas-agents" data-control="agent">
                <button class="atlas-fam-all" data-value="__all">${atlasState.agents ? "All" : "Clear"}</button>
                ${agents.map((a) => `<label class="${isOn(a) ? "is-on" : ""}"><input type="checkbox" data-value="${a}" ${isOn(a) ? "checked" : ""}>${a}</label>`).join("")}
            </div>
        </div>`;

    el.querySelectorAll("[data-control='scenario'] button").forEach((b) => b.addEventListener("click", () => { atlasState.scenario = b.dataset.value; applyFilterChange(); }));
    el.querySelectorAll("[data-control='ablation'] button").forEach((b) => b.addEventListener("click", () => { atlasState.ablation = b.dataset.value; applyFilterChange(); }));
    el.querySelectorAll("[data-control='pathStyle'] button").forEach((b) => b.addEventListener("click", () => { atlasState.pathStyle = b.dataset.value; renderBehaviorAtlas(); }));
    const famKeys = atlasData.families.filter((f) => f.ring !== "engine").map((f) => f.key);
    el.querySelectorAll("[data-control='family'] input[data-value]").forEach((i) => i.addEventListener("change", () => {
        if (!atlasState.families) atlasState.families = new Set(famKeys);
        i.checked ? atlasState.families.add(i.dataset.value) : atlasState.families.delete(i.dataset.value);
        if (atlasState.families.size === famKeys.length) atlasState.families = null;
        applyFilterChange();
    }));
    el.querySelectorAll("[data-control='family'] input[data-eng]").forEach((i) => i.addEventListener("change", () => {
        const engKeys = atlasEngines().map((e) => e.key);
        if (!atlasState.engines) atlasState.engines = new Set(engKeys);
        i.checked ? atlasState.engines.add(i.dataset.eng) : atlasState.engines.delete(i.dataset.eng);
        if (atlasState.engines.size === engKeys.length) atlasState.engines = null;
        applyFilterChange();
    }));
    el.querySelector("[data-control='family'] .atlas-fam-all").addEventListener("click", () => {
        const off = atlasState.families || atlasState.engines;
        atlasState.families = off ? null : new Set();
        atlasState.engines = off ? null : new Set();
        applyFilterChange();
    });
    el.querySelectorAll("[data-fam-group]").forEach((b) => b.addEventListener("click", () => { atlasState.famOpen[b.dataset.famGroup] = !atlasState.famOpen[b.dataset.famGroup]; renderAtlasControls(); }));
    el.querySelectorAll("[data-control='agent'] input").forEach((i) => i.addEventListener("change", () => {
        if (!atlasState.agents) atlasState.agents = new Set(atlasIndex.agents);
        i.checked ? atlasState.agents.add(i.dataset.value) : atlasState.agents.delete(i.dataset.value);
        if (atlasState.agents.size === atlasIndex.agents.length) atlasState.agents = null;
        applyFilterChange();
    }));
    el.querySelector("[data-control='agent'] .atlas-fam-all").addEventListener("click", () => { atlasState.agents = atlasState.agents ? null : new Set(); applyFilterChange(); });
}
// Filter edits keep the current run selected — they only re-render the views.
function applyFilterChange() { renderBehaviorAtlas(); }

// The trace panel is one combined box: with no run picked it is the run picker
// ("Pick a run"); once a run is chosen it swaps to that run's replay timeline.
// Its outer size is fixed — the inner list / timeline scrolls.
function renderAtlasTrace() {
    const el = document.getElementById("atlas-trace");
    if (!el) return;
    const sel = atlasState.selectedRunId ? atlasIndex.runsById[atlasState.selectedRunId] : null;
    if (!sel) {
        el.innerHTML = renderRunList(atlasFilteredRuns(), null);
        const search = document.getElementById("atlas-runsearch");
        if (search) search.addEventListener("input", () => {
            const q = search.value.toLowerCase();
            el.querySelectorAll(".atlas-runrow").forEach((row) => {
                row.style.display = row.dataset.label.includes(q) ? "" : "none";
            });
        });
        el.querySelectorAll(".atlas-runrow").forEach((row) => row.addEventListener("click", () => selectRun(row.dataset.runId)));
        return;
    }
    el.innerHTML = renderRunReplay(sel);
    // back to the picker
    const back = el.querySelector(".atlas-tl-back");
    if (back) back.addEventListener("click", () => selectRun(sel.id));
    // step scrubbing by clicking an episode row
    el.querySelectorAll(".atlas-tl-row").forEach((row) => row.addEventListener("click", () => setScrubStep(parseInt(row.dataset.step, 10))));
}

function renderRunList(runs, sel) {
    const sorted = [...runs].sort((a, b) => a.agent.localeCompare(b.agent) || a.scenario.localeCompare(b.scenario) || String(a.seed).localeCompare(String(b.seed)));
    const rows = sorted.map((r) => {
        const label = `${r.agent} ${r.scenario} ${r.ablation_kind || ""}`.toLowerCase();
        const isSel = sel && r.id === sel.id;
        return `<button class="atlas-runrow ${isSel ? "is-sel" : ""}" data-run-id="${r.id}" data-label="${label}">
            <span class="atlas-runrow-dot" style="background:${atlasAgentColor(r.agent)}"></span>
            <span class="atlas-runrow-name">${r.agent}</span>
            <span class="atlas-runrow-meta">${r.scenario}${r.ablation_kind ? "·" + r.ablation_kind.replace("no_action_space", "no-AS").replace("structured_iteration", "struct") : ""} · ${r.n_episodes}ep</span>
        </button>`;
    }).join("");
    return `<div class="atlas-iblock">
        <div class="atlas-ititle">Pick a run <span class="atlas-sub">(${runs.length})</span></div>
        <input class="atlas-runsearch" id="atlas-runsearch" type="text" placeholder="filter by agent / scenario…" autocomplete="off">
        <div class="atlas-runlist">${rows}</div>
    </div>`;
}

function renderRunReplay(r) {
    const eps = atlasIndex.runEpisodes[r.id];
    const rows = eps.map((e, i) => {
        const fam = atlasIndex.familiesByKey[e.strategy_family];
        const tmpl = (e.cmd_templates || []).slice(0, 2).map((t) => `<code>${escapeHtml(t)}</code>`).join("");
        const summary = e.summary ? `<span class="atlas-tl-summary">${escapeHtml(e.summary)}</span>` : "";
        const score = e.score != null ? `<span class="atlas-tl-score">${e.score} tok/s</span>` : "";
        const share = (e.n_events || 0) / atlasIndex.runEvents[r.id];
        const len = `<span class="atlas-tl-len" title="${e.n_events} tool-calls, ${Math.round(share * 100)}% of the run"><span class="atlas-tl-lenbar" style="width:${Math.max(8, Math.round(share * 100))}%"></span></span><span class="atlas-tl-lentxt">${e.n_events} calls</span>`;
        return `<div class="atlas-tl-row ${fam && fam.ring === "deep" ? "is-deep" : ""}" data-step="${i}">
            <span class="atlas-tl-idx">${i + 1}</span>
            <span class="atlas-tl-fam" style="background:${fam ? fam.color : '#999'}"></span>
            <span class="atlas-tl-body"><span class="atlas-tl-meta"><span class="atlas-tl-sub">${fam ? fam.label : e.strategy_family}</span>${e.tier === "flag" ? `<span class="atlas-tl-tier">flag</span>` : e.tier === "engineered" ? `<span class="atlas-tl-tier is-eng">engineered</span>` : ""}${score}</span>${summary}${len}${tmpl ? `<span class="atlas-tl-cmd">${tmpl}</span>` : ""}</span>
        </div>`;
    }).join("");
    return `
        <div class="atlas-iblock">
            <div class="atlas-ititle atlas-ititle--row"><span>Run replay</span><button class="atlas-tl-back" type="button">‹ pick another run</button></div>
            <div class="atlas-run-head">
                <span class="atlas-run-dot" style="background:${atlasAgentColor(r.agent)}"></span>
                <div><strong>${r.agent}</strong><span class="atlas-sub"> · scenario ${r.scenario}${r.ablation_kind ? " · " + r.ablation_kind : ""}</span></div>
            </div>
            <dl class="atlas-stat-grid atlas-stat-grid--2">
                <div><dt>Episodes</dt><dd>${r.n_episodes}</dd></div>
                <div><dt>Distinct families</dt><dd>${r.distinct_families}</dd></div>
                <div><dt>Launches</dt><dd>${r.n_launches}</dd></div>
                <div><dt>Distinct configs</dt><dd>${r.metrics.n_distinct_configs}</dd></div>
                <div style="grid-column:1 / -1"><dt>Strategy entropy</dt><dd>${r.metrics.strategy_entropy.toFixed(2)}</dd></div>
            </dl>
            <div class="atlas-isub">Episode timeline <span class="atlas-sub">(click to scrub)</span></div>
            <div class="atlas-timeline">${rows}</div>
        </div>`;
}

function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function setupChangelog() {
    const w = document.getElementById("changelog-widget");
    const pill = document.getElementById("changelog-pill");
    const min = document.getElementById("changelog-min");
    if (!w || !pill || !min) return;
    pill.addEventListener("click", () => w.dataset.open = "true");
    min.addEventListener("click", () => w.dataset.open = "false");
}
setupChangelog();
