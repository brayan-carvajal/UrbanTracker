import useAuth from '@/auth/hooks/useAuth';
import { useLocation } from '@/location/hooks/useLocation';
import useMqtt from '@/mqtt/hooks/useMqtt';
import { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // O la librería que prefieras

// --- Datos de ejemplo ---
const vehicleInfo = {
  placas: 'CUM-666',
  numeroInterno: '123-456',
};

const historyData = [
  { id: '1', fecha: '14/03/2025', inicio: '03:00', fin: '19:00' },
  { id: '2', fecha: '15/03/2025', inicio: '03:10', fin: '18:40' },
  { id: '3', fecha: '16/03/2025', inicio: '03:05', fin: '19:15' },
];

const HomeScreen = () => {
  // Estados para controlar si el trayecto está activo
  const [isTrayectoActivo, setIsTrayectoActivo] = useState(false);
  const [horaInicio, setHoraInicio] = useState('00:00');
  const { token, setToken } = useAuth();

  // Estado para controlar la visibilidad de la modal
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para los inputs de la modal
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Estados para la comunicación con el servidor
  const { connectionStatus, publish } = useMqtt();

  const handleToggleTrayecto = () => {
    if (!isTrayectoActivo) {
      // Iniciar trayecto
      const now = new Date();
      setHoraInicio(now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
    }
    setIsTrayectoActivo(!isTrayectoActivo);
  };

  // Obtenemos lo que necesitamos de cada contexto
  const { location, permissionStatus, requestLocation, isTracking, toggleTracking } = useLocation();

  // Este efecto se dispara CADA VEZ que la ubicación en el contexto cambia
  useEffect(() => {
    // Si tenemos una ubicación nueva y estamos conectados a MQTT, la publicamos
    if (location && connectionStatus === 'Conectado') {
      const locationPayload = JSON.stringify({
        lat: location.latitude,
        lon: location.longitude,
        timestamp: location.timestamp,
      });

      publish('user/123/location', locationPayload);
      console.log('Nueva ubicación publicada por cambio en el contexto.');
    }
  }, [location, connectionStatus, publish]); // Dependencias del efecto

  const handleClose = () => {
    setToken(!token);
  };

  const handleEnviarReporte = () => {
    if (!asunto || !descripcion) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos para enviar el reporte.');
      return;
    }
    // Aquí iría la lógica para enviar el reporte
    console.log('Reporte Enviado:', { asunto, descripcion });

    // Limpiar inputs y cerrar la modal
    setAsunto('');
    setDescripcion('');
    setModalVisible(false);

    Alert.alert('Reporte Enviado', 'Tu novedad ha sido enviada con éxito.');
  };

  return (
    <View className="flex-1 bg-black p-4">
      {/* --- Header --- */}
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-white">Ruta</Text>
        <TouchableOpacity onPress={handleClose}>
          <Icon name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Botón para pedir permiso de ubicación --- */}
        <TouchableOpacity onPress={requestLocation} className="mb-6 flex-row items-center justify-center rounded-xl p-4">
          <Icon name="map-marker" size={24} color="white" className="mr-3" />
          <Text className="text-lg font-bold text-white">
            {permissionStatus === 'denied' ? 'No se pudo obtener permiso' : 'Solicitar permiso'}
          </Text>
        </TouchableOpacity>

        <View className="mb-6 flex-row items-center justify-center rounded-xl p-4">
          <Icon name="map-marker-outline" size={24} color="white" className="mr-3" />
          <Text className="text-lg font-bold text-white">
            {location ? `Ubicación actual: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}` : 'No se ha encontrado la ubicación'}
          </Text>
        </View>

        {/* --- Botón para activar/desactivar tracking automático --- */}
        <TouchableOpacity 
          onPress={toggleTracking} 
          className={`mb-6 flex-row items-center justify-center rounded-xl p-4 ${
            isTracking ? 'bg-orange-600' : 'bg-blue-600'
          }`}>
          <Icon name={isTracking ? "pause" : "play"} size={24} color="white" className="mr-3" />
          <Text className="text-lg font-bold text-white">
            {isTracking ? 'Detener Tracking' : 'Iniciar Tracking'}
          </Text>
        </TouchableOpacity>


        {/* --- Botón Principal Dinámico --- */}
        <TouchableOpacity
          onPress={handleToggleTrayecto}
          // Cambia de color y texto según el estado
          className={`mb-6 flex-row items-center justify-center rounded-xl p-4 ${isTrayectoActivo ? 'bg-red-600' : 'bg-green-500'}`}>
          <Icon name="steering" size={24} color="white" className="mr-3" />
          <Text className="text-lg font-bold text-white">
            {isTrayectoActivo ? 'Finalizar Trayecto' : 'Iniciar Trayecto'}
          </Text>
        </TouchableOpacity>

        {/* --- Tarjeta de Horas --- */}
        <View className="mb-6 rounded-xl bg-zinc-900 p-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-gray-400">Hora de inicio</Text>
            <Text className="font-semibold text-white">
              {isTrayectoActivo ? horaInicio : '00:00'}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Hora final</Text>
            <Text className="font-semibold text-white">
              {isTrayectoActivo ? 'En curso...' : '00:00'}
            </Text>
          </View>
        </View>

        {/* --- Tarjeta de Información del Vehículo --- */}
        <View className="mb-6 rounded-xl bg-zinc-900 p-4">
          <Text className="mb-3 text-sm font-bold text-gray-300">INFORMACIÓN DEL VEHÍCULO</Text>
          <View className="mb-3 border-b border-zinc-700 pb-3">
            <Text className="text-gray-400">Placas</Text>
            <Text className="text-base font-semibold text-white">{vehicleInfo.placas}</Text>
          </View>
          <View>
            <Text className="text-gray-400">Número interno</Text>
            <Text className="text-base font-semibold text-white">{vehicleInfo.numeroInterno}</Text>
          </View>
        </View>

        {/* --- Tarjeta de Historial de Recorridos --- */}
        <View className="mb-6 rounded-xl bg-zinc-900 p-4">
          <Text className="mb-3 text-sm font-bold text-gray-300">HISTORIAL DE RECORRIDOS</Text>
          {historyData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`py-3 ${index < historyData.length - 1 ? 'border-b border-zinc-700' : ''}`}>
              <Text className="font-semibold text-white">{item.fecha}</Text>
              <Text className="text-gray-400">
                {item.inicio} - {item.fin}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- Botón Secundario de Reportes --- */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)} // Cambia el estado a true
        className="mt-2 flex-row items-center justify-center rounded-xl bg-zinc-800 p-4">
        <Icon name="alert-circle-outline" size={22} color="#9ca3af" className="mr-3" />
        <Text className="text-base font-bold text-gray-300">Reportar una novedad</Text>
      </TouchableOpacity>

      {/* --- AQUI EMPIEZA LA MODAL --- */}
      <Modal
        animationType="slide" // Puede ser "slide", "fade", o "none"
        transparent={true} // Importante para que el fondo se vea translúcido
        visible={modalVisible} // Controlado por el estado
        onRequestClose={() => {
          // Para el botón de "atrás" en Android
          setModalVisible(!modalVisible);
        }}>
        {/* Contenedor que centra el contenido de la modal y oscurece el fondo */}
        <View className="flex-1 items-center justify-center bg-black/50">
          {/* La caja blanca de la modal */}
          <View className="w-11/12 rounded-2xl bg-zinc-900 p-6 shadow-lg">
            <Text className="mb-4 text-xl font-bold text-white">Crear Reporte</Text>

            {/* Input para el Asunto */}
            <Text className="mb-1 text-gray-400">Asunto</Text>
            <TextInput
              className="mb-4 rounded-lg bg-zinc-800 p-3 text-white"
              placeholder="Ej: Falla mecánica, Tráfico inesperado"
              placeholderTextColor="#6b7280"
              value={asunto}
              onChangeText={setAsunto}
            />

            {/* Input para la Descripción */}
            <Text className="mb-1 text-gray-400">Descripción</Text>
            <TextInput
              className="text-top h-24 rounded-lg bg-zinc-800 p-3 text-white"
              placeholder="Describe la novedad detalladamente..."
              placeholderTextColor="#6b7280"
              multiline={true}
              textAlignVertical="top" // Para que el texto empiece arriba en Android
              value={descripcion}
              onChangeText={setDescripcion}
            />

            {/* Contenedor para los botones */}
            <View className="mt-6 flex-row justify-end">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setAsunto('');
                  setDescripcion('');
                }} // Botón para cerrar
                className="mr-2 px-4 py-2">
                <Text className="font-semibold text-gray-400">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEnviarReporte}
                className="rounded-lg bg-green-600 px-6 py-2">
                <Text className="font-bold text-white">Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
