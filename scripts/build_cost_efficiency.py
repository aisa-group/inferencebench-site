#!/usr/bin/env python3
"""Build the API-equivalent 12-run cost data used by the leaderboard."""

import hashlib
import json
import re
from pathlib import Path
from statistics import mean


RESULTS = Path("/fast/jyeon/ptb_results")
OUTPUT = Path(__file__).resolve().parents[1] / "data/cost-efficiency.json"

# USD per million standard input, cached input, output, and cache-write tokens,
# plus whether the model has a documented long-context tier (>272K prompt:
# 2x input and cached, 1.5x output). Only GPT-5.6+ bills cache writes.
CODEX_RATES = {
    "gpt-6-astra-ultra": (10.0, 1.0, 50.0, 12.5, True),
    "gpt-6-sol-ultra": (2.0, .2, 10.0, 2.5, True),
    "gpt-5-6-sol-ultra": (4.0, .4, 20.0, 5.0, True),
    "gpt-5-5-xhigh": (5.0, .5, 30.0, 0.0, True),
    "gpt-5-5-high": (5.0, .5, 30.0, 0.0, True),
    "gpt-5-4-high": (2.5, .25, 15.0, 0.0, True),
    "gpt-5-3-codex-high": (1.75, .175, 14.0, 0.0, False),
    "gpt-5-3-codex-medium": (1.75, .175, 14.0, 0.0, False),
    "gpt-5-2": (1.75, .175, 14.0, 0.0, False),
    "gpt-5-2-codex": (1.75, .175, 14.0, 0.0, False),
    "gpt-5-1-codex-max": (1.25, .125, 10.0, 0.0, False),
}

CODEX_CPT = 4.0  # chars per token for transcript text
CODEX_LONG_TOKENS = 272_000  # documented long-context threshold

# Effective context ceiling in tokens before Codex compacts, calibrated from
# observed "context compacted" event spacing per model family.
def codex_cap_tokens(key):
    if key.startswith("gpt-6-sol"):
        # Same calibration as Astra below: median spacing between real
        # "context compacted" events across all 12 gpt-6-sol-ultra transcripts
        # is ~872K tokens (15 intervals, 456K-2.2M range).
        return 870_000
    if key.startswith("gpt-6"):
        # Despite Astra's documented 1.05M-token window, Codex CLI compacts
        # well before that: median spacing between real "context compacted"
        # events across all 12 gpt-6-astra-ultra transcripts is ~204K tokens
        # (16 intervals, 61K-495K range).
        return 200_000
    if "5-3" in key:
        return 272_000  # documented max input
    if key.startswith(("gpt-5-4", "gpt-5-5", "gpt-5-6")):
        return 375_000
    return 350_000  # 400K-window models

# USD per million uncached input, cache read, output, 5-minute cache write,
# and 1-hour cache write tokens. Claude Code's recorded dollar totals use
# stale model mappings, so the builder applies the current official rates.
CLAUDE_RATES = {
    "fable": (10.0, 1.0, 50.0, 12.5, 20.0),
    "fable-5.1": (10.0, .25, 50.0, 12.5, 20.0),
    "opus-5.5": (4.0, .2, 20.0, 5.0, 8.0),
    "opus": (5.0, .5, 25.0, 6.25, 10.0),
    "sonnet-5": (2.0, .2, 10.0, 2.5, 4.0),
    "sonnet-4": (3.0, .3, 15.0, 3.75, 6.0),
    "haiku": (1.0, .1, 5.0, 1.25, 2.0),
    "glm-5.2": (1.4, .26, 4.4, 1.4, 1.4),
    "glm-5.3": (1.4, .26, 4.4, 1.4, 1.4),
}


def config(key, root, *, ids=None, family=None, extra_runs=()):
    return {
        "key": key,
        "root": RESULTS / root,
        "ids": set(ids or []),
        "family": family or root.split("_", 1)[0],
        "extra_runs": [RESULTS / path for path in extra_runs],
    }


