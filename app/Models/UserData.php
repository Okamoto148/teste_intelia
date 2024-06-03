namespace App\Models;

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
