# Python UV Guides

Este repositório contém guias práticos para a criação de projetos Python utilizando o gerenciador de pacotes uv integrado a diferentes frameworks, como Django, FastAPI, Flet e Streamlit.

## Instalação do uv

O uv pode ser instalado em diferentes sistemas operacionais utilizando os comandos abaixo.

### Linux e macOS

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows

```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Via Pip

```bash
pip install uv
```

## Conteúdo

O repositório inclui os seguintes guias:

- `guia_django_uv.md`: Configuração de projetos Django.
- `guia_fastapi_uv.md`: Configuração de APIs com FastAPI.
- `guia_flet_uv.md`: Desenvolvimento de interfaces gráficas com Flet.
- `guia_jupyter_uv.md`: Configuração de ambiente para Ciência de Dados com Jupyter.
- `guia_streamlit_uv.md`: Criação de dashboards e apps com Streamlit.

## Uso Básico

Cada guia fornece instruções específicas, mas o fluxo geral consiste em:

1. Inicializar o projeto: `uv init nome_do_projeto`
2. Adicionar dependências: `uv add nome_do_pacote`
3. Executar o código: `uv run python main.py`
