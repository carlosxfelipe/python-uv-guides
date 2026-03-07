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
import matplotlib.pyplot as plt
import pandas as pd
import plotly.express as px
import streamlit as st

st.set_page_config(page_title="Meu App", layout="wide")

st.title("Meu App Streamlit")
st.write("Exemplo simples mostrando o que dá para fazer com Streamlit.")

st.divider()

st.header("Mini demo com dados mockados")

df = pd.DataFrame(
    {
        "mês": ["Jan", "Fev", "Mar", "Abr"],
        "vendas": [10, 15, 7, 20],
    }
)

col1, col2 = st.columns(2)

with col1:
    st.subheader("Tabela (pandas)")
    st.dataframe(df, use_container_width=True)

with col2:
    st.subheader("Gráfico Matplotlib")
    fig, ax = plt.subplots()
    ax.plot(df["mês"], df["vendas"], marker="o")
    ax.set_xlabel("Mês")
    ax.set_ylabel("Vendas")
    ax.set_title("Vendas por mês (Matplotlib)")
    st.pyplot(fig)

st.subheader("Gráfico Plotly")
fig_plotly = px.bar(df, x="mês", y="vendas", title="Vendas por mês (Plotly)")
st.plotly_chart(fig_plotly, use_container_width=True)
```

## 5. Rodando o app

```bash
uv run streamlit run main.py
```

Acesse: **http://localhost:8501/**
