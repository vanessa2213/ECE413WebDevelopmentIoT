#ifndef _DOOR_H_
#define _DOOR_H_

#include "common.h" 

typedef struct{
    String DoorStatus;
}Door;

class CDoor{
    enum State_D{CLOSE, OPEN};
    
    public:
        CDoor();
        void execute();
        
        int getSensorVal();
        void readSensorVal();

        String getStatusDoor();
    
    private:
        void updateAmountOfLight();

    private:
        State_D state_door;
        
        double amountOfLight;
        int sensorVal;
        int sensorMax;
        int sensorMin;

        String statusDoor;

};


#endif