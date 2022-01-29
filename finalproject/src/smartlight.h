#ifndef _SMART_LIGHT_H_
#define _SMART_LIGHT_H_

#include "common.h"



typedef struct {
    int On;            // false: off, true: on 
    int Auto;          // false: manual, true: auto
    int Brightness;      // 0 ~ 100
} SmartLightCmdStruct;


class CSmartLight {
    enum STATE_L0 { S_OFF, S_ON };
    enum STATE_L1 { S_MANUAL, S_AUTO };
    
public:
    CSmartLight();
    
    void cmdProcessing(JSONValue cmdJson);

    void execute();
    
    int getSensorVal();
    void readSensorVal();
    String getStatusStr() ;
    String getColor();
private:
    void resetCmd();
    void turnOffLight();
    void changeColor(int red, int blue, int green);
    void updateBrightnessManually(int val);
    void updataBrightnessAutomatically();
    void createStatusStr();
    void createColorString();
private:
    STATE_L0 state_L0;
    STATE_L1 state_L1;
    int brightness;
    int sensorVal;
    int sensorMax;
    int sensorMin;

    int RValueLight;
    int GValueLight;
    int BValueLight; 

    SmartLightCmdStruct cmd;
    String statusStr;
    String colorLightRGB;
};


#endif