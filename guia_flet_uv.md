# Guia para Criar um Projeto Flet com UV

Este guia mostra como criar um projeto Python moderno usando [Flet](https://flet.dev/) para interfaces gráficas, com gerenciamento de ambiente e dependências via [uv](https://github.com/astral-sh/uv).

---

## 1. Crie o projeto e o ambiente virtual

```bash
uv init meu_projeto --python 3.12
```

---

## 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

---

## 3. Instale o Flet (e bibliotecas úteis)

```bash
uv add flet
```

---

## 4. Exemplo de `main.py`

def main(page: ft.Page):

```python
import flet as ft


def main(page: ft.Page):
    page.title = "Contador Flet"
    page.vertical_alignment = ft.MainAxisAlignment.CENTER
    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    contador = ft.Text(value="0", size=40, weight=ft.FontWeight.BOLD)

    def incrementar(e):
        valor_atual = int(contador.value)
        contador.value = str(valor_atual + 1)
        page.update()

    page.add(
        ft.Text("Contador", size=28, weight=ft.FontWeight.BOLD),
        contador,
        ft.ElevatedButton("Incrementar", on_click=incrementar, width=200),
    )


ft.app(target=main)
```

---

## 5. Execute o app Flet

```bash
uv run python main.py
```

O app abrirá no navegador ou em uma janela nativa, dependendo do seu sistema.

---

## 6. Recursos recomendados

- [Documentação Flet](https://flet.dev/docs/)
- [Exemplos Flet no GitHub](https://github.com/flet-dev/examples)
- [Flet no PyPI](https://pypi.org/project/flet/)

---

Pronto! Seu projeto Flet está configurado para desenvolvimento moderno com uv.
