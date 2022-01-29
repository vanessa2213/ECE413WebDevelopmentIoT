#ifndef _THERMOSTAT_H_
#define _THERMOSTAT_H_

#include "common.h"


typedef struct{
    int On;

}FanCmndStruct;

typedef struct{
    int Mode;
}ThermostatModeCmnd;

class CThermostat{
    enum STATE_T1{T_OFF,T_COOL, T_HEAT};
    
    enum STATE_F1{F_OFF, F_ON};
    

    public:
        CThermostat();
        void cmdProcessing(JSONValue cmdJson);
        void execute();
        void readDH11Values();

        float returnHumid();
        float returnTempCurr();

        String returnStatusStr();
        
    private:
        void resetCmd();
        void createStatusStr();
    
    private:
        STATE_T1 state_T1;
        STATE_F1 state_F1;

        FanCmndStruct fan_cmd;
        ThermostatModeCmnd ther_cmd;

        String status_str;

        float temp_curr;
        float temp_set;

        float humid;
        DHT dht11 = DHT(DHTPIN,DHTTYPE);
        
        
        
};



#endif