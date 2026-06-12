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
        shortLabel: "Fable 5 (Low) *†",
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
        label: "GPT-5.5 (xHigh)",
        shortLabel: "GPT-5.5 (xHigh)",
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
        label: "GLM-5",
        shortLabel: "GLM-5",
        value: 3.22,
        sem: 0.85,
        bar: "#2c365a",
        dot: "#2c365a"
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
    { rank: 6, model: "GPT-5.4 (High)", scaffold: "Codex CLI", value: 6.16, sem: 1.16, type: "agent", a: 3.60, b: 6.93, c: 17.78, d: 3.25 },
    { rank: 7, model: "Claude Sonnet 4.6", scaffold: "Claude Code", value: 5.56, sem: 1.62, type: "agent", a: 1.62, b: 8.21, c: 23.87, d: 3.01 },
    { rank: 8, model: "GPT-5.3 Codex (High)", scaffold: "Codex CLI", value: 5.49, sem: 0.54, type: "agent", a: 3.56, b: 3.38, c: 29.00, d: 2.60 },
    { rank: 9, model: "GPT-5.5 (xHigh)", scaffold: "Codex CLI", value: 5.45, sem: 1.25, type: "agent", a: 2.74, b: 6.07, c: 16.94, d: 3.14 },
    { rank: 10, model: "Gemini 3.1 Pro", scaffold: "OpenCode", value: 4.92, sem: 0.81, type: "agent", a: 2.52, b: 3.78, c: 31.24, d: 1.97 },
    { rank: 11, model: "Kimi K2.6", scaffold: "OpenCode", value: 4.51, sem: 0.48, type: "agent", a: 1.99, b: 4.73, c: 29.19, d: 1.51 },
    { rank: 12, model: "Claude Opus 4.6", scaffold: "Claude Code", value: 4.38, sem: 1.25, type: "agent", a: 1.00, b: 4.80, c: 23.85, d: 3.21 },
    { rank: 13, model: "GPT-5.2", scaffold: "Codex CLI", value: 4.28, sem: 1.29, type: "agent", a: 2.26, b: 2.87, c: 20.15, d: 2.57 },
    { rank: 14, model: "GPT-5.5 (High)", scaffold: "Codex CLI", value: 4.22, sem: 1.01, type: "agent", a: 3.06, b: 2.59, c: 19.11, d: 2.08 },
    { rank: 15, model: "Gemini 3.5 Flash", scaffold: "OpenCode", value: 4.16, sem: 0.72, type: "agent", a: 3.70, b: 3.05, c: 17.71, d: 1.50 },
    { rank: 16, model: "Claude Opus 4.5", scaffold: "Claude Code", value: 3.76, sem: 0.89, type: "agent", a: 3.69, b: 2.78, c: 10.03, d: 1.95 },
    { rank: 17, model: "GPT-5.1 Codex Max", scaffold: "Codex CLI", value: 3.59, sem: 1.24, type: "agent", a: 2.57, b: 3.44, c: 10.33, d: 1.82 },
    { rank: 18, model: "GLM-5", scaffold: "OpenCode", value: 3.22, sem: 0.85, type: "agent", a: 2.19, b: 1.00, c: 26.36, d: 1.87 },
    { rank: 19, model: "Claude Sonnet 4.5", scaffold: "Claude Code", value: 3.18, sem: 0.90, type: "agent", a: 2.67, b: 1.71, c: 9.65, d: 2.32 },
    { rank: 20, model: "Claude Fable 5", scaffold: "Claude Code · v2.1.175", value: 3.16, sem: 0.67, type: "agent", a: 3.92, b: 1.00, c: 25.42, d: 1.00, mark: "*", key: "fable-5-regular" },
    { rank: 21, model: "Claude Haiku 4.5", scaffold: "Claude Code", value: 2.78, sem: 0.57, type: "agent", a: 1.00, b: 1.99, c: 9.27, d: 3.24 },
    { rank: 22, model: "GPT-5.3 Codex (Medium)", scaffold: "Codex CLI", value: 2.32, sem: 0.31, type: "agent", a: 2.75, b: 3.73, c: 1.00, d: 2.82 },
    { rank: 23, model: "Claude Opus 4.7", scaffold: "Claude Code · v2.1.114", value: 2.25, sem: 0.32, type: "agent", a: 1.07, b: 1.00, c: 19.02, d: 1.27, key: "opus-4-7-v2114", variant: true },
    { rank: 24, model: "Claude Fable 5 (Low)", scaffold: "Claude Code · v2.1.175", value: 2.15, sem: 0.46, type: "agent", a: 1.00, b: 1.00, c: 21.21, d: 1.00, mark: "*", key: "fable-5-low", variant: true },
    { rank: 25, model: "GPT-5.2 Codex", scaffold: "Codex CLI", value: 1.98, sem: 0.18, type: "agent", a: 3.32, b: 2.48, c: 1.00, d: 1.87 }
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
initTrajectoryExplorer();

