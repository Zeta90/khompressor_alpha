// $(document).ready(function () {
//     //var plotting_waves = new PlottingWaves();
//     //var waveshaper = new WaveControls();



//     // waveshaper.PrintInitialLabels();
//     // // var shapecontrols = LoadDeviceVisualization();
//     // // console.log(shapecontrols[0].value)


//     // plotting_waves.load_input_plot(true);

//     var collector_ext = null;
//     var device = new Device();

//     $('.selectwave_btn').click(function () {
//         var wave_btn = $(this).attr('accesskey')
//         $('.selectwave_btn.active').removeClass('active')
//         $(this).addClass('active')
//         device.wave_shape = wave_btn;
//         device.InitializeEnvelope()
//         //AnimateWheelsPanel();
//         console.log(device.wave_shape);
//     });

//     function AnimateWheelsPanel() {
//         $(".grdnt").animate({
//             opacity: 0.25,
//         }, 500, function () {
//             console.log(2)
//             $(".grdnt").animate({
//                 opacity: 1,
//             }, 500, function () {
//                 // Animation complete.
//             });
//         });
//     }

//     window.onresize = function () {
//         // device.ManageEnvelope();
//     };
// })

// $('.btn_wave').click(function () {
//     var led_potentiometer_pos = $(this).attr('accesskey');
//     console.log(led_potentiometer_pos);
//     Device.ActivatePotentiometerLeds(led_potentiometer_pos);
// })

$(document).ready(function () {
    var device;
    var device = new Device();
})

class Device {
    constructor() {
        //  CONST
        this.SYSTEM_SIMULATION_TIME = 20;
        this.SYSTEM_DELTA_T = 0.1
        this.SAMPLES = 200

        this.is_template_loaded = false;

        this.knob_labels = [];

        this.gain = 0;







        this.wave_index = 0;
        this.display_on = false;

        //  MAIN TRIGGER
        this.runOscillator()
        //  MAIN TRIGGER
    }

    runOscillator() {
        //this.initialSetup();
        this.knobs = new KnobAnalog(this.SYSTEM_DELTA_T, this.SAMPLES)
        //this.display.initDisplay(this.SYSTEM_DELTA_T, this.SAMPLES, this.SYSTEM_SIMULATION_TIME);
    }



    initialSetup() {
        // this.resize_svg();
        // this.manageHandler();
    }

    getGainValue() {
        return this.gain
    }

}

class Display {
    constructor(SYSTEM_DELTA_T, SAMPLES) {
        //  SCREEN
        this.width_screen_offset = 20;
        this.width_screen = $('.kh_display_board').width();
        console.log(this.width_screen)

        console.log(this.width_screen)

        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES
        this.SYSTEM_SIMULATION_TIME = SYSTEM_DELTA_T * SAMPLES;

        this.is_template_loaded = false;

        this.knob_values = null;
        this.limit_values = [];
        this.selected_knob = null;

        this.gain = 0;

        this.initDisplay();
    }


    initDisplay() {
        this.initialSetup();
        this.SetParamLabels();
        // console.log(this.knob_values)
        this.rerfeshDisplay();


        //this.PrintParamLabels();
    }


    initialSetup() {
        this.resize_svg(false);
        this.manageHandler();
    }
    resize_svg(reload_on_resize) {
        var width_screen = $('.kh_display');
        var fit_screen = $('.kh_display_board');
        this.width_screen = width_screen.width();

        this.gain = 1920 / width_screen.width();

        console.log(this.gain)

        // $(fit_screen).prop('viewBox', (-width_screen.width() + 5).toString + ' 0 960 540' )
        $(fit_screen).width(width_screen.width())

        if (reload_on_resize == true) {
            this.rerfeshDisplay();
        }
    }

    manageHandler() {
        var slf = this;
        window.addEventListener('resize', function () {
            slf.resize_svg(true);
        });
    }

    rerfeshDisplay() {
        this.is_template_loaded = false
        $('.kh_display_board').empty();
        this.StaticEnvelopeScenario(this.SYSTEM_DELTA_T, this.SAMPLES);
        this.is_template_loaded = true
        this.EnvelopeTemplates()
    }

