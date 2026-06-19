# 🔧 Desenvolvimento

## Requisitos

- Python 3.10+
- Django 5.2+

## Setup para Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/kelsoncm/django-dsgovbr.git
cd django-dsgovbr

# Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instale as dependências de desenvolvimento
pip install -e ".[dev]"

# Execute os testes
python -m pytest
```

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request
