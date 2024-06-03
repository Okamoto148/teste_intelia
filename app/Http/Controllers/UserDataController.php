<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserData extends Model
{
    use HasFactory;

    // Defina a tabela associada ao model
    protected $table = 'user_data';

    // Defina os atributos que podem ser preenchidos em massa
    protected $fillable = [
        'name', 
        'birthday', 
        'cep', 
        'rua', 
        'numero', 
        'cidade', 
        'estado', 
        'telefone', 
        'celular'
    ];
}

class UserDataController extends Controller
{
    // Definindo o modelo UserData fora das funções
    private $userDataModel;

    public function __construct(UserData $userDataModel)
    {
        $this->userDataModel = $userDataModel;
    }

    // Função para criar um novo registro de UserData
    public function store(Request $request)
    {
        try {
            $requestData = $request->all();

            Log::info('Dados recebidos no endpoint /userdata: ' . json_encode($requestData));

            $userData = $this->userDataModel->create($requestData);

            return response()->json(['id' => $userData->id], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar UserData: ' . $e->getMessage());

            return response()->json(['error' => 'Erro interno do servidor'], 500);
        }
    }

    public function show($id)
    {
        try {
            $userData = $this->userDataModel->findOrFail($id);
            return response()->json($userData);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar UserData: ' . $e->getMessage());

            return response()->json(['error' => 'Usuário não encontrado'], 404);
        }
    }
}
