/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "c:/Users/vane_/Desktop/WebDevelopmentIoT/Lecture10_27/Photon/src/Photon.ino"
/*
 * Project Photon
 * Description: Toggle LED (D7) and change color of the RGB LED
 * Author: 
 * Date:
 */

void setup();
void loop();
#line 8 "c:/Users/vane_/Desktop/WebDevelopmentIoT/Lecture10_27/Photon/src/Photon.ino"
SYSTEM_THREAD(ENABLED); // uncomment this to use your particle device without WIFI connection


int counter = 0;
int LED = D7;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  pinMode(LED, OUTPUT);
  RGB.control(true);  // take control of the RGB LED
  Serial.begin(); //initialize serial communication
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  if (counter % 2 == 0) {
    digitalWrite(LED, HIGH);
    RGB.color(255, 0, 0); // set color red
  }
  else { 
    digitalWrite(LED, LOW);
    RGB.color(0, 255, 0); // set color green
  }
  counter++;
  Serial.printf("{\"t\":%d,\"str\":\"%s\"}", (int)Time.now(), Time.timeStr().c_str());
  Serial.println();
  delay(1000);
}