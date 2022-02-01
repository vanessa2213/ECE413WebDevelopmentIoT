/*
 * Project smartlight
 * Description: In-class activity - Smart Light Example
 * Author: Anthony Hazou
 * Date: 11/3/2021
 */
// Please configure your project
// From the Command Palette 
//   1. select Particle: Configure Project for Device
//   2. the device OS version you'd like to build for: (use 2.2.0)
//   3. the type of device to you'd like to build for (i.e., select your device - Argon or Photon)
//   4. the name or device ID of the device you want to flash to. Just leave this blank

#include "common.h"
#include "smartlight.h"
#include "toggleLed.h"
//libraries for DHT11 sensor
#include <Adafruit_DHT.h>
#include <Unified_Sensors.h>
#define DHTPIN D2 //define DHT11 pin

SYSTEM_THREAD(ENABLED); 

// global variables
CSmartLight smartLight;
CToggleLed toggleLed;
DHT dht11 = DHT(DHTPIN,DHT11);
double temp = 0;
double humidity = 0;
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
    if (iter.name() == "smartlight") {
      smartLight.cmdProcessing(iter.value());
    }
    else if (iter.name() == "led") {
      toggleLed.cmdProcessing(iter.value());
    }
  }
}

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  pinMode(LED, OUTPUT);
  RGB.control(true);
  RGB.color(255, 255, 255);   // default color
  Serial.begin();
  dht11.begin(); //start DHT11
  counter = 0;
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  unsigned long t = millis();

  serialCmdProcessing();
  smartLight.execute();
  toggleLed.execute();
  temp = dht1.getTempFarenheit(); //Read temp from sensor in F
  humidity  = dht1.getHumidity(); //Read humidity from sensor
  
  unsigned long period = millis() - t;


  if (counter % (SERAIL_COMM_FREQUENCY * LOOP_FREQUENCY) == 0) {
    counter = 0;
    Serial.printf("{\"t\":%d,\"light\":%s,\"led\":%s,\"ct\":%ld}", 
      (int)Time.now(), smartLight.getStatusStr().c_str(), toggleLed.getStatusStr().c_str(),
      period
    );
    Serial.println();
  }
  counter++;
  
  period = PERIOD - (millis() - t);
  if (period > 0) delay(period);  
}