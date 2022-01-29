#include "thermostat.h"
#include "common.h"

CThermostat::CThermostat(){
    state_T1 = CThermostat::T_OFF;
    state_F1 = CThermostat::F_OFF;
    status_str = "{}";
    
    dht11.begin();
    readDH11Values();
    resetCmd();
}

void CThermostat::cmdProcessing(JSONValue cmdJson){
    JSONObjectIterator iter(cmdJson);
    while(iter.next()){
        
        if (iter.name() == "on") {
            fan_cmd.On = (int)iter.value().toBool();
        }
        else if(iter.name()== "off"){
            
            ther_cmd.Mode = (int)iter.value().toInt();
        }
        else if(iter.name() == "cool"){
    
            ther_cmd.Mode = (int)iter.value().toInt();
        }
        else if(iter.name() == "heat"){
            
            ther_cmd.Mode = (int)iter.value().toInt();
        }
        else if(iter.name() == "set"){                                                               
            temp_set = (double)iter.value().toDouble();
        }

    }
}

void CThermostat::execute(){
    readDH11Values();
    switch (state_T1)
    {
    case CThermostat::T_OFF:
        if(fan_cmd.On) state_F1 = CThermostat::F_ON;
        else state_F1 = CThermostat::F_OFF;
        if((ther_cmd.Mode == CThermostat::T_COOL) || (temp_curr > temp_set))state_T1 = CThermostat::T_COOL;
        
        else if((ther_cmd.Mode == CThermostat::T_HEAT ) || (temp_curr < temp_set))state_T1 = CThermostat::T_HEAT;
        
        
        break;
    
    case CThermostat::T_COOL:

        state_F1 = CThermostat::F_ON;
        
        if(ther_cmd.Mode == CThermostat::T_HEAT ) state_T1 = CThermostat::T_HEAT;
        else if(temp_curr <= temp_set) state_T1 = CThermostat::T_OFF;
        
        break;
    
    case CThermostat::T_HEAT:
        if(fan_cmd.On) state_F1 = CThermostat::F_ON;
        else state_F1 = CThermostat::F_OFF;

        if(ther_cmd.Mode == CThermostat::T_COOL) state_T1 = CThermostat::T_COOL;
        else if(temp_curr >= temp_set) state_T1 = CThermostat::T_OFF;

        break;
    
    default:
        break;
        
        

        
    }
    resetCmd();
    createStatusStr();
}

void CThermostat::resetCmd() {
    fan_cmd.On = 0;
    
    ther_cmd.Mode = 0;

    
}

float CThermostat::returnHumid(){
    return humid;

}

float CThermostat::returnTempCurr(){
    return temp_curr;

}


void CThermostat::readDH11Values(){
    temp_curr = dht11.readTemperature(true);; //Read temp from sensor in 
    humid  = dht11.readHumidity();; //Read humidity from sensor
  
}
void CThermostat::createStatusStr(){
    status_str = String::format("{\"T1\":%d,\"F1\":%d,\"Temp\":%f,\"Humid\":%f}",
                                    state_T1, state_F1,temp_curr,humid);
}

String CThermostat::returnStatusStr(){
    return status_str;
}