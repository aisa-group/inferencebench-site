#!/usr/bin/env python3
"""Build the social-card release timeline from leaderboard results."""

from datetime import date
from html import escape
from pathlib import Path
import re


OUT = Path(__file__).resolve().parents[1] / "assets/model-release-timeline.svg"
LEADERBOARD = Path(__file__).resolve().parents[1] / "script.js"
WIDTH, HEIGHT = 1600, 900
LEFT, RIGHT, TOP, BOTTOM = 140, 1510, 170, 760
START, END = date(2025, 9, 1), date(2026, 8, 14)

# Dates use first documented public availability from provider release notes.
# Variants share the underlying model's release date.
POINTS = [
    ("Claude Opus 5", "2026-07-24", 8.90),
    ("Claude Fable 5 (Low, strict)", "2026-06-09", 8.74),
    ("Claude Opus 4.7", "2026-04-16", 8.53),
    ("Claude Opus 4.8", "2026-05-28", 7.60),
    ("Claude Fable 5 (strict)", "2026-06-09", 7.52),
    ("GPT-5.6 Sol Ultra", "2026-07-09", 7.34),
    ("Claude Opus 4.8 (xHigh)", "2026-05-28", 7.34),
    ("GLM-5.2 (Max)", "2026-06-16", 7.00),
    ("Grok 4.6 (Grok Build)", "2026-08-12", 6.65),
    ("Claude Sonnet 5", "2026-06-30", 6.43),
    ("Kimi K2.7 Code", "2026-06-12", 6.27),
    ("GPT-5.4 (High)", "2026-03-05", 6.16),
    ("Kimi K3", "2026-07-16", 5.70),
    ("Claude Sonnet 4.6", "2026-02-17", 5.56),
    ("GPT-5.3 Codex (High)", "2026-02-05", 5.49),
    ("GPT-5.5 (xHigh)", "2026-04-23", 5.45),
    ("Gemini 3.1 Pro", "2026-02-19", 4.92),
    ("Kimi K2.6", "2026-04-20", 4.51),
    ("Claude Opus 4.6", "2026-02-05", 4.38),
    ("GPT-5.2", "2025-12-11", 4.28),
    ("GPT-5.5 (High)", "2026-04-23", 4.22),
    ("Gemini 3.5 Flash", "2026-05-19", 4.16),
    ("Claude Opus 4.5", "2025-11-24", 3.76),
    ("Grok 4.5 (Grok Build)", "2026-07-08", 3.70),
    ("GPT-5.1 Codex Max", "2025-11-19", 3.59),
    ("Grok 4.5 (OpenCode)", "2026-07-08", 3.42),
    ("GLM-5", "2026-02-12", 3.22),
    ("Claude Sonnet 4.5", "2025-09-29", 3.18),
    ("Claude Fable 5", "2026-06-09", 3.16),
    ("Claude Haiku 4.5", "2025-10-15", 2.78),
    ("GPT-5.3 Codex (Medium)", "2026-02-05", 2.32),
    ("Claude Opus 4.7 (v2.1.114)", "2026-04-16", 2.25),
    ("Claude Fable 5 (Low)", "2026-06-09", 2.15),
    ("GPT-5.2 Codex", "2025-12-18", 1.98),
]

SITE_NAMES = [
    "Claude Opus 5", "Claude Fable 5 (Low)", "Claude Opus 4.7",
    "Claude Opus 4.8", "Claude Fable 5", "GPT-5.6 Sol (Ultra)",
    "Claude Opus 4.8 (xHigh)", "GLM-5.2 (Max)", "Grok 4.6", "Claude Sonnet 5",
    "Kimi K2.7 Code", "GPT-5.4 (High)", "Kimi K3", "Claude Sonnet 4.6",
    "GPT-5.3 Codex (High)", "GPT-5.5 (xHigh)", "Gemini 3.1 Pro",
    "Kimi K2.6", "Claude Opus 4.6", "GPT-5.2", "GPT-5.5 (High)",
    "Gemini 3.5 Flash", "Claude Opus 4.5", "Grok 4.5", "GPT-5.1 Codex Max", "Grok 4.5",
    "GLM-5", "Claude Sonnet 4.5", "Claude Fable 5", "Claude Haiku 4.5",
    "GPT-5.3 Codex (Medium)", "Claude Opus 4.7", "Claude Fable 5 (Low)",
    "GPT-5.2 Codex",
]

LABELS = {
    "Claude Opus 5": (-230, -54),
    "GPT-5.6 Sol Ultra": (-285, -42),
    "Claude Sonnet 5": (-286, -10),
    "Kimi K2.7 Code": (-265, 42),
    "Kimi K3": (-158, 54),
    "Grok 4.6 (Grok Build)": (-430, 190),
    "Grok 4.5 (Grok Build)": (-300, 84),
    "Grok 4.5 (OpenCode)": (-285, 128),
}


def x_pos(value):
    d = (date.fromisoformat(value) - START).days
    return LEFT + d / (END - START).days * (RIGHT - LEFT)


def y_pos(value):
    return BOTTOM - value / 10 * (BOTTOM - TOP)


def text(x, y, value, size=24, fill="#24282f", weight=400, anchor="start"):
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" '
        f'font-weight="{weight}" text-anchor="{anchor}">{escape(value)}</text>'
    )


