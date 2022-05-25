### Установка с помощью окружения poetry
    poetry shell
---
    poetry install 

### Установка с помощью окружения python-venv
    python<your version> -m venv env
---
    . ./env/bin/activate
---
    pip install -r requirements.txt

### Запуск:
    uvicorn server:app --reload --port 8000



