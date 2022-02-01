#ifndef _THERMOSTAT_H_
#define _THERMOSTAT_H_

#include "common.h"


typedef struct{
    int On;

}FanCmndStruct;

typedef struct{
    int Off;
    int Cool;
    int Heat;
}ThermostatModeCmnd;

class CThermostat{
    enum STATE_T1{T_OFF, T_ON};
    enum STATE_T2{T_COOL, T_HEAT};
    
    enum STATE_F1{F_ON, F_OFF};
    

    public:
        CThermostat();
        void cmdProcessing(JSONValue cmdJson);
        void execute();
    
    private:
        void resetCmd();
        void createStatusStr();
    
    private:
        STATE_T1 state_T1;
        STATE_T2 state_T2;
        STATE_F1 state_F1;

        FanCmndStruct fan_cmd;
        ThermostatModeCmnd ther_cmd;

        String status_str;
        
};



#endif