// ============================================================================
// Trajectory Explorer
// ============================================================================
//
// Fetches inferencebench-site/data/trajectories.json (built offline by
// scripts/build_trajectory_data.py) and renders a 2D projection of every
// run's search trajectory. State lives in `trajState`; rendering is a pure
// function of (trajData, trajState).
// ============================================================================

const TRAJ_VIEWBOX = 1000;
const TRAJ_CENTER = TRAJ_VIEWBOX / 2;

const TRAJ_OUTCOME_COLOR = {
    vllm:     "#2c365a",   // navy (matches site ink)
    lmdeploy: "#b66f3a",   // warm copper
    sglang:   "#4f6b4a",   // sage green
    failed:   "#a8a397",   // muted grey
};
const TRAJ_OUTCOME_LABEL = {
    vllm:     "vLLM",
    lmdeploy: "LMDeploy",
    sglang:   "SGLang",
    failed:   "Failed / no engine",
};

let trajData = null;
let trajConfigsById = null;
const trajState = {
    scenario:     "all",                 // "all" | "A" | "B" | "C" | "D"
    agents:       null,                  // null = all (Set of strings otherwise)
    outcomes:     new Set(["vllm", "lmdeploy", "sglang", "failed"]),
    projection:   "semantic",            // "semantic" | "umap"
    pathStyle:    "outcome",             // "all" | "outcome" | "agent" | "none"
    showFinal:    true,
    showBestSeen: false,
    selectedRunId: null,
    hoveredRunId:  null,
};

