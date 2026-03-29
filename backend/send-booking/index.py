import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Отправляет заявку на консультацию в Telegram-чат агентства."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    service = body.get("service", "").strip()
    time = body.get("time", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    lines = [
        "📋 <b>Новая заявка на консультацию</b>",
        "",
        f"👤 <b>Имя:</b> {name}",
        f"📞 <b>Телефон:</b> {phone}",
    ]
    if service:
        lines.append(f"⚖️ <b>Услуга:</b> {service}")
    if time:
        lines.append(f"🕐 <b>Удобное время:</b> {time}")
    if comment:
        lines.append(f"💬 <b>Комментарий:</b> {comment}")

    text = "\n".join(lines)

    bot_token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        return {
            "statusCode": 502,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Ошибка Telegram", "detail": error_body}),
        }

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