    StaticEnvelopeScenario(SYSTEM_DELTA_T, SAMPLES) {
        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.width_screen);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.width_screen_offset / 20

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset,
            y: 50,
            width: width - 2 * this.width_screen_offset,
            height: 0.001,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset,
            y: 290,
            width: width - 2 * this.width_screen_offset,
            height: 0.1,
            stroke: "#9c9c9c59"
        });
        $(envelope_visualizer).append($bar);

        for (var i = 0; i < 21; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: this.width_screen_offset + i * width_second,
                    y: 270,
                width: 0.1,
                height: 20,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            if (i != 20) {;
                var $br = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: this.width_screen_offset + i * width_second + width_second / 2,
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
        if(this.knob_values == null){
            this.knob_values = [5,15,0,0,0,0]
        }
        var knob = this.knob_values;

        var envelope_visualizer = $('.kh_display_board');
        var width = 1.82 * (this.width_screen);
        var width_second = (width / this.SYSTEM_SIMULATION_TIME) - 2 * this.width_screen_offset / 20

        var in_time = true;
        var curr_width = this.width_screen_offset;
        var knob_conversor_rate = this.SYSTEM_SIMULATION_TIME/360

        // console.log(this.limit_values)

        if (this.is_template_loaded == false) {
            //this.display_wave = true; console.log('--->' + (this.envelopeKnobs)[0].value)
            console.log(333)
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: 5 * width_second,
                height: 1,
                stroke: "red"
            });
            $(envelope_visualizer).append($bar);
            curr_width += 5 *width_second;

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
                width: 15*width_second,
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

    }

    SET_KnobValues(knob_values, index) {
        if (index == null) {
            this.knob_values = knob_values;
            this.is_template_loaded == true
        } else {
            this.knob_values[index] = knob_values;
            // this.limit_knob_values(this.knob_values[index], index);
            this.selected_knob = index;
            console.log(this.knob_values)
        }
        this.rerfeshDisplay();
    }

    limit_knob_values(value, index) {
        this.limit_values = this.knob_max_value[0]
        this.knob_values[index] = value// * (limit_values[index] / 360)
    }


    SetParamLabels() {
        var knob_labels = [];
        knob_labels.push(['Delay [s]', 'Step up [s]', 'Step down [s]']);
        knob_labels.push(['Delay [s]', 'Sustain [s]', 'Decay [s]', 'Amp/step [s]', 'Max. Amp [s]']);

        var knob_max_value = [];
        knob_max_value.push([5, 20, 0, 0, 0, 0]);

        // console.log($(knob_labels[this.wave_shape]).length)

        // var slf = this;
        // $.each($('.envelope-knob_shapes'), function (j, el) {
        //     if (j > $(param_labels[slf.wave_shape]).length - 1) {
        //         $(this).find('input').attr('disabled', true)
        //         $(this).attr('opacity', '0.2')
        //     } else {
        //         $(this).find('input').attr('disabled', false)
        //         $(this).css('opacity', '1')
        //     }

        //     // for (var i = $(param_labels[this.wave_shape]).length -1; i < $('.envelope-knob_shapes').length; i++) {
        //     //     console.log(i)
        //     //     // $(this).find('input').attr('disabled', true)
        //     //     // $(this).css('opacity', '0.2')
        //     // }
        // })
        this.knob_labels = knob_labels;
        this.knob_max_value = knob_max_value;
    }

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


}

class SignalDrawer extends Device {










    // constructor(signal_type, signal_data) {
    //     this.signal_data = signal_data;
    //     this.signal_type = signal_type;
    //     this.sim_time = []
    //     this.sim_y = []
    //     this.sim_velocity = []
    //     this.sim_acceleration = []



    //     this.wave_calc = new WaveCalc();
    // }

    // GenerateSignal() {
    //     console.log(on)
    //     var signal = this.wave_calc(parent.SYSTEM_DELTA_T, parent.SAMPLES)
    //     system_t, system_y, system_v, system_a = signal.GenerateSignalValues(this.signal_type, this.signal_data)

    //     this.sim_time = system_t
    //     this.sim_y = system_y
    //     this.sim_velocity = system_v
    //     this.sim_acceleration = system_a
    //     sgnl = [system_t, system_y, system_v, system_a]
    //     return sgnl;
    // }


}



class KnobAnalog extends Display {
    constructor(SYSTEM_DELTA_T, SAMPLES) {
        super(SYSTEM_DELTA_T, SAMPLES)
        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES
        this.SYSTEM_SIMULATION_TIME = SYSTEM_DELTA_T * SAMPLES;

        this.knob_values = [0, 0, 0, 0, 0, 0];

        this.initializingKnobs();
    }



    onRotateKnob(index) {
        super.SET_KnobValues(this.knob_values[index], index);
        // console.log(this.knob_values);
        // console.log(this.endRotation)
    }

    killTweens() {
        TweenLite.killTweensOf([this.knob]);
    }

    initializingKnobs() {
        var knob = $(".knob_wheel_wave");
        var slf = this;
        Draggable.create(knob, {
            type: "rotation",
            throwProps: true,
            edgeResistance: 1,
            bounds: { minRotation: 0, maxRotation: 360 },
            onDragStart: function () {
                // console.log(this)
                // console.log(this.endRotation)
                slf.killTweens();
            },
            onDrag: function () {
                var index = $(this.target).attr('accesskey');
                slf.knob_values[index] = $(this)[0].endRotation
                // console.log(this)
                slf.onRotateKnob(index);

            },
            onThrowUpdate: function () {
                var index = $(this.target).attr('accesskey');
                slf.knob_values[index] = $(this)[0].endRotation
                // console.log(this)
                slf.onRotateKnob(index);

            },
            snap: function (endValue) {
                console.log(2)
            }
        });
        super.SET_KnobValues(this.knob_values);
    }
}