async function initTrajectoryExplorer() {
    const panel = document.getElementById("trajectory-panel");
    if (!panel) return;
    try {
        const res = await fetch("./data/trajectories.json", { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        trajData = await res.json();
        trajConfigsById = Object.fromEntries(trajData.configs.map((c) => [c.id, c]));
    } catch (e) {
        const canvas = document.getElementById("trajectory-canvas");
        if (canvas) {
            canvas.innerHTML = `<div class="trajectory-canvas-error">Could not load trajectory data (${e.message}). The page expects <code>./data/trajectories.json</code> alongside <code>index.html</code>; if running locally, serve via <code>python3 -m http.server</code> rather than opening the file directly.</div>`;
        }
        return;
    }
    renderTrajectoryExplorer();
}

function renderTrajectoryExplorer() {
    if (!trajData) return;
    renderTrajectoryControls();
    renderTrajectoryCanvas();
    renderTrajectoryInspector();
}

function getFilteredRuns() {
    if (!trajData) return [];
    return trajData.runs.filter((r) => {
        if (trajState.scenario !== "all" && r.scenario !== trajState.scenario) return false;
        if (trajState.agents && !trajState.agents.has(r.agent)) return false;
        if (!trajState.outcomes.has(r.outcome)) return false;
        return true;
    });
}

function projectXY(cfg) {
    // Returns canvas-space coordinates (0..TRAJ_VIEWBOX) for a config.
    const xy = trajState.projection === "umap" ? cfg.umap_xy : cfg.semantic_xy;
    return [xy[0] * TRAJ_VIEWBOX, xy[1] * TRAJ_VIEWBOX];
}

// ---------------------------------------------------------------------------
// Canvas / SVG
// ---------------------------------------------------------------------------

function renderTrajectoryCanvas() {
    const target = document.getElementById("trajectory-canvas");
    if (!target) return;

    const runs = getFilteredRuns();
    const involvedConfigIds = new Set();
    runs.forEach((r) => r.path.forEach((a) => involvedConfigIds.add(a.config_id)));
    const configs = trajData.configs.filter((c) => involvedConfigIds.has(c.id));

    // Ring guide (1×, 2×, 3× speedup rings - geometric only, evocative).
    const rings = [0.20, 0.30, 0.40, 0.48].map((r, i) => {
        const px = r * TRAJ_VIEWBOX;
        const label = `${i + 1}×`;
        return `
            <circle class="traj-ring" cx="${TRAJ_CENTER}" cy="${TRAJ_CENTER}" r="${px.toFixed(1)}" />
            <text class="traj-ring-label" x="${TRAJ_CENTER + 4}" y="${TRAJ_CENTER - px + 14}">${label}</text>
        `;
    }).join("");

    // Per-engine lasso blobs - soft hulls drawn from cluster centroid.
    const lassos = renderEngineLassos(configs);

    // Trajectory polylines.
    const edges = runs.map((r) => buildRunEdge(r)).join("");

    // Final-state markers (drawn before nodes so nodes layer on top).
    const finalMarkers = trajState.showFinal ? renderFinalMarkers(runs) : "";
    const bestMarkers = trajState.showBestSeen ? renderBestSeenMarkers(runs) : "";

    // Nodes - radius scales with attempt count but capped so a single
    // hot config (e.g. the failed cluster with hundreds of visits) doesn't
    // dwarf the rest of the canvas.
    const nodes = configs.map((c) => {
        const [x, y] = projectXY(c);
        const r = Math.min(11, Math.max(2.5, Math.sqrt(c.n_attempts) * 0.9));
        const tone = c.engine_group;
        return `<circle class="traj-node traj-node--${tone}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" data-config-id="${c.id}"><title>${c.id} · ${c.engine_group} · ${c.n_final} final · ${c.n_attempts} visits</title></circle>`;
    }).join("");

    // Engine cluster labels (positioned near each centroid).
    const labels = renderEngineClusterLabels(configs);

    // Central Start node.
    const start = `
        <g class="traj-start">
            <circle cx="${TRAJ_CENTER}" cy="${TRAJ_CENTER}" r="34" />
            <text x="${TRAJ_CENTER}" y="${TRAJ_CENTER - 4}" text-anchor="middle">Start</text>
            <text x="${TRAJ_CENTER}" y="${TRAJ_CENTER + 12}" text-anchor="middle" class="traj-start-sub">vanilla server</text>
        </g>
    `;

    target.innerHTML = `
        <svg class="trajectory-svg" viewBox="0 0 ${TRAJ_VIEWBOX} ${TRAJ_VIEWBOX}" role="img" aria-label="Agent trajectory projection">
            <g class="traj-rings">${rings}</g>
            <g class="traj-lassos">${lassos}</g>
            <g class="traj-edges">${edges}</g>
            <g class="traj-markers">${finalMarkers}${bestMarkers}</g>
            <g class="traj-nodes">${nodes}</g>
            ${start}
            <g class="traj-cluster-labels">${labels}</g>
        </svg>
        <div class="trajectory-legend">
            ${Object.entries(TRAJ_OUTCOME_LABEL).map(([k, label]) =>
                `<span class="trajectory-legend-item"><i style="background:${TRAJ_OUTCOME_COLOR[k]}"></i>${label}</span>`).join("")}
            <span class="trajectory-legend-item"><i class="traj-legend-star"></i>Final state</span>
            <span class="trajectory-legend-item"><i class="traj-legend-line"></i>Trajectory</span>
        </div>
    `;

    // Bind interactivity.
    target.querySelectorAll(".traj-edge").forEach((el) => {
        el.addEventListener("mouseenter", onTrajHover);
        el.addEventListener("mouseleave", onTrajLeave);
        el.addEventListener("click", onTrajClick);
    });
    target.querySelectorAll(".traj-node").forEach((el) => {
        el.addEventListener("mouseenter", onTrajNodeHover);
        el.addEventListener("mouseleave", onTrajLeave);
    });
}

function buildRunEdge(r) {
    // Build a polyline path from the Start node out through the run's attempts.
    let d = `M ${TRAJ_CENTER},${TRAJ_CENTER}`;
    for (const att of r.path) {
        const cfg = trajConfigsById[att.config_id];
        if (!cfg) continue;
        const [x, y] = projectXY(cfg);
        d += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
    }
    const style = trajState.pathStyle;
    let color = "#7c8291";
    if (style === "outcome") color = TRAJ_OUTCOME_COLOR[r.outcome] || color;
    else if (style === "agent") color = agentColor(r.agent);
    else if (style === "none") return ""; // skip drawing edges
    const isSelected = trajState.selectedRunId === r.id;
    const isHovered = trajState.hoveredRunId === r.id;
    const opacity = isSelected || isHovered ? 1 : (style === "all" ? 0.06 : 0.12);
    const width = isSelected || isHovered ? 2 : 1;
    return `<path class="traj-edge" d="${d}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" fill="none" data-run-id="${r.id}" />`;
}

function renderFinalMarkers(runs) {
    return runs.map((r) => {
        if (!r.final_config_id) return "";
        const cfg = trajConfigsById[r.final_config_id];
        if (!cfg) return "";
        const [x, y] = projectXY(cfg);
        const color = TRAJ_OUTCOME_COLOR[r.outcome] || "#7c8291";
        return `<polygon class="traj-final-star" points="${starPoints(x, y, 5, 2.2)}" fill="${color}" data-run-id="${r.id}" />`;
    }).join("");
}

function renderBestSeenMarkers(runs) {
    return runs.map((r) => {
        if (!r.best_seen_config_id || r.best_seen_config_id === r.final_config_id) return "";
        const cfg = trajConfigsById[r.best_seen_config_id];
        if (!cfg) return "";
        const [x, y] = projectXY(cfg);
        return `<circle class="traj-best-ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="none" data-run-id="${r.id}" />`;
    }).join("");
}

function starPoints(cx, cy, outerR, innerR, n = 5) {
    const pts = [];
    for (let i = 0; i < 2 * n; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / n - Math.PI / 2;
        pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(" ");
}

function renderEngineLassos(configs) {
    // For each engine group, draw a soft convex blob around its config points.
    const grouped = {};
    configs.forEach((c) => {
        (grouped[c.engine_group] = grouped[c.engine_group] || []).push(c);
    });
    return Object.entries(grouped).map(([group, items]) => {
        if (items.length < 3) return ""; // not enough points to form a hull
        const pts = items.map((c) => projectXY(c));
        const hull = convexHull(pts);
        if (hull.length < 3) return "";
        // Inflate the hull slightly to give the lasso some breathing room.
        const centroid = hull.reduce(([sx, sy], [x, y]) => [sx + x, sy + y], [0, 0])
            .map((v) => v / hull.length);
        const inflate = 40;
        const inflated = hull.map(([x, y]) => {
            const dx = x - centroid[0], dy = y - centroid[1];
            const d = Math.hypot(dx, dy) || 1;
            return [x + (dx / d) * inflate, y + (dy / d) * inflate];
        });
        const d = inflated.map(([x, y], i) =>
            (i === 0 ? "M" : "L") + ` ${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";
        return `<path class="traj-lasso traj-lasso--${group}" d="${d}" fill="${TRAJ_OUTCOME_COLOR[group]}" />`;
    }).join("");
}

function convexHull(points) {
    // Andrew's monotone chain.
    const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (O, A, B) => (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
    const lower = [];
    for (const p of pts) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
        lower.push(p);
    }
    const upper = [];
    for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
        upper.push(p);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
}

function renderEngineClusterLabels(configs) {
    const grouped = {};
    configs.forEach((c) => {
        (grouped[c.engine_group] = grouped[c.engine_group] || []).push(c);
    });
    return Object.entries(grouped).map(([group, items]) => {
        if (items.length === 0) return "";
        const cx = items.reduce((s, c) => s + projectXY(c)[0], 0) / items.length;
        const cy = items.reduce((s, c) => s + projectXY(c)[1], 0) / items.length;
        const nFinal = items.reduce((s, c) => s + c.n_final, 0);
        const label = TRAJ_OUTCOME_LABEL[group];
        return `<text class="traj-cluster-label traj-cluster-label--${group}" x="${cx.toFixed(0)}" y="${(cy - 70).toFixed(0)}" text-anchor="middle"><tspan x="${cx.toFixed(0)}">${label}</tspan><tspan x="${cx.toFixed(0)}" dy="18" class="traj-cluster-sub">${nFinal} final · ${items.length} configs</tspan></text>`;
    }).join("");
}

function agentColor(agent) {
    // Stable colour per agent string via simple hash.
    let h = 0;
    for (let i = 0; i < agent.length; i++) h = ((h * 31) + agent.charCodeAt(i)) | 0;
    const hue = Math.abs(h) % 360;
    return `hsl(${hue}, 38%, 38%)`;
}

// ---------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------

function renderTrajectoryControls() {
    const target = document.getElementById("trajectory-controls");
    if (!target) return;
    const allAgents = Array.from(new Set(trajData.runs.map((r) => r.agent))).sort();
    const agentsActive = trajState.agents;
    const isActiveAgent = (a) => !agentsActive || agentsActive.has(a);

    target.innerHTML = `
        <div class="traj-control-block">
            <div class="traj-control-label">Scenario</div>
            <div class="traj-segmented" data-control="scenario">
                ${["all","A","B","C","D"].map((s) =>
                    `<button type="button" data-value="${s}" class="${trajState.scenario === s ? "is-active" : ""}">${s === "all" ? "All" : s}</button>`).join("")}
            </div>
        </div>

        <div class="traj-control-block">
            <div class="traj-control-label">Outcome</div>
            <div class="traj-checks" data-control="outcome">
                ${Object.keys(TRAJ_OUTCOME_LABEL).map((k) =>
                    `<label class="${trajState.outcomes.has(k) ? "is-on" : ""}"><input type="checkbox" data-value="${k}" ${trajState.outcomes.has(k) ? "checked" : ""}><i style="background:${TRAJ_OUTCOME_COLOR[k]}"></i>${TRAJ_OUTCOME_LABEL[k]}</label>`).join("")}
            </div>
        </div>

        <div class="traj-control-block">
            <div class="traj-control-label">Projection</div>
            <div class="traj-segmented" data-control="projection">
                <button type="button" data-value="semantic" class="${trajState.projection === "semantic" ? "is-active" : ""}">Semantic</button>
                <button type="button" data-value="umap" class="${trajState.projection === "umap" ? "is-active" : ""}">UMAP</button>
            </div>
        </div>

        <div class="traj-control-block">
            <div class="traj-control-label">Path style</div>
            <div class="traj-segmented traj-segmented--small" data-control="pathStyle">
                ${["outcome","agent","all","none"].map((s) =>
                    `<button type="button" data-value="${s}" class="${trajState.pathStyle === s ? "is-active" : ""}">${s === "outcome" ? "By outcome" : s === "agent" ? "By agent" : s === "all" ? "All faint" : "Hide"}</button>`).join("")}
            </div>
        </div>

        <div class="traj-control-block">
            <div class="traj-control-label">Overlays</div>
            <label class="traj-toggle"><input type="checkbox" data-toggle="showFinal" ${trajState.showFinal ? "checked" : ""}> Show final state ★</label>
            <label class="traj-toggle"><input type="checkbox" data-toggle="showBestSeen" ${trajState.showBestSeen ? "checked" : ""}> Show best-seen ○</label>
        </div>

        <div class="traj-control-block">
            <div class="traj-control-label">Agent (${allAgents.filter(isActiveAgent).length}/${allAgents.length})</div>
            <div class="traj-agent-list" data-control="agent">
                <button type="button" class="traj-agent-all" data-value="__all">${agentsActive ? "Select all" : "Clear"}</button>
                ${allAgents.map((a) =>
                    `<label class="traj-agent ${isActiveAgent(a) ? "is-on" : ""}"><input type="checkbox" data-value="${a}" ${isActiveAgent(a) ? "checked" : ""}>${a}</label>`).join("")}
            </div>
        </div>
    `;

    target.querySelectorAll("[data-control='scenario'] button").forEach((b) =>
        b.addEventListener("click", () => { trajState.scenario = b.dataset.value; renderTrajectoryExplorer(); }));
    target.querySelectorAll("[data-control='projection'] button").forEach((b) =>
        b.addEventListener("click", () => { trajState.projection = b.dataset.value; renderTrajectoryExplorer(); }));
    target.querySelectorAll("[data-control='pathStyle'] button").forEach((b) =>
        b.addEventListener("click", () => { trajState.pathStyle = b.dataset.value; renderTrajectoryExplorer(); }));
    target.querySelectorAll("[data-control='outcome'] input").forEach((i) =>
        i.addEventListener("change", () => {
            if (i.checked) trajState.outcomes.add(i.dataset.value);
            else trajState.outcomes.delete(i.dataset.value);
            renderTrajectoryExplorer();
        }));
    target.querySelectorAll("[data-toggle]").forEach((i) =>
        i.addEventListener("change", () => { trajState[i.dataset.toggle] = i.checked; renderTrajectoryExplorer(); }));
    target.querySelectorAll("[data-control='agent'] input").forEach((i) =>
        i.addEventListener("change", () => {
            if (!trajState.agents) trajState.agents = new Set(allAgents);
            if (i.checked) trajState.agents.add(i.dataset.value);
            else trajState.agents.delete(i.dataset.value);
            // If all selected, normalize to null = all.
            if (trajState.agents.size === allAgents.length) trajState.agents = null;
            renderTrajectoryExplorer();
        }));
    const allBtn = target.querySelector(".traj-agent-all");
    if (allBtn) allBtn.addEventListener("click", () => {
        trajState.agents = trajState.agents ? null : new Set();
        renderTrajectoryExplorer();
    });
}

// ---------------------------------------------------------------------------
// Inspector
// ---------------------------------------------------------------------------

function renderTrajectoryInspector() {
    const target = document.getElementById("trajectory-inspector");
    if (!target) return;

    const runs = getFilteredRuns();
    const stats = computeStats(runs);
    const sel = trajState.selectedRunId ? trajData.runs.find((r) => r.id === trajState.selectedRunId) : null;

    const glance = `
        <div class="traj-inspector-block">
            <div class="traj-inspector-title">At a glance</div>
            <dl class="traj-stat-grid">
                <div><dt>Filtered runs</dt><dd>${runs.length} <span class="traj-stat-sub">of ${trajData.runs.length}</span></dd></div>
                <div><dt>Top fingerprint share</dt><dd>${(stats.topShare * 100).toFixed(0)}% <span class="traj-stat-sub">${stats.topCount}/${runs.length}</span></dd></div>
                <div><dt>Median path length</dt><dd>${stats.medPath}</dd></div>
                <div><dt>Best-seen ≠ final</dt><dd>${(stats.bestNeqFinal * 100).toFixed(0)}%</dd></div>
                <div><dt>Distinct fingerprints</dt><dd>${stats.distinctFps}</dd></div>
            </dl>
        </div>
    `;

    const selBlock = sel ? renderSelectedRun(sel) : `
        <div class="traj-inspector-block">
            <div class="traj-inspector-title">Selected run</div>
            <p class="traj-inspector-empty">Hover or click any trajectory to inspect a single run.</p>
        </div>
    `;

    target.innerHTML = glance + selBlock;
}

function renderSelectedRun(r) {
    const finalCfg = trajConfigsById[r.final_config_id];
    const bestCfg = trajConfigsById[r.best_seen_config_id];
    const fp = finalCfg ? finalCfg.fingerprint : null;
    const fpRow = (label, val) => `<div><dt>${label}</dt><dd>${val ?? "-"}</dd></div>`;
    const fpBlock = fp ? `
        <dl class="traj-stat-grid traj-stat-grid--two">
            ${fpRow("Engine", fp[0])}
            ${fpRow("Quant", fp[1])}
            ${fpRow("TP", fp[2])}
            ${fpRow("Batch", fp[3])}
            ${fpRow("Max-model-len", fp[4])}
            ${fpRow("KV dtype", fp[5])}
            ${fpRow("Spec decode", fp[6])}
            ${fpRow("Attn backend", fp[7])}
        </dl>
        ${fp[8] && fp[8].length ? `<div class="traj-flags">${fp[8].map((f) => `<span>${f}</span>`).join("")}</div>` : ""}
    ` : `<p class="traj-inspector-empty">No final config recorded.</p>`;

    const lastScores = r.path.slice(-6).map((a) => {
        const score = a.score == null ? "-" : a.score.toFixed(1);
        return `<span class="traj-attempt ${a.launched_ok ? "traj-attempt--ok" : "traj-attempt--noop"}">${a.label || "·"} <strong>${score}</strong></span>`;
    }).join("");

    return `
        <div class="traj-inspector-block">
            <div class="traj-inspector-title">Selected run</div>
            <div class="traj-run-header">
                <span class="traj-run-outcome" style="background:${TRAJ_OUTCOME_COLOR[r.outcome]}"></span>
                <div>
                    <strong>${r.agent}</strong>
                    <span class="traj-stat-sub">Scenario ${r.scenario} · seed ${r.seed}</span>
                </div>
            </div>
            <dl class="traj-stat-grid">
                <div><dt>Outcome</dt><dd>${TRAJ_OUTCOME_LABEL[r.outcome]}</dd></div>
                <div><dt>Path length</dt><dd>${r.path.length}</dd></div>
                <div><dt>Distinct configs</dt><dd>${new Set(r.path.map((a) => a.config_id)).size}</dd></div>
                <div><dt>Edits total</dt><dd>${r.n_edits_total}</dd></div>
            </dl>
            <div class="traj-inspector-subtitle">Final fingerprint</div>
            ${fpBlock}
            ${bestCfg && r.best_seen_config_id !== r.final_config_id ? `<div class="traj-inspector-subtitle">Best-seen ≠ final</div><p class="traj-inspector-note">The agent's best-scoring attempt was at <code>${r.best_seen_config_id}</code> but the final submitted server was at <code>${r.final_config_id}</code>.</p>` : ""}
            <div class="traj-inspector-subtitle">Last attempts</div>
            <div class="traj-attempts">${lastScores}</div>
        </div>
    `;
}

function computeStats(runs) {
    const fpCounts = {};
    runs.forEach((r) => { fpCounts[r.final_config_id] = (fpCounts[r.final_config_id] || 0) + 1; });
    const sortedCounts = Object.values(fpCounts).sort((a, b) => b - a);
    const topCount = sortedCounts[0] || 0;
    const topShare = runs.length ? topCount / runs.length : 0;
    const pathLens = runs.map((r) => r.path.length).sort((a, b) => a - b);
    const medPath = pathLens.length ? pathLens[Math.floor(pathLens.length / 2)] : 0;
    const bestNeq = runs.filter((r) => r.best_seen_config_id && r.best_seen_config_id !== r.final_config_id).length;
    return {
        topCount,
        topShare,
        medPath,
        bestNeqFinal: runs.length ? bestNeq / runs.length : 0,
        distinctFps: Object.keys(fpCounts).length,
    };
}

// ---------------------------------------------------------------------------
// Hover + click handlers
// ---------------------------------------------------------------------------

function onTrajHover(ev) {
    const id = ev.currentTarget.dataset.runId;
    trajState.hoveredRunId = id;
    rerenderEdgesOnly();
    showRunTooltip(ev, id);
}

function onTrajNodeHover(ev) {
    const id = ev.currentTarget.dataset.configId;
    const cfg = trajConfigsById[id];
    if (!cfg) return;
    showConfigTooltip(ev, cfg);
}

function onTrajLeave() {
    trajState.hoveredRunId = null;
    hideTrajTooltip();
    rerenderEdgesOnly();
}

function onTrajClick(ev) {
    const id = ev.currentTarget.dataset.runId;
    trajState.selectedRunId = (trajState.selectedRunId === id) ? null : id;
    renderTrajectoryExplorer();
}

function rerenderEdgesOnly() {
    // Cheap hover update - re-stroke all edges according to current state.
    const runs = getFilteredRuns();
    document.querySelectorAll(".traj-edges .traj-edge").forEach((el, i) => {
        const r = runs[i];
        if (!r) return;
        const isSel = trajState.selectedRunId === r.id;
        const isHov = trajState.hoveredRunId === r.id;
        const baseOp = trajState.pathStyle === "all" ? 0.06 : 0.12;
        const dim = trajState.hoveredRunId && !isHov && !isSel ? 0.04 : null;
        el.setAttribute("stroke-opacity", isSel || isHov ? 1 : (dim != null ? dim : baseOp));
        el.setAttribute("stroke-width", isSel || isHov ? 2 : 1);
    });
}

function showRunTooltip(ev, runId) {
    const r = trajData.runs.find((x) => x.id === runId);
    if (!r) return;
    const tt = ensureTrajTooltip();
    tt.innerHTML = `<strong>${r.agent}</strong><br>Scenario ${r.scenario} · ${TRAJ_OUTCOME_LABEL[r.outcome]}<br>${r.path.length} attempts`;
    positionTooltip(tt, ev);
}

function showConfigTooltip(ev, cfg) {
    const tt = ensureTrajTooltip();
    const fp = cfg.fingerprint;
    tt.innerHTML = `<strong>${cfg.id}</strong> · ${fp[0]} ${fp[1] !== "none" ? "/" + fp[1] : ""}<br>tp=${fp[2]} bs=${fp[3]} mml=${fp[4]}<br>${cfg.n_final} final · ${cfg.n_attempts} visits`;
    positionTooltip(tt, ev);
}

function ensureTrajTooltip() {
    let tt = document.getElementById("traj-tooltip");
    if (!tt) {
        tt = document.createElement("div");
        tt.id = "traj-tooltip";
        tt.className = "traj-tooltip";
        document.body.appendChild(tt);
    }
    tt.style.display = "block";
    return tt;
}

function positionTooltip(tt, ev) {
    const offset = 14;
    tt.style.left = (ev.clientX + offset) + "px";
    tt.style.top = (ev.clientY + offset) + "px";
}

function hideTrajTooltip() {
    const tt = document.getElementById("traj-tooltip");
    if (tt) tt.style.display = "none";
}

function setupChangelog() {
    const w = document.getElementById("changelog-widget");
    const pill = document.getElementById("changelog-pill");
    const min = document.getElementById("changelog-min");
    if (!w || !pill || !min) return;
    pill.addEventListener("click", () => w.dataset.open = "true");
    min.addEventListener("click", () => w.dataset.open = "false");
}
setupChangelog();
