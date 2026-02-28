# Guia para Criar um Projeto Streamlit com UV

## 1. Crie o projeto e o ambiente virtual

```bash
uv init meu_projeto --python 3.12
```

## 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

## 3. Adicione o Streamlit (e bibliotecas úteis)

```bash
uv add streamlit pandas matplotlib plotly
```

## 4. Exemplo de `main.py`:

```python
import streamlit as st

st.set_page_config(page_title="Meu App", layout="centered")

st.title("Meu App Streamlit")
st.write("Descrição do app.")

nome = st.text_input("Seu nome")

if st.button("Enviar"):
    if nome:
        st.success(f"Olá, {nome}!")
    else:
        st.warning("Por favor, insira seu nome.")
```

## 5. Rodando o app

```bash
uv run python -m streamlit run main.py
```

Acesse: **http://localhost:8501/**
