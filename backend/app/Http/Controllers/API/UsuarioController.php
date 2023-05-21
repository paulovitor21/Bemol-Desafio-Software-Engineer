<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function getAll(){
        $data = Usuario::get();
        return response()->json($data, 200);
      }
    
      public function create(Request $request){
        $data['nome'] = $request['nome'];
        $data['data_nascimento'] = $request['data_nascimento'];
        $data['cep'] = $request['cep'];
        Usuario::create($data);
        return response()->json([
            'message' => "Criado com sucesso!",
            'success' => true
        ], 200);
      }

      public function delete($id){
        $res = Usuario::find($id)->delete();
        return response()->json([
            'message' => "Apagado com sucesso!",
            'success' => true
        ], 200);
      }

      public function get($id){
        $data = Usuario::find($id);
        return response()->json($data, 200);
      }

      public function update(Request $request,$id){
        $data['nome'] = $request['nome'];
        $data['data_nascimento'] = $request['data_nascimento'];
        $data['cep'] = $request['cep'];
        Usuario::find($id)->update($data);
        return response()->json([
            'message' => "Atualizado com sucesso!",
            'success' => true
        ], 200);
      }

}
