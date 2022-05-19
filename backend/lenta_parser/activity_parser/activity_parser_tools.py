from datetime import date, timedelta
import pandas as pd


def form_current_date_url(started_date, category="world"):
    """
    funtion for form url for current_date
    """
    current_month = (
        started_date.month
        if len(str(started_date.month)) == 2
        else f"0{started_date.month}"
    )
    current_day = (
        started_date.day if len(str(started_date.day)) == 2 else f"0{started_date.day}"
    )
    current_url = f"https://lenta.ru/rubrics/{category}/{started_date.year}/{current_month}/{current_day}/page/"
    return current_url


def do_count_by_hours_parts(time_list: list):
    night_news_count = (
        morning_news_count
    ) = day_news_count = evening_news_count = late_evening_news_count = 0
    for time in time_list:
        hours = int(time.split(":")[0])
        if hours in set(range(6)):
            night_news_count += 1
        elif hours in set(range(6, 11)):
            morning_news_count += 1
        elif hours in set(range(11, 17)):
            day_news_count += 1
        elif hours in set(range(17, 22)):
            evening_news_count += 1
        else:
            late_evening_news_count += 1
    return (
        night_news_count,
        morning_news_count,
        day_news_count,
        evening_news_count,
        late_evening_news_count,
    )


def get_dates_for_week(days_ago: int) -> list:
    """
    This function for get one week dates
    """
    today = date.today()
    week_ago = today - timedelta(days=days_ago)
    date_range = (
        pd.date_range(min(today, week_ago), max(today, week_ago))
        .strftime("%Y/%m/%d")
        .tolist()
    )
    return date_range


def form_current_urls_for_daterange_parser(dates, category="world"):
    date_range_urls = [
        f"https://lenta.ru/rubrics/{category}/{date}/page/" for date in dates
    ]
    return date_range_urls


categories_dict = {
    1: {"label": "Россия", "link_label": "russia"},
    2: {"label": "Мир", "link_label": "world"},
    3: {"label": "Бывший СССР", "link_label": "ussr"},
    4: {"label": "Экономика", "link_label": "economics"},
    5: {"label": "Силовые структуры", "link_label": "forces"},
    6: {"label": "Наука и техника", "link_label": "science"},
    7: {"label": "Культура", "link_label": "culture"},
    8: {"label": "Спорт", "link_label": "sport"},
    9: {"label": "Интернет и СМИ", "link_label": "media"},
    10: {"label": "Ценности", "link_label": "style"},
    11: {"label": "Путешествия", "link_label": "travel"},
    12: {"label": "Из жизни", "link_label": "life"},
}
