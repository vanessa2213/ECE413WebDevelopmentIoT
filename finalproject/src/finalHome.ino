#include "common.h"
#include "thermostat.h"
#include "smartlight.h"
#include "door.h"

SYSTEM_THREAD(ENABLED); 
//global variables
CThermostat thermostat;
CSmartLight light;
CDoor door;

int counter;

void serialCmdProcessing() {
  if (Serial.available() <= 0) return;
  String cmdStr = "";
  while (Serial.available()) {
      char c = Serial.read();
      cmdStr += String(c);
  }
  JSONValue cmdJson = JSONValue::parseCopy(cmdStr.c_str());
  JSONObjectIterator iter(cmdJson);
  while (iter.next()) {
    if (iter.name() == "Fan" || iter.name() == "Thermostat" ||  iter.name() == "Temperature" ) {
      thermostat.cmdProcessing(iter.value());
    }
  }
}


// setup() runs once, when the device is first turned on.
void setup() {
  
  Serial.begin();
  Serial.println("Hi");
  CThermostat();
  CSmartLight();
  CDoor();
  counter = 0;
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  unsigned long t = millis();

  serialCmdProcessing();
  thermostat.execute();
  light.execute();
  door.execute();

  unsigned long period = millis() - t;
  
  if (counter % (SERAIL_COMM_FREQUENCY * LOOP_FREQUENCY) == 0) {
    counter = 0;
    
    Serial.printf("{\"Thermostat\":%s}", 
        thermostat.returnStatusStr().c_str()
      );
    Serial.println();
    Serial.printf("{\"SmartLight\":%s}", 
        light.getColor().c_str()
      );
    Serial.println();
    Serial.printf("{\"Door\":%s}", 
        light.getStatusStr().c_str()
      );
      Serial.println();
  }

  period = PERIOD - (millis() - t);
  if (period > 0) delay(period);  
  
  
}