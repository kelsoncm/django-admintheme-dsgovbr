
🔧 Desenvolvimento
==================

Requisitos
----------


* Python 3.10+
* Django 5.2+

Setup para Desenvolvimento
--------------------------

.. code-block:: bash

   # Clone o repositório
   git clone https://github.com/kelsoncm/django-dsgovbr.git
   cd django-dsgovbr

   # Crie um ambiente virtual
   python -m venv .venv
   source ./venv/bin/activate  # Linux/Mac
   .\venv\Scripts\activate  # Windows

   # Instale as dependências de desenvolvimento
   pip install -e ".[dev]"

   pre-commit install --hook-type pre-push --hook-type pre-commit

   # Execute os testes
   python -m pytest

👥 Contribuindo
---------------

Contribuições são bem-vindas! Por favor:


#. Faça um Fork do projeto
#. Crie uma branch para sua feature (\ ``git checkout -b feature/MinhaFeature``\ )
#. Commit suas mudanças (\ ``git commit -m 'Adiciona MinhaFeature'``\ )
#. Push para a branch (\ ``git push origin feature/MinhaFeature``\ )
#. Abra um Pull Request
