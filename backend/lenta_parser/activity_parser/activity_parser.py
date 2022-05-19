import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup

from lenta_parser.activity_parser.activity_parser_tools import (
    form_current_date_url,
    do_count_by_hours_parts,
    form_current_urls_for_daterange_parser,
    get_dates_for_week,
    categories_dict
)


def collect_news_times(url: str):
    news_time_items = []
    for i in range(1, 20):
        time.sleep(0.2)
        current_url = url + f"{i}"
        response = requests.get(current_url)
        if response.status_code == 404:
            break
        parsed_response = BeautifulSoup(response.text, "lxml")
        news_current_page_items = parsed_response.findAll("span", "time")
        if len(news_current_page_items) == 0:
            break
        news_time_items += [news_item.text for news_item in news_current_page_items]
    return news_time_items


def activity_lenta_parser(analyze_by: str, category="world", **kwargs):
    started_date = datetime(year=2022, day=1, month=4)
    url = form_current_date_url(started_date, category)

    if analyze_by == "by_day":
        news_time_items = collect_news_times(url)
        (
            night_count,
            morning_count,
            day_count,
            evening_count,
            late_evening_count,
        ) = do_count_by_hours_parts(news_time_items)
        analyzed_value = {
            "00:00 - 05:00": night_count,
            "06:00 - 10:00": morning_count,
            "11:00 - 16:00": day_count,
            "17:00 - 21:00": evening_count,
            "22:00 - 23:59": late_evening_count,
        }

    elif analyze_by == "by_week":
        days = get_dates_for_week(days_ago=6)
        page_urls = form_current_urls_for_daterange_parser(days, category)
        analyzed_value = {}
        for url, day in zip(page_urls, days):
            news = collect_news_times(url)
            analyzed_value[datetime.strptime(day, "%Y/%m/%d").strftime("%d-%m-%Y")] = len(news)

    elif analyze_by == "by_month":
        days = get_dates_for_week(days_ago=30)
        page_urls = form_current_urls_for_daterange_parser(days, category)
        analyzed_value = {}
        for url, day in zip(page_urls, days):
            news = collect_news_times(url)
            analyzed_value[datetime.strptime(day, "%Y/%m/%d").strftime("%d-%m-%Y")] = len(news)

    return analyzed_value


def category_lenta_parser(categories, analyze_by: str, **kwargs):
    analyzed_value = {}
    for category_id in categories:
        category = categories_dict.get(category_id, {}).get("link_label", None)
        if category is not None:
            category_analyzer = activity_lenta_parser(category=category, analyze_by=analyze_by, **kwargs)
            analyzed_value[categories_dict[category_id]["label"]] = sum(category_analyzer.values())
    return analyzed_value
