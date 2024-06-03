# Projeto Laravel com React (não tive tempo de fazer no symfony)

Este é um projeto Laravel integrado com React. Siga as instruções abaixo para configurar e iniciar o projeto em sua máquina local. Não fiz no symfony devido ao curto tempo que tive devido ao meu atual trabalho.

## Requisitos

Certifique-se de ter os seguintes softwares instalados na sua máquina:
- Git
- Composer
- Node.js e npm
- Laravel

## Instalação

### 1. Clonar o Repositório

Clone o repositório do projeto:
git clone https://github.com/Okamoto148/teste_intelia.git
cd teste_intelia

### 2. Instalar as dependências
npm install
composer install

### 3. Modificar o .env 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=intelia
DB_USERNAME=root
DB_PASSWORD=

### 4. Iniciar o banco de dados no xampp 
Inciar o mySql

### 5. Gerar a chave da aplicação e fazer a migration
php artisan key:generate
php artisan migrate

### 6. Compilar o front-end
npm run dev

### 7. Iniciar o servidor
php artisan serve


