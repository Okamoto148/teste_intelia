<?php

// Namespace para controladores da aplicação
namespace App\Http\Controllers;

// Importa classes necessárias
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Classe UserData representando o modelo de dados do usuário, eu sei que não é uma boa prática, mas devido a um erro
//no meu computador pessoal e ao pouco tempo que tive para realizar este projeto devido atividades no trabalho atual
//precisei realizar o projeto no Replit que é um IDE online com ambientes pré prontos apresentava erro na importação do model
class UserData extends Model
{
  // Habilita a criação de fábricas de modelos para geração de dados de teste
  use HasFactory;

  // Define a tabela associada ao modelo (user_data)
  protected $table = 'user_data';

  // Define os atributos que podem ser preenchidos em massa
  protected $fillable = [
    'name',  // Nome do usuário
    'birthday', // Data de nascimento
    'cep',   // CEP do usuário
    'rua',    // Rua do usuário
    'numero', // Número do endereço
    'cidade', // Cidade do usuário
    'estado', // Estado do usuário
    'telefone', // Telefone do usuário
    'celular',  // Celular do usuário
  ];
}

// Classe UserDataController para lidar com requisições HTTP relacionadas a dados do usuário
class UserDataController extends Controller
{
  // Propriedade privada para armazenar o modelo UserData injetado
  private $userDataModel;

  // Construtor para receber o modelo UserData por injeção de dependência
  public function __construct(UserData $userDataModel)
  {
    $this->userDataModel = $userDataModel;
  }

  // Função para criar um novo registro de UserData
  public function store(Request $request)
  {
    try {
      // Extrai todos os dados da requisição
      $requestData = $request->all();

      // Registra os dados recebidos no endpoint /userdata
      Log::info('Dados recebidos no endpoint /userdata: ' . json_encode($requestData));

      // Cria um novo objeto UserData usando o modelo e os dados da requisição
      $userData = $this->userDataModel->create($requestData);

      // Retorna uma resposta JSON com o ID do UserData criado e código de status 201 (Criado)
      return response()->json(['id' => $userData->id], 201);
    } catch (\Exception $e) {
      // Registra a mensagem de erro
      Log::error('Erro ao criar UserData: ' . $e->getMessage());

      // Retorna uma resposta JSON com mensagem de erro genérica e código de status 500 (Erro interno do servidor)
      return response()->json(['error' => 'Erro interno do servidor'], 500);
    }
  }

  // Função para buscar um registro de UserData específico
  public function show($id)
  {
    try {
      // Busca o registro UserData pelo ID usando o método findOrFail
      $userData = $this->userDataModel->findOrFail($id);

      // Retorna uma resposta JSON com o objeto UserData encontrado
      return response()->json($userData);
    } catch (\Exception $e) {
      // Registra a mensagem de erro
      Log::error('Erro ao buscar UserData: ' . $e->getMessage());

      // Retorna uma resposta JSON com mensagem de erro específica e código de status 404 (Não encontrado)
      return response()->json(['error' => 'Usuário não encontrado'], 404);
    }
  }
}
