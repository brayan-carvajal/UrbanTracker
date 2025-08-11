import { type MqttClient } from 'mqtt';

// Define los posibles estados de la conexión para tener un tipado estricto
export type MqttConnectionStatusType =
  | 'Conectado'
  | 'Desconectado'
  | 'Reconectando'
  | 'Error de conexión';

// Define la forma del objeto que nuestro contexto va a proveer
export interface MqttContextType {
  client: MqttClient | null;
  connectionStatus: MqttConnectionStatusType;
  publish: (topic: string, message: string) => void;
}
