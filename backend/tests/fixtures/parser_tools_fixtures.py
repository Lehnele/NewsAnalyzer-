from factory.faker import faker as FactoryFaker
import pymorphy2
import pytest


@pytest.fixture
def faker():
    return FactoryFaker.Faker(["ru_RU"])


@pytest.fixture
def random_text(faker):
    return faker.text(1000)


@pytest.fixture
def py_morphy():
    return pymorphy2.MorphAnalyzer(lang="ru")