CONFIGS = [
    # Pinned: this directory was rescored twice while the 2h run was still
    # finalizing (a gate result settling, then a failed seed replaced by a
    # rerun) — see COMMANDS.txt 2026-09-04. Lock to the confirmed-final 12.
    config("fable-5-1", "claude_non_api_claude-fable-5-1_2h", ids=[17504745, 17504746, 17504747, 17506658, 17506659, 17508182, 17508183, 17508184, 17508672, 17508673, 17508674, 17512336]),
    config("fable-5-1-max", "claude_non_api_claude-fable-5-1-max_2h", ids=[17512339,17522268,17522269,17523232,17523233,17523902,17524727,17524728,17524729,17531611,17531612,17531613]),
    config("opus-5", "claude_non_api_claude-opus-5_2h"),
    config("fable-5-low-strict", "claude_non_api_claude-fable-5-low_2h", ids=[17334384, 17334386, 17334388, 17334385, 17334387, 17334389, 17334378, 17334380, 17334382, 17334379, 17334381, 17334383]),
    config("opus-4-7", "claude_non_api_claude-opus-4-7_2h"),
    config("opus-4-8", "claude_non_api_claude-opus-4-8_2h"),
    config("fable-5-strict", "claude_non_api_claude-fable-5_2h", ids=[17335746, 17335747, 17335748, 17335749, 17335751, 17335753, 17335750, 17335752, 17335754, 17335755, 17335756, 17335757]),
    config("gpt-6-astra-ultra", "codex_non_api_gpt-6-astra-ultra_2h"),
    config("gpt-6-sol-ultra", "codex_non_api_gpt-6-sol-ultra_2h"),
    config("opus-5-5-max", "claude_non_api_claude-opus-5-5-max_2h"),
    config("gpt-5-6-sol-ultra", "codex_non_api_gpt-5.6-sol-ultra_2h"),
    config("opus-4-8-xhigh", "claude_non_api_claude-opus-4-8-xhigh_2h"),
    config("glm-5-2-max", "claude_zai_glm-5.2[1m]_2h", family="claude"),
    config("grok-4-6-build", "grok_build_grok-4.6_2h_grok_build", family="grok-4.6"),
    config("sonnet-5", "claude_non_api_claude-sonnet-5_2h"),
    config("kimi-k2-7-code", "opencode_opencode_kimi-k2.7-code_2h"),
    config("gpt-5-4-high", "codex_non_api_gpt-5.4-high_2h",
           ids=[17076897, 17076899, 17076901, 17078827, 17078833, 17078855, 17079017, 17079018, 17079019, 17093784, 17120863, 17120864],
           extra_runs=["codex_non_api_gpt-5.4-high_2h_extra_seeds/inference_scenario_b_output_heavy_mistralai_Mistral-7B-Instruct-v0.3_17093784"]),
    config("kimi-k3", "opencode_opencode_kimi-k3_2h"),
    config("sonnet-4-6", "claude_non_api_claude-sonnet-4-6_2h"),
    config("gpt-5-3-codex-high", "codex_non_api_gpt-5.3-codex-high_2h", ids=[17076097, 17076103, 17076114, 17078592, 17078596, 17078825, 17078828, 17078843, 17078853, 17079277, 17120857, 17120858]),
    config("gpt-5-5-xhigh", "codex_non_api_gpt-5.5-xhigh_2h"),
    config("glm-5-3-max", "claude_zai_glm-5.3[1m]_2h", family="claude"),
    config("gemini-3-1-pro", "opencode_opencode_gemini-3.1-pro_2h"),
    config("muse-spark-1-3", "opencode_opencode_muse-spark-1.3-contributor-free_2h"),
    config("kimi-k2-6", "opencode_opencode_kimi-k2.6_2h"),
    config("opus-4-6", "claude_non_api_claude-opus-4-6_2h"),
    config("gpt-5-2", "codex_non_api_gpt-5.2_2h", ids=[17061039, 17066082, 17070473, 17070477, 17076095, 17076107, 17078526, 17078529, 17078532, 17078776, 17078780, 17120855]),
    config("gpt-5-5-high", "codex_non_api_gpt-5.5-high_2h"),
    config("gemini-3-5-flash", "opencode_opencode_gemini-3.5-flash_2h"),
    config("opus-4-5", "claude_non_api_claude-opus-4-5_2h"),
    config("grok-4-5-build", "grok_build_grok-4.5_2h_grok_build", family="grok-4.5"),
    config("gpt-5-1-codex-max", "codex_non_api_gpt-5.1-codex-max_2h"),
    config("grok-4-5-opencode", "opencode_opencode_grok-4.5_2h"),
    config("ox-alpha", "openrouter_stealth_ox-alpha_2h", ids=[17473053, 17473054, 17473055, 17473056, 17473058, 17473059, 17473060, 17473061, 17473062, 17473063, 17473064, 17473065], family="opencode"),
    config("glm-5", "opencode_opencode_glm-5_2h"),
    config("sonnet-4-5", "claude_non_api_claude-sonnet-4-5_2h"),
    config("fable-5-regular", "claude_non_api_claude-fable-5_2h", ids=[17330896, 17330897, 17330898, 17330899, 17330900, 17330901, 17331053, 17331054, 17331055, 17331078, 17331079, 17331080]),
    config("haiku-4-5", "claude_non_api_claude-haiku-4-5_2h"),
    config("gpt-5-3-codex-medium", "codex_non_api_gpt-5.3-codex-med_2h"),
    config("opus-4-7-v2114", "claude_non_api_claude-opus-4-7_2hstructured_iteration"),
    config("fable-5-low-regular", "claude_non_api_claude-fable-5-low_2h", ids=[17334075, 17334076, 17334077, 17334081, 17334082, 17334083, 17334084, 17334085, 17334086, 17334087, 17334088, 17334089]),
    config("gpt-5-2-codex", "codex_non_api_gpt-5.2-codex_2h"),
]

