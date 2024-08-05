<?php
require_once 'conexion.php';


class usuario extends Conexion
{
    public $user_id;
    public $user_nombre;
    public $user_telefono;
    public $user_correo;
    public $user_situacion;


    public function __construct($args = [])
    {
        $this->user_id = $args['user_id'] ?? null;
        $this->user_nombre = $args['user_nombre'] ?? '';
        $this->user_telefono = $args['user_telefono'] ?? '';
        $this->user_correo = $args['user_correo'] ?? '';
        $this->user_situacion = $args['user_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO userentes (user_nombre, user_telefono, user_correo) values ('$this->user_nombre','$this->user_telefono', '$this->user_correo')";
         echo  json_encode($sql); 
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from usuarios where user_situacion = 1 ";

        if ($this->user_nombre != '') {
            $sql .= " and user_nombre like '%$this->user_nombre%' ";
        }

        if ($this->user_telefono != '') {
            $sql .= " and user_telefono like '%$this->user_telefono%' ";
        }

        if ($this->user_correo != '') {
            $sql .= " and user_correo like '%$this->user_correo%' ";
        }

        if ($this->user_id != null) {
            $sql .= " and user_id = '$this->user_id' ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

}
