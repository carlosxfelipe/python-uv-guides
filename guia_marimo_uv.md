# Guia para Criar um Projeto Marimo com UV

### 1. Crie o projeto e o ambiente virtual

(O comando cria a pasta do projeto, inicializa o ambiente e configura o Python automaticamente)

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o Marimo

(O pacote será registrado no `pyproject.toml`)

```bash
uv add marimo
```

### 4. Inicie o editor do notebook

(Isso criará ou abrirá o arquivo `app.py` de forma reativa)

```bash
uv run marimo edit app.py
```

### 5. Acesse o editor no navegador

Abra o navegador e vá para:
**http://localhost:2718/**

---

## Modos Adicionais

### Inicie o notebook como Dashboard

Para servir o notebook apenas em modo leitura (ideal para compartilhar visualizações na web):

```bash
uv run marimo run app.py
```

### Aprenda na Prática com o Tutorial

O Marimo possui um excelente tutorial interativo embutido. Se quiser entender como funcionam as células reativas do zero, basta executar:

```bash
uv run marimo tutorial intro
```
