# Projeto Django com UV

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

Abra o navegador e vá para:
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

A biblioteca clássica e mais robusta para APIs no ecossistema Django. **Dica:** Para ter Swagger no DRF, você precisa do pacote `drf-spectacular`.

```bash
uv add djangorestframework drf-spectacular
```

_(Após instalar, adicione `'rest_framework'` e `'drf_spectacular'` ao seu `INSTALLED_APPS` e configure o `REST_FRAMEWORK` no `settings.py`)._

### Django Ninja

Uma alternativa moderna, inspirada no FastAPI, que utiliza `Type Hints` do Python (Pydantic) para validação de dados e é extremamente rápida.

**Principais Benefícios:**

- **Performance:** Construído sobre o Pydantic, é um dos frameworks mais rápidos para Django.
- **Async:** Suporte nativo para funções assíncronas (`async def`).
- **Auto-Documentação:** Swagger e Redoc vêm configurados por padrão em `/api/docs`.
- **Tipagem Estática:** Menos bugs e melhor suporte de autocompletar no editor.

```bash
uv add django-ninja
```

#### Django Ninja Extra (Recomendado para Projetos Maiores)

Se você vem do Django Rest Framework (DRF) ou precisa de mais estrutura, o `django-ninja-extra` adiciona funcionalidades essenciais:

**Vantagens do Extra:**

- **Class-Based Views (Controllers):** Permite organizar rotas em classes, facilitando a organização de grandes projetos.
- **Injeção de Dependências:** Facilita a gestão de serviços e desacoplamento de lógica.
- **Permissões Avançadas:** Sistema de permissões robusto similar ao do DRF.
- **Throttling:** Controle de taxa de requisições (rate limiting) integrado.

```bash
uv add django-ninja-extra
```

---

## Scalar — Interface de API moderna para Django Ninja

O [Scalar](https://scalar.com) é uma interface de documentação de API moderna e bonita, que substitui o Swagger padrão. O pacote `scalar-ninja` integra o Scalar diretamente ao Django Ninja.

### Instalação

```bash
uv add scalar-ninja
```

### Uso básico

No arquivo onde você instancia o `NinjaAPI`, importe e passe o `ScalarViewer` para o parâmetro `docs`:

```python
from ninja import NinjaAPI
from scalar_ninja import ScalarViewer

api = NinjaAPI(
    version="1.0.0",
    title="API Reference",
    description="Documentação da API",
    docs=ScalarViewer(),
)
```

A documentação ficará disponível em `/api/docs`.

### Uso avançado (com configuração)

```python
from ninja import NinjaAPI
from scalar_ninja import ScalarConfig, ScalarViewer

scalar_config = ScalarConfig(
    show_sidebar=False,
    force_dark_mode_state="dark",
)

api = NinjaAPI(
    version="1.0.0",
    title="API Reference",
    description="Documentação da API",
    docs=ScalarViewer(scalar_config),
)
```
