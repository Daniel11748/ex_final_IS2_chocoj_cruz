<?php include_once '../../includes/header.php' ?>

<div class="container">
    <h1 class="text-center">Formulario de Usuarios</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-10 border bg-light p-3">
            <input type="hidden" name="user_id" id="user_id">
            <div class="row mb-3">
                <div class="col">
                    <label for="github_usuario">Nombre de Usuario de GitHub</label>
                    <input type="text" name="github_usuario" id="github_usuario" class="form-control" placeholder="Ingresa el nombre de usuario de GitHub">
                    <button type="button" id="buscarUsuario" class="btn btn-primary mt-2">
                        Buscar Usuario
                    </button>
                </div>
                <div class="col">
                    <label for="user_nombre">Nombre Real del Usuario</label>
                    <input type="text" name="user_nombre" id="user_nombre" class="form-control" required readonly>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="user_pais">País</label>
                    <select name="user_pais" id="user_pais" class="form-control" required>
                        <option value="">Selecciona un país</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="user_codigo">Codigo</label>
                    <input type="text" name="user_codigo" id="user_codigo" class="form-control" required>
                </div>
                <div class="col">
                    <label for="user_telefono">Teléfono</label>
                    <input type="text" name="user_telefono" id="user_telefono" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="user_correo">Correo Electrónico</label>
                    <input type="text" name="user_correo" id="user_correo" class="form-control" required>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-success w-100">Guardar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de Usuarios</h2>
            <table class="table table-bordered table-hover bg-light" id="tablaUsuarios">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4">No hay Clientes registrados</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script defer src="../../src/js/funciones.js"></script>
<script defer src="../../src/js/usuarios/script.js"></script>

<?php include_once '../../includes/foother.php' ?>