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