def run_id(path):
    return int(path.name.rsplit("_", 1)[-1])


def selected_runs(item):
    runs = [path for path in item["root"].iterdir() if path.is_dir()]
    runs.extend(path for path in item["extra_runs"] if path.is_dir())
    if item["ids"]:
        runs = [path for path in runs if run_id(path) in item["ids"]]
    return sorted(runs, key=run_id)


def scenario(path):
    match = re.search(r"inference_scenario_([a-d])_", path.name)
    return match.group(1).upper() if match else None


def json_lines(path):
    if not path.exists():
        return
    with path.open(errors="replace") as handle:
        for line in handle:
            try:
                event = json.loads(line)
                if isinstance(event, dict):
                    yield event
            except json.JSONDecodeError:
                continue


def claude_rates(model):
    if "fable-5-1" in model:
        return CLAUDE_RATES["fable-5.1"]
    if "fable" in model:
        return CLAUDE_RATES["fable"]
    if "opus-5-5" in model:
        return CLAUDE_RATES["opus-5.5"]
    if "opus" in model:
        return CLAUDE_RATES["opus"]
    if "sonnet-5" in model:
        return CLAUDE_RATES["sonnet-5"]
    if "sonnet-4" in model:
        return CLAUDE_RATES["sonnet-4"]
    if "haiku" in model:
        return CLAUDE_RATES["haiku"]
    if "glm-5.2" in model:
        return CLAUDE_RATES["glm-5.2"]
    if "glm-5.3" in model:
        return CLAUDE_RATES["glm-5.3"]
    raise ValueError(f"No price for Claude Code model {model}")


def token_counts(usage):
    return {
        "input": usage.get("inputTokens", usage.get("input_tokens", 0)) or 0,
        "cache_read": usage.get("cacheReadInputTokens", usage.get("cache_read_input_tokens", 0)) or 0,
        "cache_create": usage.get("cacheCreationInputTokens", usage.get("cache_creation_input_tokens", 0)) or 0,
        "output": usage.get("outputTokens", usage.get("output_tokens", 0)) or 0,
    }


def price_claude_usage(model, counts, cache_creation=None):
    input_rate, cache_rate, output_rate, write_5m_rate, write_1h_rate = claude_rates(model)
    cache_creation = cache_creation or {}
    five_minute = min(counts["cache_create"], cache_creation.get("ephemeral_5m_input_tokens", 0) or 0)
    one_hour = min(
        counts["cache_create"] - five_minute,
        cache_creation.get("ephemeral_1h_input_tokens", 0) or 0,
    )
    # Claude Code uses one-hour prompt caching. Treat any unsplit cache-write
    # tokens as one-hour writes instead of silently pricing them as input.
    one_hour += counts["cache_create"] - five_minute - one_hour
    return (
        counts["input"] * input_rate
        + counts["cache_read"] * cache_rate
        + counts["output"] * output_rate
        + five_minute * write_5m_rate
        + one_hour * write_1h_rate
    ) / 1_000_000


