<?php
require '../../models/usuario.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_POST['tipo'] ?? null;

try {
    $usuario = new usuario($_POST);

    switch ($metodo) {
        case 'POST':
            switch ($tipo) {
                case '1':
                    $ejecucion = $usuario->guardar();
                    $mensaje = "Guardado correctamente";
                    $codigo = 1;
                    break;
                default:
                    throw new Exception("Tipo de acción no válido");
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => $codigo,
            ]);
            break;
        case 'GET':
            http_response_code(200);
            $usuario = new usuario($_GET);
            $usuarios = $usuario->buscar();
            echo json_encode($usuarios);
            break;
        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}
