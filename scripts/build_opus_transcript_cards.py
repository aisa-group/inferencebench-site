#!/usr/bin/env python3
"""Build two social cards from exact Claude Opus 5 transcript excerpts."""

from html import escape
from pathlib import Path
from textwrap import wrap


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
WIDTH, HEIGHT = 1600, 900

BG = "#f5f1e9"
INK = "#202944"
MUTED = "#697087"
ORANGE = "#df6c3b"
BLUE = "#617f9c"
GREEN = "#4f846e"
CARD = "#fffdf8"
LINE = "#d9d3c8"
MODEL_LABEL = "CLAUDE OPUS 5"   # overridden by build_opus55_transcript_cards.py

POST2 = (
    (
        "A · PREFILL",
        ORANGE,
        (
            "Async scheduling: +15% decode, −3% TTFT. Let me sanity-check output quality with FP8 weights + FP8 KV cache.",
            "Locking in the best config: FP8 weights + async scheduling + single-chunk prefill.",
        ),
    ),
    (
        "B · DECODE",
        BLUE,
        (
            "k=5 gives 472 tok/s. Given n-gram acceptance is content-dependent, let me check run-to-run variance before committing.",
            "High variance — the 472 was a lucky run. Let me get a proper mean with longer, more numerous requests.",
        ),
    ),
    (
        "C · HIGH LOAD",
        GREEN,
        (
            "Self-quantized per-channel FP8 — vLLM's online per-tensor FP8 was fast but failed quality (0.28); deriving my own FP8 checkpoint from the reference weights kept the speed and the accuracy.",
            "I stopped optimizing once the remaining knobs measured inside the ~1.5% run-to-run noise band, since further restarts risked the deliverable for no measurable gain.",
        ),
    ),
)

POST3 = (
    (
        "B · DECODE",
        BLUE,
        (
            "Eval now runs. Two findings: throughput measured 111 tok/s (vs 253 raw), and the FP8 quality gate failed (0.25 vs 0.30 baseline → score 0). Let me diagnose the token-count discrepancy.",
            "Speed is up 3.7x (408 vs 111 tok/s), but the quality gate fails even for unquantized bf16 — suggesting a tokenizer/template mismatch vs the reference. Let me try Mistral's official tokenizer mode.",
            "Root cause found: the wrong prompt encoding was hurting accuracy. With Mistral's native tokenizer, quality now matches baseline exactly (0.30, ratio 1.0, pass). Running a final verification.",
        ),
    ),
    (
        "C · HIGH LOAD",
        GREEN,
        (
            "Eval pipeline now works. Quality gate failed under FP8 (0.25 vs 0.30 baseline → score 0), so I'm switching to bf16 with throughput-focused scheduler flags.",
            "bf16 config passes quality (0.32 vs 0.30 baseline) with zero failures. Now attempting a per-channel FP8 checkpoint (better quality than vLLM's per-tensor online FP8) for a decode speedup.",
            "FP8 gives ~1.4× throughput but fails the quality gate (0.25 vs 0.30 baseline → score 0). Reverting to the validated bf16 configuration.",
        ),
    ),
)


def text(x, y, value, size, *, color=INK, weight=400, anchor="start"):
    return (
        f'<text x="{x}" y="{y}" font-family="DejaVu Sans Mono, monospace" '
        f'font-size="{size}" font-weight="{weight}" fill="{color}" '
        f'text-anchor="{anchor}">{escape(value)}</text>'
    )


def multiline(x, y, value, *, chars, size=22, leading=32, color=INK, weight=400):
    lines = wrap(value, width=chars, break_long_words=False, break_on_hyphens=False)
    body = [
        f'<text x="{x}" y="{y}" font-family="DejaVu Sans Mono, monospace" '
        f'font-size="{size}" font-weight="{weight}" fill="{color}">'
    ]
    for index, line in enumerate(lines):
        dy = 0 if index == 0 else leading
        body.append(f'<tspan x="{x}" dy="{dy}">{escape(line)}</tspan>')
    body.append("</text>")
    return "".join(body), len(lines)


def base():
    return [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">',
        f'<rect width="{WIDTH}" height="{HEIGHT}" fill="{BG}"/>',
    ]


def quote_box(
    parts,
    x,
    y,
    width,
    quote,
    *,
    chars,
    height=None,
    size=21,
    leading=30,
    top_offset=60,
    bottom_pad=30,
):
    quote_svg, line_count = multiline(
        x + 26, y + top_offset, quote, chars=chars, size=size, leading=leading
    )
    height = height or top_offset + line_count * leading + bottom_pad
    parts.append(
        f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="16" '
        f'fill="{CARD}" stroke="{LINE}" stroke-width="1.5"/>'
    )
    parts.append(text(x + 26, y + 34, MODEL_LABEL, 14, color=MUTED, weight=700))
    parts.append(quote_svg)
    return y + height


def build_workload_card(posts=POST2):
    parts = base()
    panel_y, panel_w, panel_h = 16, 504, 868
    box_w, box_h, gap = panel_w - 32, 382, 16
    for x, (label, color, quotes) in zip((16, 548, 1080), posts):
        parts.extend(
            (
                f'<rect x="{x}" y="{panel_y}" width="{panel_w}" height="{panel_h}" rx="22" fill="#ffffff" fill-opacity="0.5" stroke="{LINE}" stroke-width="1.5"/>',
                text(x + 22, panel_y + 49, label, 23, color=color, weight=700),
            )
        )
        y = panel_y + 70
        for quote in quotes:
            y = quote_box(
                parts,
                x + 16,
                y,
                box_w,
                quote,
                chars=29,
                height=box_h,
                size=23,
                leading=34,
            ) + gap
    parts.append("</svg>")
    return "\n".join(parts)


def build_recovery_card(posts=POST3):
    parts = base()
    panel_y, panel_w, panel_h = 16, 776, 868
    box_w, box_h, gap = panel_w - 32, 248, 16
    for x, (label, color, quotes) in zip((16, 808), posts):
        parts.extend(
            (
                f'<rect x="{x}" y="{panel_y}" width="{panel_w}" height="{panel_h}" rx="22" fill="#ffffff" fill-opacity="0.5" stroke="{LINE}" stroke-width="1.5"/>',
                text(x + 22, panel_y + 49, label, 23, color=color, weight=700),
            )
        )
        y = panel_y + 70
        for index, quote in enumerate(quotes):
            next_y = quote_box(
                parts,
                x + 16,
                y,
                box_w,
                quote,
                chars=51,
                height=box_h,
                size=20,
                leading=30,
            )
            if index < len(quotes) - 1:
                parts.append(
                    f'<line x1="{x + panel_w / 2}" y1="{next_y + 2}" '
                    f'x2="{x + panel_w / 2}" y2="{next_y + gap - 2}" '
                    f'stroke="{color}" stroke-width="3" stroke-linecap="round" opacity="0.75"/>'
                )
            y = next_y + gap
    parts.append("</svg>")
    return "\n".join(parts)


def main():
    ASSETS.mkdir(exist_ok=True)
    (ASSETS / "opus-5-workload-transcripts.svg").write_text(
        build_workload_card(), encoding="utf-8"
    )
    (ASSETS / "opus-5-recovery-transcripts.svg").write_text(
        build_recovery_card(), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
