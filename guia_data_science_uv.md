# Guia: Projeto de Exercícios em Ciência de Dados com UV

Este guia apresenta o setup completo para um projeto focado em exercícios de Ciência de Dados, cobrindo desde a manipulação de dados até o treinamento de modelos de Machine Learning e integração com bancos de dados SQLite.

### 1. Crie o projeto e o ambiente virtual

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o Stack Essencial de Ciência de Dados

Este comando instala as principais bibliotecas para análise, visualização, cálculo numérico e machine learning, além do suporte para arquivos Excel e bancos de dados.

```bash
uv add pandas numpy matplotlib seaborn scikit-learn scipy sqlalchemy openpyxl jupyter ipykernel
```

### O que foi instalado?

- `pandas`: O padrão para manipulação de tabelas (DataFrames).
- `numpy`: Base para cálculos matemáticos e vetoriais de alta performance.
- `matplotlib` & `seaborn`: A dupla dinâmica para criação de gráficos e visualização de dados.
- `scikit-learn`: A biblioteca principal para algoritmos de Machine Learning. (Nota: você instala `scikit-learn`, mas importa como `sklearn`).
- `scipy`: Ferramentas avançadas para computação científica e estatística.
- `sqlalchemy`: Facilita a conexão com bancos de dados SQL (como o SQLite).
- `openpyxl`: Permite que o Pandas leia e escreva arquivos do Excel (`.xlsx`).
- `jupyter` & `ipykernel`: Permite rodar o ambiente de Notebooks dentro do navegador ou no VS Code.

### 4. Exemplo: Conectando com SQLite e Pandas

Crie um arquivo chamado `exercicio.py` para testar a integração com SQLite:

```python
import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine, text

# 1. Definir o caminho do banco relativo ao script
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "escola.db"

# 2. Criar dados de exemplo
dados = pd.DataFrame({
    'aluno': ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo'],
    'nota_final': [9.5, 7.0, 8.5, 6.0, 9.0],
    'horas_estudo': [20, 15, 18, 10, 22]
})

# 3. Criar conexão com SQLite
engine = create_engine(f"sqlite:///{DB_PATH}")

# 4. Salvar o DataFrame no Banco de Dados
dados.to_sql('notas', con=engine, if_exists='replace', index=False)

# 4. Ler do Banco de Dados usando SQL
# (Usamos um gerenciador de contexto 'with' para garantir que a conexão seja fechada)
query = text('SELECT * FROM notas WHERE nota_final > 7')

with engine.connect() as conn:
    df_do_banco = pd.read_sql(query, con=conn)

print("Alunos com nota acima de 7:")
print(df_do_banco)
```

### 5. Como trabalhar nos exercícios

#### Opção A: Via Jupyter Notebook (Recomendado)

Para iniciar o ambiente visual para seus experimentos:

```bash
uv run jupyter notebook
```

**Dica para VS Code:**
Se você usa VS Code, basta abrir um arquivo `.ipynb` e, no canto superior direito, em "Selecionar Kernel", escolher **Python Environments** e apontar para o ambiente `.venv` criado pelo `uv`.

#### Opção B: Via Script Python direto

Para executar seu script de análise:

```bash
uv run python exercicio.py
```

---

### 6. Dica: Pratique sem precisar de arquivos externos

Uma grande vantagem do `scikit-learn` é fornecer datasets clássicos (como Iris, Titanic e Boston Housing) prontos para uso. Isso é excelente para exercícios, pois você não precisa procurar ou baixar arquivos CSV para começar a praticar.

Exemplo de como carregar o dataset de flores (Iris) e ver os dados:

```python
from sklearn.datasets import load_iris
import pandas as pd

# Carrega os dados brutos
iris = load_iris()

# Converte para um DataFrame (tabela) do Pandas para facilitar a análise
df_iris = pd.DataFrame(data=iris.data, columns=iris.feature_names)

# Adiciona a coluna com o nome real das espécies para facilitar a leitura
df_iris['species'] = [iris.target_names[i] for i in iris.target]

print("Primeiras linhas do dataset Iris (agora com nomes das flores):")
print(df_iris.head())
```

---

### 7. Qualidade de Código (Dica de Pro)

Para manter seu código organizado e seguindo as normas (PEP 8), recomenda-se usar o **Ruff**. Ele é um linter e formatador extremamente rápido.

#### Como adicionar como dependência de desenvolvimento:

```bash
uv add --dev ruff
```

#### Como usar:

```bash
# Verifica erros no código
uv run ruff check .

# Corrige erros e formata automaticamente
uv run ruff check --fix .
```

Pronto! Seu ambiente está configurado com as ferramentas mais poderosas do ecossistema Python para Ciência de Dados.
