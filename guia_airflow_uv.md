# Guia para Criar um Projeto Airflow com UV

### 1. Crie o projeto e o ambiente virtual

(O comando cria a pasta do projeto, inicializa o ambiente e configura o Python automaticamente)

```bash
uv init meu_projeto --python 3.12
```

### 2. Entre na pasta do projeto

```bash
cd meu_projeto
```

### 3. Instale o Airflow e o Provider de Postgres

(Instalamos o Airflow e o suporte para PostgreSQL, comum em ambientes de produção)

```bash
uv add apache-airflow apache-airflow-providers-postgres
```

### 4. Configure as Variáveis de Ambiente

(O Airflow precisa saber onde guardar seus arquivos de configuração e procurar pelas DAGs)

```bash
export AIRFLOW_HOME=$(pwd)
export AIRFLOW__CORE__DAGS_FOLDER=$(pwd)/dags
```

### 5. Inicialize o Banco de Dados

(Isso cria os arquivos essenciais, incluindo o `airflow.cfg` e o banco de dados SQLite local)

```bash
uv run airflow db migrate
```

### 6. Configure o Usuário e Senha

Para facilitar a configuração no Airflow 3, crie um arquivo chamado `configurar_usuario.py` com o conteúdo abaixo:

```python
import json
import os
import getpass
import re
import subprocess
import sys

CFG_PATH = "airflow.cfg"
PASSWORDS_FILE = "simple_auth_manager_passwords.json.generated"


def garantir_airflow_cfg():
    """Garante que o airflow.cfg existe, rodando db migrate se necessário."""
    if not os.path.exists(CFG_PATH):
        print("Arquivo airflow.cfg não encontrado. Inicializando banco de dados...")
        subprocess.run(
            ["uv", "run", "airflow", "db", "migrate"],
            check=True,
            env={**os.environ, "AIRFLOW_HOME": os.getcwd()},
        )
        print("Banco de dados inicializado.\n")


def atualizar_airflow_cfg(usuario):
    """Atualiza o airflow.cfg com o usuário e role admin."""
    with open(CFG_PATH, "r") as f:
        content = f.read()

    new_line = f"simple_auth_manager_users = {usuario}:admin"
    pattern = r"simple_auth_manager_users\s*=\s*.*"

    if re.search(pattern, content):
        new_content = re.sub(pattern, new_line, content)
        with open(CFG_PATH, "w") as f:
            f.write(new_content)
        print(f"airflow.cfg atualizado: '{usuario}' definido como admin.")
    else:
        print("AVISO: Não encontrou simple_auth_manager_users no airflow.cfg.")


def salvar_senha(usuario, senha):
    """Salva apenas o usuário configurado, sem misturar com entradas antigas."""
    with open(PASSWORDS_FILE, "w") as f:
        json.dump({usuario: senha}, f)
    print(f"Arquivo de senhas criado para o usuário '{usuario}'.")


def configurar():
    print("\n--- Configuração de Usuário Airflow 3 ---\n")

    garantir_airflow_cfg()

    usuario = input("Nome de usuário [admin]: ").strip() or "admin"

    while True:
        senha = getpass.getpass(f"Senha para '{usuario}': ")
        if not senha:
            print("A senha não pode ser vazia.")
            continue
        confirmar = getpass.getpass("Confirme a senha: ")
        if senha == confirmar:
            break
        print("As senhas não coincidem. Tente novamente.")

    salvar_senha(usuario, senha)
    atualizar_airflow_cfg(usuario)

    print(f"\nPronto! Usuário '{usuario}' configurado com sucesso.")
    print("Agora rode:")
    print("  export AIRFLOW_HOME=$(pwd)")
    print("  export AIRFLOW__CORE__DAGS_FOLDER=$(pwd)/dags")
    print("  uv run airflow standalone")


if __name__ == "__main__":
    configurar()
```

E execute o script:

```bash
uv run python configurar_usuario.py
```

### 7. Inicie o Airflow

```bash
uv run airflow standalone
```

### 8. Acesse o Airflow no navegador

Abra o navegador e vá para:
**http://localhost:8080**

---

## Primeiros Passos

### Onde colocar minhas DAGs?

Por padrão, o Airflow procura arquivos Python na pasta `dags/`. Crie a pasta para começar:

```bash
mkdir dags
```

### Exemplo de DAG Simples

Crie um arquivo `dags/hello_world.py`:

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
import pendulum

with DAG(
    "hello_world_uv",
    start_date=pendulum.datetime(2024, 1, 1, tz="UTC"),
    schedule="@daily",
    catchup=False,
) as dag:
    
    def hello():
        print("Hello from Airflow + UV!")

    task = PythonOperator(
        task_id="say_hello",
        python_callable=hello
    )
```

## Opções Comuns do Ecossistema

Dependendo da sua stack, você pode precisar de outros providers:

### Cloud Providers

```bash
uv add apache-airflow-providers-amazon  # AWS (S3, Redshift, etc)
uv add apache-airflow-providers-google  # GCP (BigQuery, GCS, etc)
uv add apache-airflow-providers-microsoft-azure # Azure
```

### Outras Integrações

```bash
uv add apache-airflow-providers-docker
uv add apache-airflow-providers-http
uv add apache-airflow-providers-slack
```