def claude_cost(path):
    records = []
    seen = set()
    input_fields = ("input", "cache_read", "cache_create")
    spans, message_history = {}, set()
    uncertain, initialized, child_sessions = set(), set(), set()
    for transcript in sorted(path.glob("solve_out_run*.txt")):
        for number, event in enumerate(json_lines(transcript)):
            session = event.get("session_id") or event.get("uuid")
            if event.get("type") == "system" and event.get("subtype") == "init":
                initialized.add(session)
            message = event.get("message", {})
            if event.get("type") == "assistant" and isinstance(message.get("usage"), dict):
                if event.get("parent_tool_use_id"):
                    child_sessions.add(session)
                    continue
                key = (session, message.get("model"))
                identity = message.get("id", event.get("uuid", (transcript, number)))
                counts = token_counts(message["usage"])
                vector = tuple(counts[field] for field in input_fields)
                span = spans.setdefault(key, {})
                if ((identity in span and span[identity] != vector)
                        or (identity not in span and (key, identity) in message_history)):
                    uncertain.add(key)
                if any(part.get("type") == "tool_use" and part.get("name", "").lower() in ("task", "agent")
                       for part in message.get("content", []) if isinstance(part, dict)):
                    uncertain.add(key)
                span[identity] = vector
                message_history.add((key, identity))
            if event.get("type") != "result" or not isinstance(event.get("modelUsage"), dict):
                continue
            record_id = event.get("uuid") or f"{transcript}:{len(records)}"
            if record_id in seen:
                continue
            seen.add(record_id)
            independent = set()
            primary_models = [model for model in event["modelUsage"] if "haiku" not in model]
            for model, usage in event["modelUsage"].items():
                if not isinstance(usage, dict):
                    continue
                key = (session, model)
                counts = token_counts(usage)
                span_input = tuple(sum(vector[i] for vector in spans.get(key, {}).values())
                                   for i in range(len(input_fields)))
                # A new invocation can exceed every previous counter. Accept
                # it as independent only when root messages and result usage
                # agree, with no replay, changing chunks, or subagent usage.
                if (session in initialized and session not in child_sessions
                        and key not in uncertain and primary_models == [model]
                        and not (event.get("subagent_stats", {}).get("spawned") or 0)
                        and token_counts(event.get("usage", {})) == counts
                        and span_input == tuple(counts[field] for field in input_fields)):
                    independent.add(model)
                if any(counts.values()):
                    spans.pop(key, None)
                    uncertain.discard(key)
            records.append((event, independent))
            initialized.discard(session)
            child_sessions.discard(session)

    if records:
        # Result records are cumulative while a session grows and reset when a
        # harness loop starts a fresh turn. Charge the full result on a reset
        # proven by messages, or when any counter drops; otherwise use deltas.
        previous = {}
        previous_split = {}
        cost = 0.0
        for event, independent in records:
            session = event.get("session_id") or event.get("uuid")
            # The 5-minute/1-hour write split is event-level and follows the
            # same cumulative-or-reset pattern as the token counters.
            split = event.get("usage", {}).get("cache_creation", {}) or {}
            current_split = {
                "ephemeral_5m_input_tokens": split.get("ephemeral_5m_input_tokens", 0) or 0,
                "ephemeral_1h_input_tokens": split.get("ephemeral_1h_input_tokens", 0) or 0,
            }
            prior_split = previous_split.get(session)
            if prior_split and all(current_split[f] >= prior_split[f] for f in current_split):
                cache_creation = {f: current_split[f] - prior_split[f] for f in current_split}
            else:
                cache_creation = current_split
            previous_split[session] = current_split
            for model, usage in event["modelUsage"].items():
                if not isinstance(usage, dict):
                    continue
                counts = token_counts(usage)
                key = (session, model)
                prior = previous.get(key)
                creation = cache_creation if "haiku" not in model else None
                if prior and all(counts[field] >= prior[field] for field in counts):
                    billed = {field: counts[field] - prior[field] for field in counts}
                    if model in independent and any(prior[field] for field in input_fields):
                        billed = counts
                        creation = current_split
                else:
                    billed = counts
                cost += price_claude_usage(model, billed, creation)
                previous[key] = counts
        return cost, "official-token", cost, cost

    # Some interrupted Claude Code runs have message-level token records but
    # no final result. Deduplicate messages and price the recorded tokens.
    messages = {}
    for transcript in sorted(path.glob("solve_out_run*.txt")):
        for event in json_lines(transcript):
            message = event.get("message", {})
            if event.get("type") == "assistant" and isinstance(message.get("usage"), dict):
                messages[message.get("id", event.get("uuid", f"{transcript}:{len(messages)}"))] = message
    counts = [token_counts(message["usage"]) for message in messages.values()]
    cost = sum(
        price_claude_usage(message.get("model", ""), usage, message["usage"].get("cache_creation"))
        for message, usage in zip(messages.values(), counts)
    )
    has_tokens = any(any(usage.values()) for usage in counts)
    if has_tokens:
        return cost, "official-message-token", cost, cost
    return None, "no-reported-token", None, None


def run_minutes(path):
    try:
        parts = (path / "time_taken.txt").read_text().split()[0].split(":")
        hours, minutes, seconds = (int(part) for part in parts)
        return hours * 60 + minutes + seconds / 60
    except (OSError, ValueError, IndexError):
        return None


