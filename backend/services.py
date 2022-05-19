from datetime import datetime, timedelta



def get_current_period(analyzed_period: str):
    if analyzed_period == "by_day":
        return datetime.today().strftime("%d-%m-%Y")
    elif analyzed_period == "by_week":
        time_delta = 6
    elif analyzed_period == "by_month":
        time_delta = 30
    today = datetime.today()
    analyzed_period = (today - timedelta(days=time_delta)).strftime("%d-%m-%Y")
    period = f"{analyzed_period} — {today.strftime('%d-%m-%Y')}"
    return period