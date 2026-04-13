# Guia para Criar um Projeto Flask com UV

### 1. Crie o projeto e o ambiente virtual

(O comando cria a pasta do projeto, inicializa o ambiente e configura o Python automaticamente)

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o Flask no projeto

(O pacote será registrado no `pyproject.toml`)

```bash
uv add flask
```

### 4. Crie o arquivo principal da aplicação

Crie um arquivo chamado `app.py` na raiz da sua pasta com o seguinte conteúdo:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "<p>Hello, World!</p>"
```

### 5. Inicie o servidor de desenvolvimento

```bash
uv run flask run --debug
```

*(A flag `--debug` é fundamental pois ativa o ambiente de desenvolvimento e o hot-reload automático quando você edita e salva o código).*

### 6. Acesse o site no navegador

Abra o navegador e vá para:
**http://localhost:5000/**

---

## Primeiros passos após o setup

### Separar rotas de forma modular (Blueprints)

Ao contrário do Django (onde usa-se `startapp`), o padrão do micro-framework Flask para dividir o projeto em múltiplos arquivos e módulos é utilizando **Blueprints**.

Para criar uma rota isolada, crie um arquivo chamado `usuarios.py`:

```python
from flask import Blueprint

usuarios_bp = Blueprint('usuarios', __name__)

@usuarios_bp.route('/usuarios')
def lista_usuarios():
    return "Lista de Usuários"
```

Em seguida, importe e registre no seu arquivo principal `app.py`:

```python
from usuarios import usuarios_bp

app.register_blueprint(usuarios_bp)
```

---

## Opções Comuns do Ecossistema

Pelo fato do Flask vir totalmente livre, no começo de aplicações reais você provavelmente precisará dessas expansões:

### Flask-SQLAlchemy (Para Bancos de Dados)

O padrão universal de ORM para Flask, facilitando gerenciar tabelas e entidades no banco.

```bash
uv add flask-sqlalchemy
```

### Flask-Migrate (Para Migrações)

O equivalente ao comando `migrate` do Django que integra o banco automaticamente seguindo as modificações do SQLAlchemy.

```bash
uv add flask-migrate
```

### Flask-CORS (Para APIs)

Essencial caso o seu backend Flask vá servir dados via JSON para aplicações frontend, como em React ou Vue, evitando os famosos erros de CORS Policy no navegador.

```bash
uv add flask-cors
```