def xai_cost(fresh, cached, created, output, model, cached_in_threshold=True):
    # xAI's docs do not say whether cached tokens count toward the 200K prompt
    # threshold; the natural reading (yes) is the central value, the fresh-only
    # reading is the low bound.
    prompt = fresh + created + (cached if cached_in_threshold else 0)
    long_context = prompt >= 200_000
    if model == "grok-4.6":
        input_rate, cache_rate, output_rate = (4, 1, 12) if long_context else (2, .5, 6)
    else:
        input_rate, cache_rate, output_rate = (4, .6, 12) if long_context else (2, .3, 6)
    return ((fresh + created) * input_rate + cached * cache_rate + output * output_rate) / 1_000_000


# USD per million input, cached-input, and output tokens for OpenCode runs whose
# recorded per-step dollars are unusable (the OpenRouter stealth period billed
# $0). Reasoning tokens bill as output; cache writes bill as input.
OPENCODE_TOKEN_RATES = {
    "ox-alpha": (0.15, 0.03, 0.50),  # GLM-5.3 Flash list price
    "muse-spark-1-3": (1.25, 0.15, 4.25),  # Muse Spark 1.3 Standard tier list price (the run used the free Contributor tier)
}


def opencode_cost(path, item):
    costs, lows = [], []
    token_rates = OPENCODE_TOKEN_RATES.get(item["key"])
    for transcript in sorted(path.glob("solve_out_run*.txt")):
        for event in json_lines(transcript):
            if event.get("type") == "step_finish":
                part = event.get("part", {})
                tokens = part.get("tokens", {})
                if token_rates and tokens:
                    input_rate, cache_rate, output_rate = token_rates
                    cache = tokens.get("cache", {})
                    usd = ((tokens.get("input", 0) + cache.get("write", 0)) * input_rate
                           + cache.get("read", 0) * cache_rate
                           + (tokens.get("output", 0) + tokens.get("reasoning", 0)) * output_rate) / 1_000_000
                    costs.append(usd)
                    lows.append(usd)
                elif item["key"] == "grok-4-5-opencode" and tokens:
                    cache = tokens.get("cache", {})
                    args = (tokens.get("input", 0), cache.get("read", 0), cache.get("write", 0),
                            tokens.get("output", 0) + tokens.get("reasoning", 0), "grok-4.5")
                    costs.append(xai_cost(*args))
                    lows.append(xai_cost(*args, cached_in_threshold=False))
                elif part.get("cost") is not None:
                    costs.append(part["cost"])
                    lows.append(part["cost"])
    if not costs:
        return None, "no-reported-token", None, None
    method = "official-token" if (token_rates or item["key"] == "grok-4-5-opencode") else "recorded"
    return sum(costs), method, sum(lows), sum(costs)


# Grok Build ran without context compaction: prompts grew to 265-424K tokens,
# pushing about half of all requests past xAI's 200K threshold where every rate
# doubles. The ledger reports a context-normalized cost: the same request
# stream with cached context capped at a Claude-style compaction ceiling, all
# at sub-200K rates. The actual reconciled bill is kept as the high bound.
GROK_CONTEXT_CAP = 165_000


def grok_cost(path, model):
    actual = capped = 0.0
    found = False
    input_rate, output_rate = 2, 6
    cache_rate = .5 if model == "grok-4.6" else .3
    for transcript in sorted(path.glob("solve_out_run*.txt")):
        for event in json_lines(transcript):
            if event.get("type") != "usage":
                continue
            usage = event.get("usage", {})
            fresh = usage.get("input_tokens", 0)
            cached = usage.get("cache_read_input_tokens", 0)
            created = usage.get("cache_creation_input_tokens", 0)
            # xAI reports reasoning as a subset of output tokens.
            output = usage.get("output_tokens", 0)
            actual += xai_cost(fresh, cached, created, output, model)
            trimmed = min(cached, max(0, GROK_CONTEXT_CAP - fresh))
            capped += ((fresh + created) * input_rate + trimmed * cache_rate
                       + output * output_rate) / 1_000_000
            found = True
    if not found:
        return None, "no-reported-token", None, None
    return capped, "context-capped-token", capped, actual


CODEX_OUTPUT_MARKERS = {"thinking", "codex", "Plan update", "file update", "apply patch"}
SESSION_PATTERN = re.compile(r"^session id:\s*([0-9a-f-]+)", re.I)


