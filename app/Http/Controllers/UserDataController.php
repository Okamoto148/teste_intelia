<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserData;

class UserDataController extends Controller
{
    // Função para criar um novo registro de UserData
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'birthday' => 'required|date',
            'cep' => 'required|string|max:8',
            'rua' => 'required|string|max:255',
            'numero' => 'required|integer',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'celular' => 'required|string|max:20',
        ]);

        $userData = UserData::create($validatedData);

        return response()->json(['id' => $userData->id], 201);
    }

    
    public function show($id)
    {
        $userData = UserData::findOrFail($id);
        return response()->json($userData);
    }
}
