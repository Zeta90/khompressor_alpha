class SignalGenerator {
    static StaticEnvelopeScenario() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;
        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        for (var i = 0; i < 10; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: screen_width_offset * 2 - 20,
                y: screen_h_offset_special * (i / 10) + 20,
                width: screen_width - 2 * screen_width_offset,
                height: 0.001,
                stroke: "#9c9c9c59"
            });
            $(envelope_visualizer).append($bar);
        }

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: screen_width_offset * 2 - 20,
            y: screen_h_offset_special + 20,
            width: screen_width - 2 * screen_width_offset,
            height: 0.1,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        for (var i = 0; i < 21; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: screen_width_offset * 2 - 20 + i * width_second,
                y: screen_h_offset_special,
                width: 0.1,
                height: 20,
                stroke: "#36ff00a8"
            });
            $(envelope_visualizer).append($bar);

            if (i != 20) {
                ;
                var $br = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: screen_width_offset * 2 - 20 + i * width_second + width_second / 2,
                    y: screen_h_offset_special + 10,
                    width: 0.1,
                    height: 10,
                    stroke: "#36ff00a8"
                });
                $(envelope_visualizer).append($br);
            }
        }
    }

    static EnvelopeTemplates() {
        switch (Device.settings.selected_template) {
            case 0: //  STEP
                this.StepEnvelope_template();
                break;
            case 1:
                this.SquareEnvelope_template();
                break;
            case 2:
                this.RampEnvelope_template();
                break;
            case 3:
                this.SawEnvelope_template();
                break;
            case 4:
                this.SineEnvelope_template();
                break;
            case 5:
                this.MechEnvelope_template();
                break;
        }

    }

    static StepEnvelope_template() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;

        var max_trolley_x = device_settings.max_trolley_x;
        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];

        var meas = $('.meas').find('li');
        var max_y_rounded = knob1;
        $.each(meas, function (i, el) {
            $(el).html((max_y_rounded * ((10 - i) / 10)).toFixed(3));
        })

        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        var curr_width = screen_width_offset * 2 - 25;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset_special + 20,
            width: knob0 * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += knob0 * width_second

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset / 2,
            width: 1,
            height: screen_h_offset_special,
            stroke: "#17a2b8"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset / 2,
            width: (simulation_time - knob0) * width_second,
            height: 1,
            stroke: "#17a2b8"
        });
        $(envelope_visualizer).append($bar);

    }

    static SquareEnvelope_template() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;

        var max_trolley_x = device_settings.max_trolley_x;
        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];
        var knob3 = device_settings.knob_seconds[3];



        var meas = $('.meas').find('li');
        var max_y_rounded = knob3;
        $.each(meas, function (i, el) {
            $(el).html((max_y_rounded * ((10 - i) / 10)).toFixed(3));
        })

        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        var in_time = true;
        var curr_width = screen_width_offset * 2 - 25;
        console.log(device_settings.screen_width)
        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset_special + 20,
            width: knob0 * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += knob0 * width_second
        var i = knob0;

        while (in_time == true) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: screen_h_offset / 2,
                width: 1,
                height: screen_h_offset_special,
                stroke: "#17a2b8"
            });
            $(envelope_visualizer).append($bar);

            if (knob2 == 0) {
                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: screen_h_offset / 2,
                    width: (simulation_time - knob0) * width_second,
                    height: 1,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob1 * width_second;

                in_time = false;
                i = 0;
            } else {
                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: screen_h_offset / 2,
                    width: (knob1) * width_second,
                    height: 1,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob1 * width_second;

                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: screen_h_offset / 2,
                    width: 1,
                    height: screen_h_offset_special,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);

                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: screen_h_offset_special + 20,
                    width: knob2 * width_second,
                    height: 1,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob2 * width_second;

                if (curr_width < (screen_width)) {
                    i++;
                } else {
                    in_time = false;
                    i = 0;
                }

                if (i == 1000) {
                    in_time = false;
                    i = 0;
                    alert(111)
                }

            }
        }
    }

    static RampEnvelope_template() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;

        var max_trolley_x = device_settings.max_trolley_x;

        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];

        var meas = $('.meas').find('li');
        var max_y_rounded = knob2;
        $.each(meas, function (i, el) {
            $(el).html((max_y_rounded * ((10 - i) / 10)).toFixed(3));
        })

        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        var curr_width = screen_width_offset * 2 - 25;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset_special + 20,
            width: knob0 * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += knob0 * width_second;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
            d: "M" + (curr_width) + "," + (screen_h_offset_special + 20) +
                " L" + (curr_width + knob1 * width_second)
                + "," + screen_h_offset / 2,
            // y: 150,
            // width: 1,
            // height: 140,
            stroke: "#17a2b8"
        });
        $(envelope_visualizer).append($bar);
        curr_width += knob1 * width_second;
        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset / 2,
            width: ((simulation_time - knob0 - knob1) * width_second),
            height: 1,
            stroke: "#17a2b8"
        });
        $(envelope_visualizer).append($bar);


    }

    static SawEnvelope_template() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = device_settings.SYSTEM_DELTA_T;

        var max_trolley_x = device_settings.max_trolley_x;

        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];
        var knob3 = device_settings.knob_seconds[3];
        var knob4 = device_settings.knob_seconds[4];

        var meas = $('.meas').find('li');
        var max_y_rounded = knob4;
        $.each(meas, function (i, el) {
            $(el).html((max_y_rounded * ((10 - i) / 10)).toFixed(3));
        })

        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        var in_time = true;
        var curr_width = screen_width_offset * 2 - 25;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h_offset_special + 20,
            width: knob0 * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);

        if (knob1 == 0) {
            curr_width += knob0 * width_second
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: screen_h_offset_special + 20,
                width: (simulation_time - knob0) * width_second,
                height: 1,
                stroke: "#17a2b8"
            });
            $(envelope_visualizer).append($bar);

            in_time = false;
            i = 0;
        } else {
            $(envelope_visualizer).append($bar);
            curr_width += knob0 * width_second
            var i = knob0;
            while (in_time == true) {
                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                    d: "M" + (curr_width) + "," + (screen_h_offset_special + 20) +
                        " L" + (curr_width + knob1 * width_second * (knob3))
                        + "," + screen_h_offset / 2,
                    // y: 150,
                    // width: 1,
                    // height: 140,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);

                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                    d: "M" + (curr_width + knob1 * width_second * (knob3)) + "," + screen_h_offset / 2 +
                        " L" + (curr_width + knob1 * width_second) + "," + (screen_h_offset_special + 20),
                    // y: 150,
                    // width: 1,
                    // height: 140,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);
                curr_width += (knob1) * width_second;

                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: screen_h_offset_special + 20,
                    width: knob2 * width_second,
                    height: 1,
                    stroke: "#17a2b8"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob2 * width_second

                if (curr_width < (screen_width)) {
                    i++;
                } else {
                    in_time = false;
                    i = 0;
                }

                if (i == 1000) {
                    in_time = false;
                    i = 0;
                    alert(111)
                }
            }
        }
    }

    static SineEnvelope_template() {
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;

        var max_trolley_x = device_settings.max_trolley_x;
        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var knob0 = device_settings.knob_seconds[0];
        var knob1 = device_settings.knob_seconds[1];
        var knob2 = device_settings.knob_seconds[2];
        var knob3 = device_settings.knob_seconds[3];

        var amplitude = knob3; // wave amplitude

        var meas = $('.meas').find('li');
        var max_y_rounded = max_trolley_x;
        $.each(meas, function (i, el) {
            $(el).html((amplitude * ((10 - 2 * i) / 10)).toFixed(3));
        })

        var width_second = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time
        var curr_width = screen_width_offset * 2 - 25;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: screen_h / 2,
            width: knob0 * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += knob0 * width_second
        var i = knob0;


        var freq = knob1 / 2; // angular frequency
        var rate = (2 * Math.PI) * freq; // point spacing
        var phase = knob2 * (2 * Math.PI) / 180; // phase angle

        var width_point = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time

        var time_limit = 1 + (simulation_time - knob0) * 10

        for (var i = 1; i < time_limit; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute('x1', ((i) - 1) * width_point / 10 + curr_width);
            line.setAttribute('y1', -Math.sin((i - 1) * rate / 10 + phase) * amplitude * (0.5 * screen_h_offset_special / amplitude) + screen_h / 2);

            line.setAttribute('x2', i * width_point / 10 + curr_width);
            line.setAttribute('y2', -Math.sin((i * rate / 10) + phase) * amplitude * (0.5 * screen_h_offset_special / amplitude) + screen_h / 2);

            line.setAttribute('style', "stroke:red;stroke-width:2   ");

            $(envelope_visualizer).append(line);
        }
    }

    static MechEnvelope_template() {
        Physics.goMove()
        var device_settings = Device.settings;
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = device_settings.SYSTEM_DELTA_T;

        var max_trolley_x = device_settings.max_trolley_x;

        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = device_settings.sreen_rate;

        var screen_width = sreen_rate * (device_settings.screen_width);
        var screen_width_offset = sreen_rate * device_settings.screen_width_offset;
        var screen_h = sreen_rate * (device_settings.screen_h);
        var screen_h_offset = sreen_rate * device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        var width_point = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time
        var height_point = (screen_h / max_trolley_x) - 2 * screen_h_offset / max_trolley_x

        var meas = $('.meas').find('li');
        var max_y_rounded = max_trolley_x;
        $.each(meas, function (i, el) {
            $(el).html((max_y_rounded * ((10 - i) / 10)).toFixed(3));
        })

        var t = Device.settings.t;
        var y = Device.settings.y;

        var knob0 = Device.settings.knob_seconds[0];
        var knob1 = Device.settings.knob_seconds[1];

        for (var i = 1; i < 200; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute('x1', screen_width_offset * 2 - 25 + t[i - 1] * width_point);
            line.setAttribute('y1', screen_h_offset_special + 22 - y[i - 1] * height_point);

            line.setAttribute('x2', screen_width_offset * 2 - 25 + t[i] * width_point);
            line.setAttribute('y2', screen_h_offset_special + 22 - y[i] * height_point);

            if (i - 1 < knob0 / delta_t) {
                line.setAttribute('style', "stroke:red;stroke-width:2   ");
            } else if (i - 1 < knob1 / delta_t) {
                line.setAttribute('style', "stroke:blue;stroke-width:2   ");
            } else {
                line.setAttribute('style', "stroke:green;stroke-width:2   ");
            }
            $(envelope_visualizer).append(line);
        }
        Device.settings.max_trolley_x = 0;
    }
}