def codex_parse(path, cap_chars):
    """Stream a run's transcripts into billing aggregates.

    Codex's "tokens used" counter excludes cache reads, so the transcript text
    is classified into model input (tool results, prompts) and model output
    (thinking, messages, commands, patches), and the per-request context sizes
    are integrated for the cache-read volume. Validated against Claude runs
    where actual per-request context is recorded (actual/predicted 0.98-1.29).
    """
    agg = {"in": 0, "vis": 0, "sum_ctx": 0.0, "sum_ctx_long": 0.0,
           "nexec": 0, "nuser": 0, "nlong": 0, "counters": 0, "total": 0}
    long_chars = CODEX_LONG_TOKENS * CODEX_CPT
    ctx = 0.0
    smax = 0
    sessions = set()
    state = "noise"
    expect_counter = expect_cmd = False

    def add_ctx(chars):
        nonlocal ctx
        ctx += chars
        if ctx > cap_chars:
            ctx = cap_chars * 0.10  # compaction keeps a summary

    def request(kind):
        agg[kind] += 1
        if ctx >= long_chars:
            agg["nlong"] += 1
            agg["sum_ctx_long"] += ctx
        agg["sum_ctx"] += ctx

    for transcript in sorted(path.glob("solve_out_run*.txt")):
        with transcript.open(errors="replace") as handle:
            for raw in handle:
                line = raw.rstrip("\n")
                if expect_counter:
                    stripped = line.strip()
                    if stripped and all(c in "0123456789," for c in stripped):
                        smax = max(smax, int(stripped.replace(",", "") or "0"))
                        agg["counters"] += 1
                        expect_counter = False
                        continue
                    if not stripped:
                        continue
                    expect_counter = False
                match = SESSION_PATTERN.match(line)
                if match:
                    if match.group(1) not in sessions:
                        sessions.add(match.group(1))
                        if len(sessions) > 1:  # crash restart: new conversation
                            agg["total"] += smax
                            smax = 0
                            ctx = 0.0
                    state = "noise"
                    continue
                if line == "tokens used":
                    expect_counter = True
                    continue
                if line == "context compacted":
                    ctx *= 0.10
                    continue
                if line == "user":
                    request("nuser")
                    state = "in"
                    continue
                if line == "exec":
                    request("nexec")
                    state = "skip"
                    expect_cmd = True
                    continue
                if line in CODEX_OUTPUT_MARKERS:
                    state = "out"
                    continue
                if line.startswith(("[agent]", "[runner]")):
                    state = "noise"
                    continue
                chars = len(line) + 1
                if expect_cmd:  # the command the model wrote
                    agg["vis"] += chars
                    add_ctx(chars)
                    expect_cmd = False
                    state = "in"
                    continue
                if state == "in":
                    agg["in"] += chars
                    add_ctx(chars)
                elif state == "out":
                    agg["vis"] += chars
                    add_ctx(chars)
    agg["total"] += smax
    agg["sessions"] = len(sessions)
    return agg


def codex_run_costs(item, runs):
    """Reconstruct low/central/high dollar costs for every run of a config."""
    input_rate, cache_rate, output_rate, write_rate, tiered = CODEX_RATES[item["key"]]
    cap_chars = codex_cap_tokens(item["key"]) * CODEX_CPT
    parsed = [codex_parse(path, cap_chars) for path in runs]

    def med(values):
        values = sorted(values)
        middle = len(values) // 2
        return values[middle] if len(values) % 2 else (values[middle - 1] + values[middle]) / 2

    counted = [(a["total"], a["nexec"]) for a in parsed if a["total"]]
    median_total = med([t for t, _ in counted]) if counted else 0
    median_exec = med([e for _, e in counted]) if counted else 0

    def price(fresh, out, cache_tokens, ctx_frac, req_frac):
        if not tiered:
            ctx_frac = req_frac = 0.0
        return (fresh * (write_rate or input_rate) * (1 + req_frac)
                + out * output_rate * (1 + 0.5 * req_frac)
                + cache_tokens * cache_rate * (1 + ctx_frac)) / 1_000_000

    results = []
    for agg in parsed:
        text_in = agg["in"] / CODEX_CPT
        visible = agg["vis"] / CODEX_CPT
        total = agg["total"]
        method = "reconstructed-token"
        if not total:
            if agg["nexec"] == 0:
                total = text_in + visible  # crashed before doing work
                method = "reconstructed-crash"
            elif median_exec:  # worked but never printed a counter: scale by activity
                total = median_total * agg["nexec"] / median_exec
                method = "reconstructed-scaled"
            else:  # no counter-bearing peer to scale from: price the text
                total = text_in + visible
                method = "reconstructed-text"
        if total >= text_in + visible:
            # counter exceeds transcript text: the excess is hidden reasoning
            # (central/high, billed as output) or untranscribed input (low)
            fresh, out = text_in, total - text_in
            fresh_low, out_low = total - visible, visible
        else:  # transcript logs more than was sent (tool-output truncation)
            fresh = total * text_in / (text_in + visible)
            out = total - fresh
            fresh_low, out_low = fresh, out
        ctx_frac = agg["sum_ctx_long"] / agg["sum_ctx"] if agg["sum_ctx"] else 0.0
        requests = agg["nexec"] + agg["nuser"]
        req_frac = agg["nlong"] / requests if requests else 0.0
        # cache bands: chars/token 4.5-3.5, 0.85 batching discount low,
        # 1.29 observed validation spread high
        low = price(fresh_low, out_low, agg["sum_ctx"] / 4.5 * 0.85, ctx_frac, req_frac)
        central = price(fresh, out, agg["sum_ctx"] / 4.0, ctx_frac, req_frac)
        high = price(fresh, out, agg["sum_ctx"] / 3.5 * 1.29, ctx_frac, req_frac)
        results.append((central, method, low, high))
    return results


