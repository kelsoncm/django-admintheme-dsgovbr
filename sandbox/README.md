# Django AdminTheme DSGovBR - Sandbox de Testes Funcionais

Este é o ambiente sandbox desenvolvido para validar de forma exaustiva e manual o comportamento visual, a responsividade e a integridade de permissões da biblioteca de temas baseada no **Design System do Governo Federal (DSGovBR)**.

A aplicação foi estruturada de forma modular, cobrindo as superfícies críticas do Django que costumam quebrar ou apresentar inconsistências sob temas customizados: o painel administrativo (`django.contrib.admin`), os fluxos nativos de autenticação (`django.contrib.auth`) e formulários públicos estruturados (`django.forms`).

---

## 🚀 Como Executar a Sandbox

A sandbox utiliza o gerenciador de pacotes moderno `uv` para a execução consistente do ambiente Python.

### 1. Inicializar o Banco de Dados (SQLite)
Rode as migrações para criar o esquema do banco de dados SQLite local:
```bash
uv run python manage.py migrate
```

### 2. Popular os Dados de Testes (Seed)
A sandbox vem com um comando customizado para limpar qualquer dado existente e recriar toda a estrutura de órgãos, permissões granulares, massas de dados realistas e 9 contas de usuários com diferentes níveis de acesso:
```bash
uv run python manage.py seed_sandbox
```

### 3. Iniciar o Servidor
Suba o servidor de desenvolvimento local do Django:
```bash
uv run python manage.py runserver
```
Acesse a aplicação no navegador em: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 👥 Contas de Teste Pré-Configuradas

Todos os usuários de testes são criados com a senha padrão: **`Senha123!`**

| Usuário | E-mail | Grupo / Papel | Acesso ao Admin (Staff)? | Finalidade do Perfil |
| :--- | :--- | :--- | :---: | :--- |
| `superuser` | `superuser@gov.br` | Superusuário | **Sim** | Acesso total e ilimitado para administração de TI. |
| `staff_admin_total` | `admin_total@gov.br` | `Admin_Global` | **Sim** | Acesso total de edição em todos os módulos cadastrais. |
| `staff_editorial_full` | `ed_full@gov.br` | `Editorial_Manager` | **Sim** | Gerenciamento completo de Notícias, Tags e Comentários. |
| `staff_editorial_readonly` | `ed_ro@gov.br` | `Editorial_Reader` | **Sim** | Apenas visualização de Notícias e Categorias (sem permissão de edição). |
| `staff_atendimento_sem_delete` | `suporte@gov.br` | `Suporte` | **Sim** | Gerencia chamados de atendimento, mas sem permissão de exclusão. |
| `staff_eventos_sem_add` | `eventos@gov.br` | `Eventos_Manager` | **Sim** | Modifica/exclui eventos existentes, mas não pode criar novos. |
| `staff_cadastro_view_only` | `cadastro_ro@gov.br` | `Cadastro_Reader` | **Sim** | Permissão exclusiva de leitura nas tabelas cadastrais. |
| `user_autenticado_comum` | `cidadao@gov.br` | (Nenhum) | **Não** | Cidadão comum autenticado. Testa visualização na área pública. |
| `user_inativo` | `inativo@gov.br` | (Nenhum) | **Não** | Usuário desativado (simula bloqueio de login). |

> 💡 **Dica de Produtividade:** Acesse a tela `/qa/` (QA Orchestrator) na interface web para alternar entre estes perfis de forma instantânea sem precisar realizar o login manual em cada troca de cenário.

---

## 📂 Arquitetura da Sandbox (Módulos de Testes)

A sandbox é segmentada em mini-aplicações focadas em diferentes aspectos do Django:

*   **`core`**: Página inicial do dashboard, base templates unificados, navegação (drawer menu) e carregamento inicial dos recursos estáticos e do compressor de arquivos.
*   **`accounts`**: Customização do modelo de usuário (`CustomUser`) e integração dos templates nativos de autenticação (`registration/`) do Django no tema DSGovBR (login, logout, alteração e reset de senha).
*   **`cadastro`**: Validação de inlines avançados, buscas com autocomplete e filtros do Django Admin.
*   **`editorial`**: Validação de relacionamentos Many-to-Many complexos, geração de slugs automáticos e tabelas com inlines tabulares.
*   **`atendimento`**: Validação de formulários e campos em modo apenas leitura (`readonly_fields`).
*   **`eventos`**: Validação de navegação temporal do admin (`date_hierarchy`) e customização de campos de formulários (`formfield_overrides`).
*   **`media_library`**: Validação de uploads de arquivos e imagens usando widgets com suporte a mídias no Django.
*   **`public_forms`**: Validação de renderização de formulários Django normais expostos em páginas públicas (`as_p`, `as_table`, `as_ul`, `as_div`).
*   **`ui_showcase`**: Um catálogo de componentes puros do design system para validar que o build do SCSS e do JS do tema estão aplicando o design perfeitamente fora do Django Admin.
*   **`qa_orchestrator`**: Console de utilitários rápidos para controle e validação de qualidade (chaveador de sessões, reset de massa de dados e log de status).

---

## 🛠️ Regras de Desenvolvimento da Sandbox

*   **Separação Estrita de Recursos:** Nunca inclua CSS, HTML e JS no mesmo arquivo.
*   **Compilação via SCSS:** Todo o estilo customizado deve ser escrito em SCSS e compilado pelo `django-compressor`.
*   **Apenas Variáveis:** Nunca declare cores, famílias de fontes ou tamanhos de fontes diretamente no corpo das regras CSS/SCSS; use variáveis (ex: `$sandbox-border-color` ou referências do tema).
*   **Sem Templates Globais na Raiz:** Os templates devem ser localizados estritamente dentro das pastas `<app>/templates/<app>/` para manter a modularidade e evitar conflitos globais fora do empacotamento.
