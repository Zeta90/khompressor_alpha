class Display {
    constructor(SYSTEM_DELTA_T, SAMPLES) {
        //  SCREEN PARAMS
        this.screen_width = $('.kh_display_board').width();
        //  Offset (screen margin)
        this.screen_width_offset = 20;

        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES
        this.SYSTEM_SIMULATION_TIME = SYSTEM_DELTA_T * SAMPLES;

        // Defines if the Wave template has already loaded
        this.is_template_loaded = false;
        this.default_template_ready = true;

        // Defines if the Wave template has already loaded
        this.knob_values_raw = null;
        this.knob_values_limited = [];
        this.knob_index = null;

        //  Display Image Trigger
        this.initDisplay();
    }

    //  BEHAVOIR
    initDisplay() {
        this.initialSetup();
        this.SetDeviceParams();
    }

    //      INITIAL SETUP
    initialSetup() {
        this.resize_svg(false);
        this.manageHandler();
    }

    resize_svg(reload_on_resize) {
        var screen_width = $('.kh_display');
        var fit_screen = $('.kh_display_board');
        this.screen_width = screen_width.width();
        $(fit_screen).width(screen_width.width())

        if (reload_on_resize == true) {
            this.refreshDisplay();
        }
    }

    manageHandler() {
        var slf = this;
        window.addEventListener('resize', function () {
            slf.resize_svg(true);
        });
    }
    //      !!! INITIAL SETUP

    SetDeviceParams() {
        var knob_labels = [];
        knob_labels.push(['Delay [s]', 'Step up [s]', 'Step down [s]']);
        knob_labels.push(['Delay [s]', 'Sustain [s]', 'Decay [s]', 'Amp/step [s]', 'Max. Amp [s]']);

        var knob_max_value = [];
        knob_max_value.push([5, 20, 0, 0, 0, 0]);

        this.knob_labels = knob_labels;
        this.knob_max_value = knob_max_value;
    }

    SET_KnobValues(knob_values_raw, index) {
        console.log(index)
        if (index == null) {
            this.knob_values_raw = knob_values_raw;
        } else {
            this.knob_values_raw[index] = knob_values_raw;
            this.knob_index = index;
        }
        this.refreshDisplay();
    }
    //  !!! BEHAVOIR


    PrintParamLabels() {
        var labels = $('.main_shaper').find('.fl-studio-envelope__label');
        var param_lbls = this.param_labels[this.wave_shape];
        //console.log(param_lbls.length)

        $.each(labels, function (i, lbl) {
            var lbl_txt = param_lbls[i]
            //console.log(lbl_txt)
            $(this).html(lbl_txt);
        })
    }

    refreshDisplay() {
        $('.kh_display_board').empty();
        this.StaticEnvelopeScenario(this.SYSTEM_DELTA_T, this.SAMPLES);
        this.EnvelopeTemplates()
    }

    StaticEnvelopeScenario(SYSTEM_DELTA_T, SAMPLES) {
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
        switch (parseInt(0)) {
            case 0: //  STEP
                this.StepEnvelope_template();
                break;
            case 1:
                this.StepEnvelope_template();
                break;
        }

    }

    StepEnvelope_template() {
        if (this.knob_values_raw == null) {
            this.knob_values_raw = [5, 15, 0, 0, 0, 0]
        }
        var knob = this.knob_values_raw;

        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.screen_width);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.screen_width_offset / 20

        var in_time = true;
        var curr_width = this.screen_width_offset;
        var knob_conversor_rate = this.SYSTEM_SIMULATION_TIME / 360

        console.log(this.is_template_loaded)

        if (this.is_template_loaded == false) {
            //this.display_wave = true; console.log('--->' + (this.envelopeKnobs)[0].value)
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: 5 * width_second,
                height: 1,
                stroke: "red"
            });
            $(envelope_visualizer).append($bar);
            curr_width += 5 * width_second;

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 50,
                width: 1,
                height: 240,
                stroke: "blue"
            });
            this.is_template_loaded = true;
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 50,
                width: 15 * width_second,
                height: 1,
                stroke: "green"
            });
            this.is_template_loaded = true;
            $(envelope_visualizer).append($bar);
        } else {
            console.log(knob[0] * knob_conversor_rate * width_second)
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: knob[0] * knob_conversor_rate * width_second,
                height: 1,
                stroke: "red"
            });
            $(envelope_visualizer).append($bar);
            curr_width += knob[0] * knob_conversor_rate * width_second
            var i = knob[0] * knob_conversor_rate;
            while (in_time == true) {
                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: 150,
                    width: 1,
                    height: 140,
                    stroke: "blue"
                    ,
                });
                $(envelope_visualizer).append($bar);

                var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: curr_width,
                    y: 150,
                    width: knob[1] * knob_conversor_rate * width_second,
                    height: 1,
                    stroke: "green"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob[1] * knob_conversor_rate * width_second

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
                    width: knob[2] * knob_conversor_rate * width_second,
                    height: 1,
                    stroke: "magenta"
                });
                $(envelope_visualizer).append($bar);
                curr_width += knob[2] * knob_conversor_rate * width_second

                if (i < (this.SYSTEM_SIMULATION_TIME / this.SYSTEM_DELTA_T)) {
                    i++;
                } else {
                    in_time = false;
                    i = 0;
                }
            }
        }
        this.default_template_ready = false;
        this.is_template_loaded = true


    }

    limit_knob_values(value, index) {
        this.knob_values_limited = this.knob_max_value[0]
        this.knob_values_raw[index] = value// * (knob_values_limited[index] / 360)
    }



}