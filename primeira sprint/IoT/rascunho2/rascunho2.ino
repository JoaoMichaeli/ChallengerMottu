#include <WiFi.h>

// Substitua pelas credenciais da sua rede Wi-Fi
const char* ssid = "Joao";
const char* password = "joao1234";

// Criação do servidor web na porta 80
WiFiServer server(80);

// Variável para armazenar o conteúdo HTTP recebido
String header;

// Estado atual do LED
String ledState = "off";

// Pino do LED
const int ledPin = 2;

// Controle de timeout da conexão
unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);  // Inicialmente desligado

  // Conectar ao Wi-Fi
  Serial.print("Conectando-se a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado.");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  // Iniciar o servidor
  server.begin();
}

void loop() {
  WiFiClient client = server.available(); // Espera por clientes

  if (client) {
    currentTime = millis();
    previousTime = currentTime;
    Serial.println("Novo cliente conectado.");
    String currentLine = "";

    while (client.connected() && currentTime - previousTime <= timeoutTime) {
      currentTime = millis();

      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;

        if (c == '\n') {
          if (currentLine.length() == 0) {
            // Enviar cabeçalho da resposta HTTP
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // Controle do LED via rota
            if (header.indexOf("GET /led/on") >= 0) {
              Serial.println("LED LIGADO");
              ledState = "on";
              digitalWrite(ledPin, HIGH);
            } else if (header.indexOf("GET /led/off") >= 0) {
              Serial.println("LED DESLIGADO");
              ledState = "off";
              digitalWrite(ledPin, LOW);
            }

            // Página HTML
            client.println("<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<style>body{font-family:Arial;text-align:center;} .button{padding:16px;font-size:20px;margin:10px;} .on{background:#4CAF50;color:white;} .off{background:#f44336;color:white;}</style></head><body>");
            client.println("<h2>Controle de LED - ESP32</h2>");
            client.println("<p>LED está <strong>" + ledState + "</strong></p>");

            if (ledState == "off") {
              client.println("<a href=\"/led/on\"><button class=\"button on\">Ligar LED</button></a>");
            } else {
              client.println("<a href=\"/led/off\"><button class=\"button off\">Desligar LED</button></a>");
            }

            client.println("</body></html>");
            client.println();
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }

    // Limpa variáveis e desconecta
    header = "";
    client.stop();
    Serial.println("Cliente desconectado.");
  }
}
