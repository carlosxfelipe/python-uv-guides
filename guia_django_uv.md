# Guia para Criar um Projeto Django com UV

### 1. Crie o projeto e o ambiente virtual

(O comando cria a pasta do projeto, inicializa o ambiente e configura o
Python automaticamente)

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o Django no projeto

(O pacote será registrado no `pyproject.toml`)

```bash
uv add django
```

### 4. Crie a estrutura do projeto Django

(O ponto final `.` indica que o projeto será criado **na pasta atual**)

```bash
uv run django-admin startproject config .
```

### 5. Aplique as migrações iniciais

_(opcional, mas recomendável)_

```bash
uv run python manage.py migrate
```

### 6. Inicie o servidor de desenvolvimento

```bash
uv run python manage.py runserver
```

### 7. Acesse o site no navegador

Abra o navegador e vá para:\
**http://localhost:8000/**

---

## Primeiros passos após o setup

### Como criar um novo app Django

Para criar um novo app dentro da pasta `apps/`, use:

```bash
uv run python manage.py startapp nome_do_app apps/nome_do_app
```

Substitua `nome_do_app` pelo nome desejado para o seu app.

---

## Opções para APIs

Caso seu objetivo seja criar uma API, aqui estão as duas bibliotecas mais populares para Django:

### Django Rest Framework (DRF)

A biblioteca clássica e mais robusta para APIs no ecossistema Django.

```bash
uv add djangorestframework
```

### Django Ninja

Uma alternativa moderna, inspirada no FastAPI, que utiliza `Type Hints` do Python e é extremamente rápida.

```bash
uv add django-ninja
```
