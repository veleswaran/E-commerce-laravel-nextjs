<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserServices{
    public $user;

    public function __construct(){
        $this->user = New User();
    }

    public function getUsers(){
        return $this->user->get(); 
    }

    public function getUser($id){
        return $this->user->find($id);
    }

    public function insertUser(object $user){
        $validator = Validator::make($user->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'], 
            'profile' => ['nullable', 'file'], 
        ]);
    
        if ($validator->fails()) {
            return ["error"=>$validator->errors()];
            
        }
        $user = $this->user->create([
            'name' => $user->name,
            'email' => $user->email,
            'password' => Hash::make($user->password),
        ]);

        return ["user"=>$user];
    }

    public function updateUser(object $user_data,string $id){
        $users = $this->user->get();
        $user = $this->user->find($id);
        
        if (!$user) {
            return ["error" => "User not found"];
        }
    
        // Check if the email already exists in other users
        foreach ($users as $existingUser) {
            if ($existingUser->email == $user_data->email) {
                if ($existingUser->id != $user->id) {
                    return ["error" => "Email already exists"];
                }
            }
        }
    
        // Update the user
        $user->name = $user_data->name;
        $user->email = $user_data->email;
        $user->password = Hash::make($user_data->password);
        $user->save();
    
        return ["user" => $user];
    }


  
    public function deleteUser($id){
        $user=$this->user->find($id);
        $user->delete();
        return true;
    }

}

