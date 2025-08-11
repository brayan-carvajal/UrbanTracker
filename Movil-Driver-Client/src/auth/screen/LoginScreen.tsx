import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity,  Alert } from 'react-native';
// No se necesita useNavigation si esta pantalla no navega a "Crear Cuenta", etc.
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  // const navigation = useNavigation(); // Descomentar si navegas a otras partes post-login
  const [identificacion, setIdentificacion] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { setToken, token } = useAuth();

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
    if (!identificacion || !password) {
      Alert.alert('Campos incompletos', 'Por favor, ingresa tu usuario y contraseña.');
      return;
    }
    console.log('Validando credenciales para:', identificacion);
    // Lógica para validar con el backend...
    setToken(!token);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // MODIFICADO: Ahora muestra una alerta o guía al usuario
  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Para restablecer tu contraseña, por favor, contacta al administrador del sistema o a soporte técnico.',
      [{ text: 'Entendido' }]
    );
    // Opcional: Podrías dirigir a un chat de soporte o correo
    // Linking.openURL('mailto:soporte@tuempresa.com?subject=Solicitud de reseteo de contraseña');
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-7">
      <View className="mb-10 w-60 h-60">
        {/* Logo */}
        <Image
          // La ruta a tu logo. Asegúrate que sea la correcta.
          source={require('@/../assets/image.png')}
          className="h-full w-full" // Ajusta el tamaño como necesites
          resizeMode="contain"
        />
      </View>

      {/* Campo de Identificación */}
      <View className="mb-4 w-full">
        <Text className="mb-1 ml-4 text-gray-300">Identificación</Text>
        <TextInput
          keyboardType='numeric'
          placeholderTextColor="#a1a1aa" // Un gris un poco más visible
          className="rounded-full bg-zinc-800 px-5 py-3 text-white"
          placeholder="Ingresa tu credencial"
          value={identificacion}
          onChangeText={setIdentificacion}
        />
      </View>

      {/* Campo de Contraseña */}
      <View className="mb-2 w-full">
        <Text className="mb-1 ml-4 text-gray-300">Contraseña</Text>
        <View className="flex-row items-center rounded-full bg-zinc-800">
          <TextInput
            placeholderTextColor="#a1a1aa"
            className="flex-1 px-5 py-3 text-white" // `flex-1` para que ocupe el espacio disponible
            placeholder="Ingresa tu contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {/* Ícono del ojo para mostrar/ocultar */}
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="p-3" // Un área de toque más grande
          >
            {/* Aquí podrías usar un ícono en vez de texto si prefieres */}
            <Text className="font-bold text-gray-400">{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODIFICADO: Texto de ayuda para contraseña */}
      <TouchableOpacity onPress={handleForgotPassword} className="mb-6 w-full items-end pr-2">
        <Text className="text-sm text-blue-500">¿Necesitas ayuda?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity onPress={handleLogin} className="rounded-full bg-gray-200 py-4 px-16">
        <Text className="text-center text-lg font-bold text-black">Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;
