# Guia para Criar um Ambiente Jupyter com UV

Este guia mostra como configurar um ambiente para Análise de Dados e Ciência de Dados usando Jupyter Notebooks e ferramentas clássicas (Pandas, Matplotlib, etc.), com gerenciamento via `uv`.

---

## 1. Crie o projeto e o ambiente virtual

```bash
uv init meu_projeto --python 3.12
```


## 2. Entre na pasta do projeto

```bash
cd meu_projeto
```


## 3. Instale as bibliotecas de dados e o Jupyter

(Instalando pacotes comuns para manipulação de dados, visualização e o próprio Jupyter Notebook com seu kernel)

```bash
uv add pandas openpyxl matplotlib seaborn jupyter ipykernel wordcloud
```

- `pandas`: Manipulação e análise de dados.
- `openpyxl`: Leitura e escrita de arquivos Excel (`.xlsx`).
- `matplotlib` e `seaborn`: Visualização gráfica avançada.
- `jupyter` e `ipykernel`: Criação de notebooks iterativos.
- `wordcloud`: Geração de nuvens de palavras.


## 4. Inicie o Jupyter Notebook

```bash
uv run jupyter notebook
```

Isso abrirá automaticamente no seu navegador o servidor do Jupyter na porta padrão (geralmente `http://localhost:8888`), e os seus pacotes estarão prontos para uso nos notebooks (`.ipynb`).
---

## 5. Dica: Usando com o VS Code

Se você preferir trabalhar dentro do VS Code:

1. Instale a extensão oficial de **Jupyter** da Microsoft no VS Code.
2. Crie ou abra um arquivo com extensão `.ipynb`.
3. Ao selecionar o "Kernel" (o motor de execução) no canto superior direito, escolha "Python Environments" e procure o ambiente criado pelo `uv` (`.venv`).