def validate_scores():
    rows = re.findall(
        r'\{ rank: (\d+), model: "([^"]+)", scaffold: "[^"]+", value: ([0-9.]+),',
        LEADERBOARD.read_text(),
    )
    expected = [(rank, name, score) for rank, (name, score) in enumerate(
        zip(SITE_NAMES, (point[2] for point in POINTS)), 1
    )]
    actual = [(int(rank), name, float(score)) for rank, name, score in rows]
    if actual != expected:
        raise SystemExit("Figure scores no longer match script.js")


def main():
    validate_scores()
    lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">',
        "<title>InferenceBench model performance by public release date</title>",
        "<desc>Scatter plot of 34 leaderboard configurations. Eight August additions are highlighted and labeled.</desc>",
        '<rect width="1600" height="900" fill="#f5f1e9"/>',
        '<g font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">',
        text(LEFT, 68, "Inference optimization by model release date", 42, "#202944", 720),
    ]

    for value in range(0, 11, 2):
        y = y_pos(value)
        lines.append(f'<line x1="{LEFT}" y1="{y:.1f}" x2="{RIGHT}" y2="{y:.1f}" stroke="#d9d3c9" stroke-width="1"/>')
        lines.append(text(LEFT - 22, y + 7, f"{value}×", 19, "#777870", anchor="end"))

    months = [
        ("Sep ’25", "2025-09-01"), ("Nov", "2025-11-01"),
        ("Jan ’26", "2026-01-01"), ("Mar", "2026-03-01"),
        ("May", "2026-05-01"), ("Jul", "2026-07-01"),
    ]
    for label, value in months:
        x = x_pos(value)
        lines.append(f'<line x1="{x:.1f}" y1="{TOP}" x2="{x:.1f}" y2="{BOTTOM}" stroke="#e4ded5" stroke-width="1"/>')
        lines.append(text(x, BOTTOM + 38, label, 19, "#777870", anchor="middle"))

    lines.append(f'<line x1="{LEFT}" y1="{BOTTOM}" x2="{RIGHT}" y2="{BOTTOM}" stroke="#8b8b84" stroke-width="1.5"/>')
    lines.append(text((LEFT + RIGHT) / 2, 842, "Public model release date", 20, "#5d5f5b", 550, "middle"))

    days = [(date.fromisoformat(released) - START).days for _, released, _ in POINTS]
    scores = [score for _, _, score in POINTS]
    mean_day, mean_score = sum(days) / len(days), sum(scores) / len(scores)
    slope = sum((day - mean_day) * (score - mean_score) for day, score in zip(days, scores)) / sum(
        (day - mean_day) ** 2 for day in days
    )
    first_day, last_day = min(days), max(days)
    first_score = mean_score + slope * (first_day - mean_day)
    last_score = mean_score + slope * (last_day - mean_day)
    first_x = LEFT + first_day / (END - START).days * (RIGHT - LEFT)
    last_x = LEFT + last_day / (END - START).days * (RIGHT - LEFT)
    lines.append(
        f'<line x1="{first_x:.1f}" y1="{y_pos(first_score):.1f}" '
        f'x2="{last_x:.1f}" y2="{y_pos(last_score):.1f}" stroke="#65708d" stroke-width="4" '
        'stroke-opacity="0.42" stroke-dasharray="2 11" stroke-linecap="round"/>'
    )

    for rank, (name, released, score) in enumerate(POINTS, 1):
        x, y = x_pos(released), y_pos(score)
        highlighted = name in LABELS
        fill = "#d65f45" if highlighted else "#a4a39e"
        radius = 9 if highlighted else 6.5
        opacity = 1 if highlighted else 0.72
        lines.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{radius}" fill="{fill}" fill-opacity="{opacity}" stroke="#f5f1e9" stroke-width="2"/>')

    for rank, (name, released, score) in enumerate(POINTS, 1):
        if name not in LABELS:
            continue
        x, y = x_pos(released), y_pos(score)
        dx, dy = LABELS[name]
        lx, ly = x + dx, y + dy
        label = f"#{rank}  {name}  {score:.2f}×"
        width = max(190, len(label) * 10.4 + 24)
        target_x = lx + width if dx < 0 else lx
        target_y = ly - 10
        lines.append(f'<path d="M {x:.1f} {y:.1f} L {target_x:.1f} {target_y:.1f}" stroke="#d65f45" stroke-width="1.5" fill="none"/>')
        lines.append(f'<rect x="{lx:.1f}" y="{ly - 32:.1f}" width="{width:.1f}" height="42" rx="8" fill="#fffdf9" fill-opacity="0.78" stroke="#e3c0b7"/>')
        lines.append(text(lx + 12, ly - 5, label, 17, "#8e3828", 650))

    lines.extend([
        '<circle cx="1136" cy="119" r="7" fill="#a4a39e" fill-opacity="0.72"/>',
        text(1152, 126, "Earlier leaderboard results", 17, "#6f706b"),
        '<circle cx="1365" cy="119" r="9" fill="#d65f45"/>',
        text(1383, 126, "August additions", 17, "#8e3828", 600),
        "</g></svg>",
    ])
    OUT.write_text("\n".join(lines) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
