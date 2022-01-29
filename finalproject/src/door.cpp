
#include "door.h"

CDoor::CDoor(){
    state_door = CDoor::CLOSE;
    
    sensorMax = LIGHT_SENSOR_MAX;
    sensorMin = LIGHT_SENSOR_MIN;

}

void CDoor::readSensorVal(){
    sensorVal = analogRead(DOOR_SENSOR);
}

int CDoor::getSensorVal(){
    return sensorVal;
}


void CDoor::updateAmountOfLight(){
    readSensorVal();
    int curSensorVal = getSensorVal();
    if (curSensorVal < sensorMin) curSensorVal = sensorMin;
    if (curSensorVal > sensorMax) curSensorVal = sensorMax;
    double amountOfLight = (double)(curSensorVal-sensorMin) / (double)(sensorMax-sensorMin);


}

void CDoor::execute(){
    switch (state_door)
    {
    updateAmountOfLight();
    case CDoor::CLOSE:
        statusDoor = "CLOSE";
        if(amountOfLight >= 0.5) state_door = CDoor::OPEN;
        break;
    case CDoor::OPEN:
        statusDoor = "OPEN";
        if(amountOfLight < 0.5) state_door = CDoor::CLOSE;
        break;
    
    default:
        break;
    }


}

String CDoor::getStatusDoor(){
    return statusDoor;
}