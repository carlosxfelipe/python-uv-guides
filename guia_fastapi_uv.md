# Guia para Criar um Projeto FastAPI com UV

### 1. Crie o projeto e o ambiente virtual

(O comando cria a pasta do projeto, inicializa o ambiente e configura o Python automaticamente)

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o FastAPI (versão standard)

(O pacote `[standard]` já inclui o servidor `uvicorn` e outras ferramentas essenciais)

```bash
uv add "fastapi[standard]"
```

### 4. Crie o arquivo principal da aplicação

Crie um arquivo chamado `main.py` com o seguinte conteúdo:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

### 5. Inicie o servidor de desenvolvimento

```bash
uv run fastapi dev main.py
```

### 6. Acesse a aplicação no navegador

Abra o navegador e vá para:
**http://localhost:8000/**

Você também pode acessar a documentação automática da API em:
**http://localhost:8000/docs**

### 7. Inicie o servidor em modo de Produção

Quando você for fazer o deploy ou não quiser auto-reload ativado, utilize a CLI para produção:

```bash
uv run fastapi run main.py
```
---

## Opções Comuns do Ecossistema

Embora o pacote `[standard]` ofereça ótimas capacidades prontas para uso (como o Uvicorn), projetos do mundo real com FastAPI quase sempre necessitam dos pacotes abaixo para integrações:

### 1. Pydantic-Settings (Para Configurações)

Como o FastAPI e o Pydantic andam de mãos dadas, este é o padrão absoluto e tipado para ler e validar variáveis do arquivo `.env` de forma segura.

```bash
uv add pydantic-settings
```

### 2. SQLAlchemy e Alembic (Para Bancos de Dados)

Diferente do Django, o FastAPI não possui banco de dados acoplado nativamente. O **SQLAlchemy** é o ORM mais estável e recomendado, e o **Alembic** é a sua ferramenta espelho responsável por aplicar as migrações (`migrations`) desse banco de dados.

```bash
uv add sqlalchemy alembic
```

*(Dica: Lembre-se de adicionar também o driver nativo do seu respectivo banco, como o `asyncpg` ou `psycopg` para PostgreSQL).*
