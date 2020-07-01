class Physics {
    static goMove() {
        var device_settings = Device.settings;

        var VELOCITY_MAX = device_settings.knob_seconds[2];
        var ACCELERATION_MOV = device_settings.knob_seconds[3];
        var ACCELERATION_BRK = device_settings.knob_seconds[4];

        var delta_t = device_settings.SYSTEM_DELTA_T;

        var delay_steps = device_settings.knob_seconds[0] / delta_t;
        var acc_steps = device_settings.knob_seconds[1] / delta_t;
        var brk_steps = device_settings.SYSTEM_SIMULATION_SAMPLES - acc_steps - delay_steps

        var i = 0;
        var j = 0;
        var k = 1;

        var dt = 0;
        var tx = 0;
        var dt_j = 0;

        var t = [0];
        var y = [0];

        var trolley_x = 0;
        var trolley_velocity = 0;

        var state_trolley_x = 0;
        var state_trolley_velocity = 0;

        for (i = 1; i < delay_steps; i++) {
            dt = i * delta_t;
            t.push(dt);
            y.push(0);
            j++;
        }
        j++;

        for (i = 0; i < acc_steps; i++) {
            dt = i * delta_t;
            dt_j = j * delta_t;

            if (trolley_velocity < VELOCITY_MAX) {
                trolley_x = 0.5 * ACCELERATION_MOV * Math.pow(dt, 2);
                trolley_velocity = (ACCELERATION_MOV * dt);
                if(trolley_velocity>VELOCITY_MAX){
                    trolley_velocity = VELOCITY_MAX;
                }
                tx = trolley_x;
            } else {
                trolley_velocity = VELOCITY_MAX
                dt = k * delta_t;
                trolley_x = tx + (trolley_velocity * dt)
                k++;
            }
            j++;

            t.push(dt_j);
            y.push(trolley_x);
        }

        state_trolley_x = trolley_x;
        state_trolley_velocity = trolley_velocity;
        k = 0;

        for (i = 0; i < brk_steps; i++) {
            dt = (i+1) * delta_t;

            if (trolley_velocity > 0) {
                trolley_x = state_trolley_x +
                    + (state_trolley_velocity * dt)
                    - 0.5 * ACCELERATION_BRK * Math.pow(dt, 2);

                trolley_velocity = state_trolley_velocity - (ACCELERATION_BRK * dt)
                if(trolley_velocity<0){
                    trolley_velocity = 0;
                }
                tx = trolley_x;
            } else {
                trolley_velocity = 0
                dt = k * delta_t;
                trolley_x = tx + (trolley_velocity * dt)
                k++;
            }

            dt_j = j * delta_t;
            j++;

            t.push(dt_j);
            y.push(trolley_x);
        }
        device_settings.t = t;
        device_settings.y = y;

        return [trolley_x, trolley_velocity]
    }
}