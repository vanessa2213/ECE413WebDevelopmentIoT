#ifndef _LEDCTRL_H_
#define _LEDCTRL_H_

#include "common.h"

class CLedCtrl {
public:
    CLedCtrl();
    void cmdProcessing(JSONValue cmdJson);
    void execute();
    String getStatusStr() {return statusStr;};
private:
    void createStatusStr();
private:
    enum STATE {S_OFF, S_ON};
    STATE state;

    int tick;
    int period;
    
    String statusStr;
};

#endif