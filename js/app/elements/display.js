class Display {
    constructor() {
        this.device_settings = Device.settings;

        this.SYSTEM_DELTA_T = Device.settings.SYSTEM_DELTA_T;
        this.SAMPLES = Device.settings.SYSTEM_SIMULATION_SAMPLES;
        this.SYSTEM_SIMULATION_TIME = Device.settings.SYSTEM_SIMULATION_TIME;

        //  SCREEN PARAMS
        this.screen_width = $('.kh_display_board').width();
        //  Offset (screen margin)
        this.screen_width_offset = 20;

        //  Knobs
        this.knob_seconds = [0, 0, 0, 0, 0, 0];
        this.knob_angles = [0, 0, 0, 0, 0, 0];

        this.selected_template = 0;

        //  Display Image Trigger
        this.initDisplay();
    }

    initDisplay() {
        this.resize_svg(false);
        this.manageHandler();
    }

    resize_svg() {
        var screen_width = $('.kh_display').width();
        var fit_screen = $('.kh_display_board');
        this.device_settings.screen_width = screen_width;
        $(fit_screen).width(screen_width);

        // var glow = $('.kh_display_glow');
        // $(glow).css('width', this.device_settings.screen_width + 2 + 'px')
        //     .css('height', this.device_settings.screen_width + 2 + 'px');

        this.refreshDisplay();

    }

    manageHandler() {
        var slf = this;
        window.addEventListener('resize', function () {
            slf.resize_svg();
        });
    }

    refreshDisplay() {
        $('.kh_display_board').empty();
        this.StaticEnvelopeScenario();
        this.EnvelopeTemplates()
    }

    StaticEnvelopeScenario() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.device_settings.screen_width);
        var width_second = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / 20

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.device_settings.screen_width_offset,
            y: 50,
            width: width - 2 * this.device_settings.screen_width_offset,
            height: 0.001,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.device_settings.screen_width_offset,
            y: 290,
            width: width - 2 * this.device_settings.screen_width_offset,
            height: 0.1,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        for (var i = 0; i < 21; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: this.device_settings.screen_width_offset + i * width_second,
                y: 270,
                width: 0.1,
                height: 20,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            if (i != 20) {
                ;
                var $br = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: this.device_settings.screen_width_offset + i * width_second + width_second / 2,
                    y: 280,
                    width: 0.1,
                    height: 10,
                    stroke: "white"
                });
                $(envelope_visualizer).append($br);
            }
        }
    }

    EnvelopeTemplates() {
        switch (this.device_settings.selected_template) {
            case 0: //  STEP
                this.StepEnvelope_template();
                break;
            case 1:
                this.SawEnvelope_template();
                break;
            case 2:
                this.SineEnvelope_template();
                break;
            case 3:
                this.MechEnvelope_template();
                break;
        }

    }

    StepEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.device_settings.screen_width);
        var width_second = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.device_settings.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.device_settings.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += this.device_settings.knob_seconds[0] * width_second
        var i = this.device_settings.knob_seconds[0];

        while (in_time == true) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: 1,
                height: 140,
                stroke: "blue"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: this.device_settings.knob_seconds[1] * width_second,
                height: 1,
                stroke: "green"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.device_settings.knob_seconds[1] * width_second

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: 1,
                height: 140,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: this.device_settings.knob_seconds[2] * width_second,
                height: 1,
                stroke: "magenta"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.device_settings.knob_seconds[2] * width_second

            if (i < (this.device_settings.SYSTEM_SIMULATION_TIME)) {
                i++;
            } else {
                in_time = false;
                i = 0;
            }
        }
    }

    SawEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.device_settings.screen_width);
        var width_second = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.device_settings.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.device_settings.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });

        $(envelope_visualizer).append($bar);
        curr_width += this.device_settings.knob_seconds[0] * width_second
        var i = this.device_settings.knob_seconds[0];
        while (in_time == true) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                d: "M" + (curr_width) + "," + 290 +
                    " L" + (curr_width + this.device_settings.knob_seconds[1] * width_second * (this.device_settings.knob_seconds[3]))
                    + "," + 150,
                // y: 150,
                // width: 1,
                // height: 140,
                stroke: "blue"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                d: "M" + (curr_width + this.device_settings.knob_seconds[1] * width_second * (this.device_settings.knob_seconds[3])) + "," + 150 +
                    " L" + (curr_width + this.device_settings.knob_seconds[1] * width_second) + "," + 290,
                // y: 150,
                // width: 1,
                // height: 140,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);
            curr_width += (this.device_settings.knob_seconds[1]) * width_second;

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: this.device_settings.knob_seconds[2] * width_second,
                height: 1,
                stroke: "magenta"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.device_settings.knob_seconds[2] * width_second

            if (i < (this.device_settings.SYSTEM_SIMULATION_TIME)) {
                i++;
            } else {
                in_time = false;
                i = 0;
            }
        }
    }

    SineEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.device_settings.screen_width);
        var width_second = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.device_settings.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.device_settings.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += this.device_settings.knob_seconds[0] * width_second
        var i = this.device_settings.knob_seconds[0];

        var amplitude = 200; // wave amplitude
        var freq = this.device_settings.knob_seconds[1]; // angular frequency
        var rate = (2 * Math.PI) * freq; // point spacing
        var phase = this.device_settings.knob_seconds[2] * (2 * Math.PI) / 180; // phase angle

        var width_point = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME

        var time_limit = 1 + (this.device_settings.SYSTEM_SIMULATION_TIME - this.device_settings.knob_seconds[0]) * 10

        for (var i = 1; i < time_limit; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute('x1', ((i) - 1) * width_point / 10 + curr_width);
            line.setAttribute('y1', -Math.sin((i - 1) * rate / 10 + phase) * amplitude + 290);

            line.setAttribute('x2', i * width_point / 10 + curr_width);
            line.setAttribute('y2', -Math.sin((i * rate / 10) + phase) * amplitude + 290);

            line.setAttribute('style', "stroke:red;stroke-width:2   ");

            $(envelope_visualizer).append(line);
        }
    }















    // generateSignal() {
    //     TOTAL_SIMULATION_TIME = 20;

    //     var x = []
    //     var v = []
    //     var y = []
    //     var a = []


    //     var i = 0;
    //     var j = 0;

    //     var curr_point = 0;
    //     var counter = 0;
    //     var amp = 0;

    //     var offset_samples = offset_time / self.delta_t;

    //     while (counter < TOTAL_SIMULATION_TIME) {
    //         if (counter == 0) {
    //             curr_point += offset_time;
    //             for (i = 0; i < parseInt(offset_time / self.delta_t); i++) {
    //                 y.append(0);
    //             }
    //             counter += 1;
    //         } else {
    //             var amplif = amp;
    //             curr_point += s_on_time;
    //             for (i = 0; i < parseInt(s_on_time / self.delta_t); i++) {
    //                 y.append(amp);
    //             }
    //         }
    //     }
    // }

    // goRight(i) {
    //     var delta_t = 0.1;
    //     var trolley_velocity = 0;
    //     var trolley_x = 0.0;
    //     var VELOCITY_MAX = 25;
    //     var ACCELERATION_MOV = 5;
    //     var ACCELERATION_BRK = 2;

    //     if (trolley_velocity < VELOCITY_MAX) {
    //         trolley_x = parseFloat(
    //             (trolley_x)
    //             // + (trolley_velocity * delta_t)
    //             + (0.5 * parseFloat(ACCELERATION_MOV) * (delta_t ^ 2.0))
    //         );
    //         trolley_velocity = trolley_velocity + (ACCELERATION_MOV * delta_t)
    //     } else {
    //         trolley_x = parseFloat((trolley_x) + (trolley_velocity * delta_t))
    //         trolley_velocity = VELOCITY_MAX
    //     }
    //     // console.log((0.5 * parseFloat(ACCELERATION_MOV) * (delta_t ^ 2.0)))

    //     return [trolley_x, trolley_velocity]
    // }

    // goBrake(i) {
    //     var delta_t = 0.1;
    //     var trolley_velocity = 0;
    //     var trolley_x = 0.0;
    //     var VELOCITY_MAX = 25;
    //     var ACCELERATION_MOV = 5;
    //     var ACCELERATION_BRK = 2;

    //     if (trolley_velocity < VELOCITY_MAX) {
    //         trolley_x = parseFloat(
    //             (trolley_x)
    //             // + (trolley_velocity * delta_t)
    //             + (0.5 * parseFloat(ACCELERATION_BRK) * (delta_t ^ 2.0))
    //         );
    //         trolley_velocity = trolley_velocity + (ACCELERATION_BRK * delta_t)
    //     } else {
    //         trolley_x = parseFloat((trolley_x) + (trolley_velocity * delta_t))
    //         trolley_velocity = VELOCITY_MAX
    //     }
    //     return [trolley_x, trolley_velocity]
    // }




    MechEnvelope_template() {

        var TOTAL_SIMULATION_TIME = 20;
        var delta_t = 0.1;
        var smpls = 200;

        var i = 0;
        var j = 0;

        var curr_point = 0;
        var counter = 0;
        var amp = 0;

        var offset_time = 2;

        var offset_samples = offset_time / delta_t;

        Device.settings.x = [0]
        Device.settings.v = [0]
        Device.settings.t = []

        Physics.goMove()






        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.device_settings.screen_width);
        var width_second = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.device_settings.screen_width_offset;

        var amplitude = 200; // wave amplitude
        var freq = this.device_settings.knob_seconds[1]; // angular frequency
        var rate = (2 * Math.PI) * freq; // point spacing
        var phase = this.device_settings.knob_seconds[2] * (2 * Math.PI) / 180; // phase angle

        var width_point = (width / this.device_settings.SYSTEM_SIMULATION_TIME) - 2 * this.device_settings.screen_width_offset / this.device_settings.SYSTEM_SIMULATION_TIME


        for (var i = 1; i < 200; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            // console.log(Device.settings.y[i-1])

            line.setAttribute('x1', curr_width + Device.settings.t[i - 1] * width_point);
            line.setAttribute('y1', -Device.settings.y[i - 1] * (500 / 200) + 500);

            line.setAttribute('x2', curr_width + Device.settings.t[i] * width_point);
            line.setAttribute('y2', -Device.settings.y[i] * (500 / 200) + 500);

            if (i < Device.settings.knob_seconds[0] / delta_t) {
                line.setAttribute('style', "stroke:red;stroke-width:2   ");
            } else if (i < Device.settings.knob_seconds[1] / delta_t) {
                line.setAttribute('style', "stroke:blue;stroke-width:2   ");
            } else {
                line.setAttribute('style', "stroke:green;stroke-width:2   ");
            }


            $(envelope_visualizer).append(line);
        }










        // for (var i = 0; i < smpls; i++) {
        //     // if (i < (smpls / 10)) {
        //         var dxdvdt = Physics.goMove(i)
        //         // var dt = i * delta_t

        //     //     $(Device.settings.x).push(dxdv[0])
        //     //     $(Device.settings.v).push(dxdv[1])
        //     //     $(Device.settings.t).push(dt)
        //     // // } else if (i < (smpls - 1)) {
        //     //     var dxdv = Physics.goBrake(i)
        //     //     var dt = i * delta_t
        //     //     $(Device.settings.x).push(dxdv[0])
        //     //     $(Device.settings.v).push(dxdv[1])
        //     //     $(Device.settings.t).push(dt)
        //     // }
        // }
        // console.log(Device.settings.x)
        // console.log(t)
        // console.log(v)
        //return x, t, v
    }
}