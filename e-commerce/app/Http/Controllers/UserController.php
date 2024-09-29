<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserServices;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public $user_service;

    public function __construct(UserServices $userService)
    {
        $this->user_service = $userService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["users"=>$this->user_service->getUsers()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $this->user_service->insertUser($request);
        if (array_key_exists('error', $user) && is_array($user["error"])) {
            return response()->json([
                "message" => "User added not successfully",
                "error" => $user["error"]
            ], 403);
        }
    
        return response()->json([
            "message" => "User added successfully",
            "user" => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if($this->user_service->getUser($id)){
            return $this->user_service->getUser($id);
        }
        return json_encode(["message"=>"user not fond"]);
      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // return "veleswaran";
        $user = $this->user_service->updateUser($request,$id);
        if (array_key_exists('error', $user)) {
            return response()->json([
                "message" => "User added not successfully",
                "error" => $user["error"]
            ], 403);
        }
    
        return response()->json([
            "message" => "User updated successfully",
            "user" => $user
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if($this->user_service->deleteUser($id)){
            return response()->json(["message"=>"user $id deleted successfully"]);
        }
        return response()->json(["message"=>"user is not found"]);
    }
}
