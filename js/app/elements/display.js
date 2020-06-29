class Display {
    constructor(SYSTEM_DELTA_T, SAMPLES) {
        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES
        this.SYSTEM_SIMULATION_TIME = SYSTEM_DELTA_T * SAMPLES;

        //  SCREEN PARAMS
        this.screen_width = $('.kh_display_board').width();
        //  Offset (screen margin)
        this.screen_width_offset = 20;

        //  Knobs
        this.knob_seconds = [0, 0, 0, 0, 0, 0];
        this.knob_angles = [0, 0, 0, 0, 0, 0];

        this.selected_template = 2;

        //  Display Image Trigger
        this.initDisplay();
    }

    initDisplay() {
        this.resize_svg(false);
        this.manageHandler();
    }

    resize_svg() {
        var screen_width = $('.kh_display');
        var fit_screen = $('.kh_display_board');
        this.screen_width = screen_width.width();
        $(fit_screen).width(screen_width.width());

        var glow = $('.kh_display_glow');
        $(glow).css('width', screen_width.width() + 2 + 'px')
            .css('height', screen_width.height() + 2 + 'px');

        this.refreshDisplay();

    }

    manageHandler() {
        var slf = this;
        window.addEventListener('resize', function () {
            slf.resize_svg();
        });
    }

    setFromChildKnobValues(knob_angles, knob_seconds) {
        this.knob_angles = knob_angles;
        this.knob_seconds = knob_seconds;
        this.refreshDisplay();
    }

    refreshDisplay() {
        $('.kh_display_board').empty();
        this.StaticEnvelopeScenario();
        this.EnvelopeTemplates()
    }

    StaticEnvelopeScenario() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.screen_width);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / 20

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.screen_width_offset,
            y: 50,
            width: width - 2 * this.screen_width_offset,
            height: 0.001,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.screen_width_offset,
            y: 290,
            width: width - 2 * this.screen_width_offset,
            height: 0.1,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        for (var i = 0; i < 21; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: this.screen_width_offset + i * width_second,
                y: 270,
                width: 0.1,
                height: 20,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            if (i != 20) {
                ;
                var $br = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: this.screen_width_offset + i * width_second + width_second / 2,
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
        switch (this.selected_template) {
            case 0: //  STEP
                this.StepEnvelope_template();
                break;
            case 1:
                this.SawEnvelope_template();
                break;
            case 2:
                this.SineEnvelope_template();
                break;
        }

    }

    StepEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.screen_width);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / this.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += this.knob_seconds[0] * width_second
        var i = this.knob_seconds[0];
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
                width: this.knob_seconds[1] * width_second,
                height: 1,
                stroke: "green"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.knob_seconds[1] * width_second

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
                width: this.knob_seconds[2] * width_second,
                height: 1,
                stroke: "magenta"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.knob_seconds[2] * width_second

            if (i < (this.SYSTEM_SIMULATION_TIME)) {
                i++;
            } else {
                in_time = false;
                i = 0;
            }
        }
    }

    SawEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.screen_width);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / this.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += this.knob_seconds[0] * width_second
        var i = this.knob_seconds[0];
        while (in_time == true) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                d: "M" + (curr_width) + "," + 290 +
                    " L" + (curr_width + this.knob_seconds[1] * width_second * (this.knob_seconds[3]))
                    + "," + 150,
                // y: 150,
                // width: 1,
                // height: 140,
                stroke: "blue"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                d: "M" + (curr_width + this.knob_seconds[1] * width_second * (this.knob_seconds[3])) + "," + 150 +
                    " L" + (curr_width + this.knob_seconds[1] * width_second) + "," + 290,
                // y: 150,
                // width: 1,
                // height: 140,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);
            curr_width += (this.knob_seconds[1]) * width_second;

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: this.knob_seconds[2] * width_second,
                height: 1,
                stroke: "magenta"
            });
            $(envelope_visualizer).append($bar);
            curr_width += this.knob_seconds[2] * width_second

            if (i < (this.SYSTEM_SIMULATION_TIME)) {
                i++;
            } else {
                in_time = false;
                i = 0;
            }
        }
    }

    SineEnvelope_template() {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.screen_width);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / this.SYSTEM_SIMULATION_TIME

        var in_time = true;
        var curr_width = this.screen_width_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: this.knob_seconds[0] * width_second,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += this.knob_seconds[0] * width_second
        var i = this.knob_seconds[0];


        console.log(this.knob_seconds[1])
        var amplitude = 200; // wave amplitude
        var freq = 1 / this.knob_seconds[1]; // angular frequency
        var rate = (2 * Math.PI) * freq; // point spacing
        var phase = this.knob_seconds[2] * (2 * Math.PI) / 180; // phase angle

        var width_point = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / this.SYSTEM_SIMULATION_TIME

        var time_limit = 1 + (this.SYSTEM_SIMULATION_TIME - this.knob_seconds[0]) * 10

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
}