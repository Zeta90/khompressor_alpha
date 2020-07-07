class InputCollector {

    static CollectorTemplates() {
        switch (Device.settings.selected_template) {
            case 0: //  STEP
                this.CollectDataFromSteps();
                break;
            case 1:
                this.CollectDataFromSaw();
                break;
            case 2:
                this.SineEnvelope_template();
                break;
            case 3:
                this.MechEnvelope_template();
                break;
        }

    }

    static CollectDataFromSteps() {
        var device_settings = Device.settings;
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = device_settings.SYSTEM_DELTA_T;
        var simulation_steps = simulation_time / delta_t;

        var max_trolley_x = device_settings.max_trolley_x;
        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];
        var knob3 = device_settings.knob_seconds[3];

        var i = 0;
        var offset_steps = parseInt(knob0 / delta_t);
        var cutoff = 0;
        var cdown = 0;

        device_settings.y = [];
        device_settings.t = [];

        for (i = 0; i < offset_steps; i++) {
            device_settings.t.push(i * delta_t);
            device_settings.y.push(0);
        }

        for (i = offset_steps; i < simulation_steps; i++) {
            switch (cutoff) {
                case 0:
                    device_settings.t.push((i * delta_t));
                    device_settings.y.push(knob3);
                    cdown++;

                    if (cdown > parseInt(knob1 / delta_t)) {
                        if (knob0 == 0) {
                            cdown = 0;
                            cutoff = 0;
                        } else {
                            cdown = 0;
                            cutoff = 1;
                        }
                    }
                    break;

                case 1:
                    device_settings.t.push((i * delta_t));
                    device_settings.y.push(0);
                    cdown++;

                    if (cdown > parseInt(knob2 / delta_t) - 1) {
                        cdown = 0;
                        cutoff = 0;
                    }
                    break;
            }
        }
    }

    static CollectDataFromSaw() {

        var device_settings = Device.settings;
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = device_settings.SYSTEM_DELTA_T;
        var simulation_steps = simulation_time / delta_t;

        var max_trolley_x = device_settings.max_trolley_x;
        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];
        var knob3 = device_settings.knob_seconds[3];
        var knob4 = device_settings.knob_seconds[4];

        var i = 0;
        var j = 0;
        var offset_steps = parseInt(knob0 / delta_t);

        device_settings.y = [];
        device_settings.t = [];

        for (i = 0; i < offset_steps; i++) {
            device_settings.t.push(i * delta_t);
            device_settings.y.push(0);
        }

        var triangle_y = [];

        for (i = 0; i < parseInt(knob1 / delta_t); i++) {
            if (knob3 == 1) {
                triangle_y.push((i + 1) * (knob4 * delta_t) / (knob1 * knob3));
            } else {
                if (i < parseInt((knob1 / delta_t) * knob3)) {
                    triangle_y.push((i + 1) * (knob4 * delta_t) / (knob1 * knob3));
                    j++;
                } else {
                    var k = i - j + 1;
                    triangle_y.push(knob4 - k * (knob4 * delta_t) / (knob1 * (1 - knob3)));
                }
            }
        }

        for (i = 0; i < parseInt(knob2 / delta_t); i++) {
            triangle_y.push(0);
        }

        var stop_concat = false;
        j = 0;

        while (stop_concat == false) {
            device_settings.y.push(triangle_y[j]);
            // console.log(triangle_y.length)
            if (j < triangle_y.length - 1) {
                j++;
            } else {

                if (device_settings.y.length >= simulation_steps) {
                    stop_concat = true;
                }else{
                    j = 0;
                }
            }
        }

        device_settings.y = device_settings.y.slice(0,200);
        console.log(device_settings.y)
    }
}