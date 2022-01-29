#include "ledCtrl.h"

CLedCtrl::CLedCtrl() {
    state = S_OFF;
    period = TOGGLE_FREQUENCY * LOOP_FREQUENCY;
    tick = 0;
    statusStr = "{}";
}

void CLedCtrl::cmdProcessing(JSONValue cmdJson) {
    JSONObjectIterator iter(cmdJson);
    while (iter.next()) {
        if (iter.name() == "frequency") {
            period = (int)iter.value().toInt() * LOOP_FREQUENCY;
            tick = 0;
        }
    }
}

void CLedCtrl::execute() {
    // Your code here
    switch (state)
    {
    case CLedCtrl::S_OFF:
        if(++tick>=period){
            tick =0;
            digitalWrite(LED, HIGH);
            state = CLedCtrl::S_ON;
        }
        break;
    case CLedCtrl::S_ON:
        if(++tick>=period){
            tick = 0;
            digitalWrite(LED, LOW);
            state = CLedCtrl::S_OFF;
        }
        break;
    default:
        break;
    }

    // For debugging purpose
    createStatusStr();
}

void CLedCtrl::createStatusStr() {
    statusStr = String::format("{\"t\":%d,\"p\":%d,\"s\":%d}", tick, period, state);
}