def run_cost(path, item):
    family = item["family"]
    if family == "claude":
        return claude_cost(path)
    if family == "opencode":
        return opencode_cost(path, item)
    if family.startswith("grok-"):
        return grok_cost(path, family)
    return None, "unavailable", None, None


BENCH_WINDOW_MINUTES = 125  # 2h limit plus observed grace


# gemini-3-5-flash's scenario-D run 17258321 was deleted from
# /fast/jyeon/ptb_results after this cost was originally computed (2026-08-21),
# so it can no longer be recomputed from source. All 12 records were
# cost_method="recorded" (no imputation) in that run, so the prior result is
# frozen here verbatim rather than silently dropping a seed and recomputing
# on 2 runs for that scenario. Remove this once the run is restored, or the
# config is recomputed on a fresh, complete set of seeds.
FROZEN_SUMMARIES = {
    "gemini-3-5-flash": {
        "key": "gemini-3-5-flash",
        "source": "opencode_opencode_gemini-3.5-flash_2h",
        "full_12_run_cost_usd": 424.42578765000013,
        "full_12_run_cost_low_usd": 424.42578765000013,
        "full_12_run_cost_high_usd": 424.42578765000013,
        "imputed_run_count": 0,
        "runs": [
            {"run_id": 17258307, "scenario": "A", "cost_usd": 89.0204064000001, "cost_method": "recorded", "cost_low_usd": 89.0204064000001, "cost_high_usd": 89.0204064000001},
            {"run_id": 17258308, "scenario": "A", "cost_usd": 59.47308390000006, "cost_method": "recorded", "cost_low_usd": 59.47308390000006, "cost_high_usd": 59.47308390000006},
            {"run_id": 17258320, "scenario": "C", "cost_usd": 16.877177850000006, "cost_method": "recorded", "cost_low_usd": 16.877177850000006, "cost_high_usd": 16.877177850000006},
            {"run_id": 17258321, "scenario": "D", "cost_usd": 14.132655300000001, "cost_method": "recorded", "cost_low_usd": 14.132655300000001, "cost_high_usd": 14.132655300000001},
            {"run_id": 17258322, "scenario": "B", "cost_usd": 45.246703349999976, "cost_method": "recorded", "cost_low_usd": 45.246703349999976, "cost_high_usd": 45.246703349999976},
            {"run_id": 17258324, "scenario": "D", "cost_usd": 38.63654070000003, "cost_method": "recorded", "cost_low_usd": 38.63654070000003, "cost_high_usd": 38.63654070000003},
            {"run_id": 17258325, "scenario": "B", "cost_usd": 36.66009794999999, "cost_method": "recorded", "cost_low_usd": 36.66009794999999, "cost_high_usd": 36.66009794999999},
            {"run_id": 17258326, "scenario": "C", "cost_usd": 5.36640525, "cost_method": "recorded", "cost_low_usd": 5.36640525, "cost_high_usd": 5.36640525},
            {"run_id": 17258327, "scenario": "D", "cost_usd": 40.895345700000036, "cost_method": "recorded", "cost_low_usd": 40.895345700000036, "cost_high_usd": 40.895345700000036},
            {"run_id": 17331409, "scenario": "A", "cost_usd": 20.730858750000003, "cost_method": "recorded", "cost_low_usd": 20.730858750000003, "cost_high_usd": 20.730858750000003},
            {"run_id": 17331410, "scenario": "B", "cost_usd": 22.83222765000001, "cost_method": "recorded", "cost_low_usd": 22.83222765000001, "cost_high_usd": 22.83222765000001},
            {"run_id": 17331411, "scenario": "C", "cost_usd": 34.55428484999999, "cost_method": "recorded", "cost_low_usd": 34.55428484999999, "cost_high_usd": 34.55428484999999},
        ],
    },
}


