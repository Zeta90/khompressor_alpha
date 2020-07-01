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
        var screen_height = $('.kh_display').height();
        var fit_screen = $('.kh_display_board');
        this.device_settings.screen_width = screen_width;
        this.device_settings.screen_h = screen_height;
        $(fit_screen).width(screen_width);
        $(fit_screen).height(screen_height);

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
        var simulation_time = this.device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = this.device_settings.SYSTEM_DELTA_T;

        var max_trolley_x = this.device_settings.max_trolley_x;
        var sreen_rate = this.device_settings.sreen_rate;

        var screen_width = sreen_rate * (this.device_settings.screen_width);
        var screen_width_offset = sreen_rate * this.device_settings.screen_width_offset;
        var screen_h = sreen_rate * (this.device_settings.screen_h);
        var screen_h_offset = sreen_rate * this.device_settings.screen_h_offset;

        var screen_h_offset_special = -screen_h_offset + screen_h;

        // var width_point = (screen_width / simulation_time) - 2 * screen_width_offset / simulation_time
        // var height_point = (screen_h / max_trolley_x) - 2 * screen_h_offset / max_trolley_x


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

        // var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
        //     x: screen_width_offset,
        //     y: 30,
        //     width: screen_width - 2 * screen_width_offset,
        //     height: 0.001,
        //     stroke: "#9c9c9c59"
        // });
        // $(envelope_visualizer).append($bar);

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

    MechEnvelope_template() {
        Physics.goMove()
        var envelope_visualizer = $('.kh_display_board');
        var simulation_time = this.device_settings.SYSTEM_SIMULATION_TIME;
        var delta_t = this.device_settings.SYSTEM_DELTA_T;

        var max_trolley_x = this.device_settings.max_trolley_x;

        if (max_trolley_x == 0) {
            max_trolley_x = 1;
        }

        var sreen_rate = this.device_settings.sreen_rate;

        var screen_width = sreen_rate * (this.device_settings.screen_width);
        var screen_width_offset = sreen_rate * this.device_settings.screen_width_offset;
        var screen_h = sreen_rate * (this.device_settings.screen_h);
        var screen_h_offset = sreen_rate * this.device_settings.screen_h_offset;

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

        console.log(screen_h_offset_special)


        // var curr_height = 520;




        for (var i = 1; i < 200; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            // console.log(Device.settings.y[i-1])

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