#include <WiFi.h>
#include <HTTPClient.h>

// Configurações de Wi-Fi
const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";

// URL do servidor com parâmetro da moto
const char* serverUrl = "";

// Identificador da moto
const char* motoID = "MOTO_ID";

// Pino do LED
const int LED_PIN = 2;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConectado ao Wi-Fi!");

  // Enviar requisição ao servidor
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(serverUrl) + "?id=" + motoID;
    http.begin(url);
    int httpCode = http.GET();

    if (httpCode == 200) {
      String resposta = http.getString();
      Serial.println("Resposta do servidor: " + resposta);

      if (resposta == "ATIVAR") {
        // Ativar alerta com LED
        digitalWrite(LED_PIN, HIGH);
        delay(5000); // LED aceso por 5 segundos
        digitalWrite(LED_PIN, LOW);
      }
    }

    http.end();
  }

  // Aguardar antes da próxima verificação
  delay(60000); // 60 segundos
}

void loop() {
  setup();
}