def summarize(item):
    if item["key"] in FROZEN_SUMMARIES:
        return FROZEN_SUMMARIES[item["key"]]
    runs = selected_runs(item)
    if item["family"] == "codex":
        costed = codex_run_costs(item, runs)
    else:
        costed = [run_cost(path, item) for path in runs]
    records = []
    for path, (cost, cost_method, low, high) in zip(runs, costed):
        records.append({
            "run_id": run_id(path), "scenario": scenario(path), "path": path,
            "cost_usd": cost, "cost_method": cost_method,
            "cost_low_usd": low, "cost_high_usd": high,
        })
    grouped = {scen: [record for record in records if record["scenario"] == scen] for scen in "ABCD"}
    if len(records) != 12 or any(len(runs) != 3 for runs in grouped.values()):
        raise ValueError(f"{item['key']} does not have exactly three runs per scenario")

    known_costs = [record["cost_usd"] for record in records if record["cost_usd"] is not None]
    if not known_costs:
        raise ValueError(f"{item['key']} has no usable cost records")
    config_mean = mean(known_costs)
    for scen, scen_runs in grouped.items():
        scenario_known = [record["cost_usd"] for record in scen_runs if record["cost_usd"] is not None]
        replacement = mean(scenario_known) if scenario_known else config_mean
        for record in scen_runs:
            if record["cost_usd"] is None:
                record["cost_usd"] = replacement
                # imputation band: +/-30% covers the scenario spread
                record["cost_low_usd"] = replacement * 0.7
                record["cost_high_usd"] = replacement * 1.3
                record["cost_method"] = "imputed-scenario-mean" if scenario_known else "imputed-config-mean"

    # A message-level fallback run with no final result can under-count. Bound
    # it above by the duration-scaled mean of its fully-recorded scenario peers.
    for record in records:
        if record["cost_method"] != "official-message-token":
            continue
        peers = [peer["cost_usd"] for peer in grouped[record["scenario"]]
                 if peer["cost_method"] == "official-token"]
        if not peers:
            continue
        minutes = run_minutes(record["path"])
        fraction = min(1.0, minutes / BENCH_WINDOW_MINUTES) if minutes is not None else 1.0
        record["cost_high_usd"] = max(record["cost_high_usd"], mean(peers) * fraction)

    for record in records:
        record.pop("path")
    return {
        "key": item["key"], "source": item["root"].name,
        "full_12_run_cost_usd": sum(record["cost_usd"] for record in records),
        "full_12_run_cost_low_usd": sum(record["cost_low_usd"] for record in records),
        "full_12_run_cost_high_usd": sum(record["cost_high_usd"] for record in records),
        "imputed_run_count": sum(record["cost_method"].startswith("imputed-") for record in records),
        "runs": records,
    }


def main():
    summaries = [summarize(item) for item in CONFIGS]
    payload = {
        "generated_at": "2026-09-24",
        "source_script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "methodology": {
            "cost": "Sum of API-equivalent agent cost across all 12 selected runs. "
                    "Claude and Grok runs are repriced from recorded token counts; OpenCode runs "
                    "use recorded per-step dollars (verified against current rates to the cent); "
                    "Codex runs are reconstructed from transcripts because the CLI's combined "
                    "counter excludes cache reads: the counter is split into fresh input and "
                    "output (including hidden reasoning), and cache-read volume is integrated "
                    "from per-request context sizes with compaction-calibrated ceilings.",
            "cost_bands": "cost_low_usd/cost_high_usd bound method uncertainty: Codex text-vs-"
                          "reasoning split and cache conversion, duration-scaled peer bounds "
                          "for Claude runs missing a final usage record, and +/-30% on imputed "
                          "runs. Grok Build rows report a context-normalized cost (cached "
                          "context capped at 165K tokens, sub-200K rates) because those runs "
                          "never compacted; the actual reconciled bill is the high bound.",
            "missing_cost": "Codex runs without counters are reconstructed from their own "
                            "transcripts (crashed runs from their text, worked runs scaled by "
                            "activity). Other missing runs use the scenario mean, or the "
                            "configuration mean when the entire scenario is missing.",
            "pricing_date": "2026-08-14",
            "pricing_sources": {
                "Anthropic": "https://platform.claude.com/docs/en/about-claude/pricing",
                "OpenAI": "https://developers.openai.com/api/docs/pricing",
                "Google": "https://ai.google.dev/gemini-api/docs/pricing",
                "Kimi": "https://platform.kimi.ai/docs/pricing",
                "Z.AI": "https://docs.z.ai/guides/overview/pricing",
                "xAI": "https://docs.x.ai/developers/pricing",
            },
        },
        "configs": summaries,
    }
    temporary = OUTPUT.with_suffix(".tmp")
    temporary.write_text(json.dumps(payload, indent=2) + "\n")
    temporary.replace(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    main()
