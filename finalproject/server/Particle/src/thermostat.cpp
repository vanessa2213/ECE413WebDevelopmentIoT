#include "thermostat.h"

CThermostat::CThermostat(){
    state_T1 = CThermostat::T_OFF;
    resetCmd();
}

void CThermostat::cmdProcessing(JSONValue cmdJson){
    JSONObjectIterator iter(cmdJson);
    while(iter.next()){
        
        if (iter.name() == "on") {
            fan_cmd.On = (int)iter.value().toBool();
        }
        else if(iter.name()=="auto"){
            fan_cmd.On = 0;
        }
        else if(iter.name()== "off"){
            ther_cmd.Off = (int)iter.value().toBool();
        }
        else if(iter.name() == "cool"){
            ther_cmd.Cool = (int)iter.value().toBool();
        }
        else if(iter.name() == "heat"){
            ther_cmd.Heat = (int)iter.value().toBool();
        }

    }
}

void CThermostat::execute(){
    switch (state_T1)
    {
    case CThermostat::T_OFF:
        if(fan_cmd.On) state_F1 = CThermostat::F_ON;
        else state_F1 = CThermostat::F_OFF;
        if(ther_cmd.Cool){
            
            state_T1 = CThermostat::T_ON;
            state_T2 = CThermostat::T_COOL;
        }
        
        break;
    case CThermostat::T_ON:
        switch (state_T2)
        {
        case CThermostat::T_COOL:

            state_F1 = CThermostat::F_ON;
            if(ther_cmd.Heat) state_T2 = CThermostat::T_HEAT;
            
            break;
        
        case CThermostat::T_HEAT:
            if(fan_cmd.On) state_F1 = CThermostat::F_ON;
            else state_F1 = CThermostat::F_OFF;
            if(ther_cmd.Cool) state_T2 = CThermostat::T_COOL;
            break;
        
        default:
            break;
        }
        if(ther_cmd.Off) state_T1 = CThermostat::T_OFF;

        break;
    
    default:
        break;
    }
    resetCmd();
    createStatusStr();
}

void CThermostat::resetCmd() {
    fan_cmd.On = INVALID_CMD;
    
    ther_cmd.Cool = INVALID_CMD;
    ther_cmd.Heat = INVALID_CMD;
    ther_cmd.Off = INVALID_CMD;

    
}
void CThermostat::createStatusStr(){
    status_str = String::format("{\"T1\":%d,\"T2\":%d,\"F1\":%d}",
                                    state_T1,state_T2, state_F1);
}