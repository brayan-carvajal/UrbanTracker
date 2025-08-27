package com.sena.urbantracker.service;

import com.sena.urbantracker.DTO.UserDTO;
import com.sena.urbantracker.DTO.UserViewDTO;
import com.sena.urbantracker.DTO.ResponseDTO;
import com.sena.urbantracker.model.Role;
import com.sena.urbantracker.model.User;
import com.sena.urbantracker.repository.IRole;
import com.sena.urbantracker.repository.IUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final IUser iUser;

    private final IRole iRole;

    public List<UserViewDTO> getAllUsers() {
        return iUser.getAll();
    }

    //busca el user por el id
    public Optional<User> findById(int id) {
        return iUser.findById(id);
    }

    //borra el user segun el id
    public ResponseDTO deleteUser(int id) {
        Optional<User> userOpt = findById(id);
        if (!userOpt.isPresent()) {
            return new ResponseDTO("El user no existe", HttpStatus.NOT_FOUND.toString());
        }
        iUser.deleteById(id);
        return new ResponseDTO("user eliminado correctamente", HttpStatus.OK.toString());
    }

    // Guarda el user si el id es null/0, si es mayor lo actualiza
    public ResponseDTO save(UserDTO userDTO) {
        try {


            // 🔹 Validaciones de userName
            if (!StringUtils.hasText(userDTO.getUserName())) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El nombre del usuario no puede ser nulo o vacío.");
            }

            if (userDTO.getUserName().length() > 50) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El nombre del usuario no puede superar los 50 caracteres.");
            }

            if (!userDTO.getUserName().matches("^[a-zA-Z0-9_\\s]+$")) { // puedes permitir letras/números
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El nombre solo puede contener letras, números y guiones bajos.");
            }

            // 🔹 Validación de contraseña
            if (!StringUtils.hasText(userDTO.getPassword())) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "La contraseña no puede ser nula o vacía.");
            }

            if (userDTO.getPassword().length() < 6) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "La contraseña debe tener al menos 6 caracteres.");
            }

            // 🔹 Validar rol
            if (userDTO.getRole() == null || userDTO.getRole() <= 0) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "Debe seleccionar un rol válido.");
            }

            Role role = iRole.findById(userDTO.getRole())
                    .orElse(null);

            if (role == null) {
                throw new IllegalArgumentException("El rol con ID " + userDTO.getRole() + " no existe.");
            }

            //Validar duplicados (solo si es nuevo)
            if ((userDTO.getId() == null || userDTO.getId() == 0) &&
                    iUser.existsByUserName(userDTO.getUserName())) {
                return new ResponseDTO(HttpStatus.CONFLICT.toString(),
                        "Ya existe un usuario con ese nombre.");
            }

            // 🔹 Crear o actualizar
            User user;
            if (userDTO.getId() == null || userDTO.getId() == 0) {
                // Nuevo
                user = convertToModel(userDTO);
            } else {
                // Actualización
                Optional<User> existingUser = iUser.findById(userDTO.getId());
                if (!existingUser.isPresent()) {
                    return new ResponseDTO(HttpStatus.NOT_FOUND.toString(),
                            "El usuario con el ID proporcionado no existe.");
                }
                user = convertToModel(userDTO);
            }

            // 🔹 Guardar
            iUser.save(user);

            return new ResponseDTO(HttpStatus.OK.toString(),
                    "El usuario se guardó correctamente.");
        } catch (Exception e) {
            return new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                    "Error al guardar el usuario: " + e.getMessage());
        }
    }

    // Convertir de Entity a DTO
    public UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole() != null ? user.getRole().getId() : null
        );
    }

    // Convertir de DTO a Entity
    public User convertToModel(UserDTO userDTO) {
        Role role = iRole.findById(userDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        return User.builder()
                .id(userDTO.getId()) // null si es nuevo
                .userName(userDTO.getUserName())
                .password(userDTO.getPassword())
                .role(role)
                .build();
    }

}
