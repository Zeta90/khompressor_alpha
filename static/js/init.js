$(document).ready(function () {
    //  RUN
    Device.device.initDevice();
    console.log(Device.settings.screen_width)
})

class Device {
    //  SYSTEM SETTINGS
    static settings = {
        //  SYSTEM BASE CALCULATION DATA
        SYSTEM_DELTA_T: 0.1,
        SYSTEM_SIMULATION_SAMPLES: 200,
        SYSTEM_SIMULATION_TIME: 20,

        //  KNOBS
        knobs: [],
        knob_angles: [0, 0, 0, 0, 0, 0],
        knob_seconds: [0, 0, 0, 0, 0, 0],
        max_knob_rotation: 270,

        //  SLIDERS
        sliders_absolutes: [10/100, 50/100, 1, 0/1000],
        device_stage: 0,

        selected_template: 0,

        screen_width: $('.kh_display_board').width(),
        screen_width_offset: 50,

        screen_h: $('.kh_display_board').height(),
        screen_h_offset: 20,

        sreen_rate: 1.82,

        knob_template_values: [],
        knob_template_limits: [],
        knob_template_labels: [],

        current_template_values: [],
        current_template_limits: [],
        current_template_labels: [],

        //  MECHANICS
        trolley_x: 0,
        trolley_velocity: 0,
        max_trolley_x: 0,

        y: [],
        t: [],
        v: [],
        a: [],

    };

    static classes = {
        _Knobs: null,
        _Display: null,
        _Physics: null,
    }

    static device = {
        initDevice: function () {
            this.loadTriggers();
            this.defineTemplateSettings();



            this.resetDevice();
        },

        loadTriggers() {
            var slf = this;
            //  SELECT TEMPLATE BUTTONS
            // $('.osc_btn').click(function () {
            //     var template = $(this).attr('itemid');
            //     Device.settings.selected_template = parseInt(template);

            //     slf.resetDevice();
            // });

            $('.wave_btn_selector').click(function () {
                var index = parseInt($(this).attr('accesskey'));
                Device.settings.selected_template = index;
                // slf.mainLCDInfo(index);
                console.log(Device.settings.selected_template)
                slf.resetDevice();
            })

            $(".button-group > div").click(function () {
                console.log(2);
                $('.button-group > div.active').not(this).removeClass('active');
                $(this).toggleClass("active");
            });

            $('.toggle__lever').click(function () {
                $(this).removeClass('sel_osc');
                $(this).removeClass('sel_sim');
                $('.sel_osc').removeClass('active');
                $('.sel_sim').removeClass('active');
                $('.controls_oscillator').removeClass('active');
                $('.controls_simulator').removeClass('active');

                if ($(this).prop('checked') == true) {
                    $(this).addClass('sel_sim');
                    $('.sel_sim').addClass('active');
                    $('.controls_simulator').addClass('active');
                    Device.settings.device_stage = 1;
                    slf.mainLCDInfo_wave();

                } else {
                    $(this).addClass('sel_osc');
                    $('.sel_osc').addClass('active');
                    $('.controls_oscillator').addClass('active');
                    Device.settings.device_stage = 0;
                    slf.mainLCDInfo_wave();
                }
            })

            $('.simulation_range').on('input', function () {
                var index = $(this).attr('accesskey');

                switch (parseInt(index)) {
                    case 0:
                        Device.settings.sliders_absolutes[0] = $(this).val() / 100;
                        break;
                    case 1:
                        Device.settings.sliders_absolutes[1] = $(this).val() / 100;
                        break;
                    case 3:
                        Device.settings.sliders_absolutes[3] = $(this).val() / 100;
                        break;
                    default:
                        Device.settings.sliders_absolutes[parseInt(index)] = $(this).val();
                }

                slf.LCD_Display_refresh(1);



            })

        },

        LCD_Display_refresh(section) {
            if (section == 0) {

            } else {
                $('.kh_lcd_display .content').html(
                    'Damping (γ): ' + Device.settings.sliders_absolutes[0] +
                    '<br> System frequency (ωn): ' + Device.settings.sliders_absolutes[1] + ' Hz' +
                    '<br> System Gain (K): ' + Device.settings.sliders_absolutes[2] +
                    '<br> System Simulation Compression (x): ' + Device.settings.sliders_absolutes[3] * 100 + '%'
                );
            }
        },

        defineTemplateSettings() {
            //   STEP
            Device.settings.knob_template_values.push([10, 1, 0, 0, 0, 0]);
            //   SQUARE
            Device.settings.knob_template_values.push([5, 15, 0, 1, 0, 0]);
            //   RAMP
            Device.settings.knob_template_values.push([5, 5, 1, 0, 0, 0]);
            //   TRIANGLE
            Device.settings.knob_template_values.push([5, 5, 1, 0.5, 1, 0]);
            Device.settings.knob_template_values.push([5, 1, 90, 5, 0, 0]);
            Device.settings.knob_template_values.push([1, 10, 15, 2, 1, 0]);

            //   STEP
            Device.settings.knob_template_limits.push([[0, 10], [0, 10], [0, 1], [0, 1], [0, 1], [0, 1]]);
            //   SQUARE
            Device.settings.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 20], [0, 20], [0, 20]]);
            //   RAMP
            Device.settings.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 1], [0, 1], [0, 1]]);
            //   TRIANGLE
            Device.settings.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 1], [0, 20], [0, 20]]);
            Device.settings.knob_template_limits.push([[0, 5], [0, 10], [0, 180], [0, 20], [0, 20], [0, 20]]);
            Device.settings.knob_template_limits.push([[0, 2], [0, 20], [0, 50], [0, 20], [0, 20], [0, 20]]);


            //   STEP
            Device.settings.knob_template_labels.push(['Delay [s]', 'Amplitude [m]']);
            //   SQUARE
            Device.settings.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]', 'Amplitude [m]']);
            //   SQUARE
            Device.settings.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Amplitude [m]']);
            //   TRIANGLE
            Device.settings.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]', 'Proportion [%]', 'Amplitude [m]']);
            Device.settings.knob_template_labels.push(['Delay [s]', 'Frequency [Hz]', 'Phase [rads]', 'Amplitude [m]']);
            Device.settings.knob_template_labels.push(['Delay [s]', 'Acceleration range [s]', 'Max. V [m/s]', 'Acc [m/s²]', 'Braking [m/s²]']);
        },

        resetDevice() {
            Device.oscillator.selectTemplateValues();
            this.mainLCDInfo_wave();
            Device.classes._Knobs = new KnobAnalog();
            console.log(Device.classes._Knobs)
            console.log(Device.settings)
            Device.classes._Display = new Display();
            //Device.classes._Display.refreshDisplay();
        },

        refreshDisplay() {
            Device.classes._Display.refreshDisplay();
            // InputCollector.CollectorTemplates();
        },




        // INDICATORS

        mainLCDInfo_wave(index) {
            if (Device.settings.device_stage == 0) {
                var template = 0;
                if (index == null) {
                    template = Device.settings.selected_template;
                } else {
                    template = index
                }
                console.log(Device.settings.selected_template)
                var w_nfo = '';
                switch (template) {
                    case 0:
                        w_nfo = 'Wave: Step <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Amplitude: ' + Device.settings.knob_seconds[1] + ' s';
                        break;
                    case 1:
                        w_nfo = 'Wave: Square <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Step up: ' + Device.settings.knob_seconds[1] + ' s <br> - Step down: ' + Device.settings.knob_seconds[2] + ' s <br> - Amplitude: ' + Device.settings.knob_seconds[3] + ' m';
                        break;
                    case 2:
                        w_nfo = 'Wave: Ramp <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Step up: ' + Device.settings.knob_seconds[1] + ' s <br> - Amplitude: ' + Device.settings.knob_seconds[2] + ' m';
                        break;
                    case 3:
                        w_nfo = 'Wave: Triangle <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Step up: ' + Device.settings.knob_seconds[1] + ' s <br> - Step down: ' + Device.settings.knob_seconds[2] + ' s <br> - Proportion: ' + (Device.settings.knob_seconds[3] * 100) + ' % <br> - Amplitude: ' + Device.settings.knob_seconds[4] + ' m';
                        break;
                    case 4:
                        w_nfo = 'Wave: Sine <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Frequency: ' + 1 / (Device.settings.knob_seconds[1] * 2) + ' Hz <br> - Phase: ' + Device.settings.knob_seconds[2] + ' deg. <br> - Amplitude: ' + (Device.settings.knob_seconds[3]) + ' m';
                        break;
                    case 5:
                        w_nfo = 'Wave: Mecnanic (w. acceleration) <br> - Delay: ' + Device.settings.knob_seconds[0] + ' s <br> - Acceleration time: ' + (Device.settings.knob_seconds[1]) + ' s <br> - Max. Velocity: ' + Device.settings.knob_seconds[2] + ' m/s <br> - Acceleration: ' + (Device.settings.knob_seconds[3]) + ' m/s² <br> - Braking: ' + (Device.settings.knob_seconds[4]) + ' m/s²';
                        break;
                }
                console.log(w_nfo);
                $('.titl_lcd').html('. : | Oscillator | : .');
                $('.kh_lcd_display .content').html(w_nfo);
            } else {
                $('.titl_lcd').html('. : | SIMULATOR | : .');
                $('.kh_lcd_display .content').html(
                    'Damping (γ): ' + Device.settings.sliders_absolutes[0] +
                    '<br> System frequency (ωn): ' + Device.settings.sliders_absolutes[1] + ' Hz' +
                    '<br> System Gain (K): ' + Device.settings.sliders_absolutes[2] +
                    '<br> System Simulation Compression (x): ' + Device.settings.sliders_absolutes[3] * 100 + '%'
                );
            }


        },

        ledsTickOn() {
            var ticks = $('#knobBG .ticks');
            var slf = this;
            $.each(ticks, function (i, eli) {
                var current_angle = Device.settings.knob_angles[i];
                var total_leds_on = slf.ledsManager(current_angle);
                var tick = $(eli).find('.tick');

                $.each(tick, function (j, elj) {
                    if (j < total_leds_on) {
                        if ($(Device.settings.knob[i]).hasClass('active')) {
                            $(this).attr('class', 'tick on');
                        } else {
                            $(this).attr('class', 'tick off');
                        }
                    } else {
                        $(this).attr('class', 'tick off');
                    }
                })

            })
        },

        ledsManager(angle) {
            var leds_on = 1;
            if (angle < 27) {
                leds_on = 1;
            } else if (angle >= 27 && angle < 54) {
                leds_on = 2;
            } else if (angle >= 54 && angle < 81) {
                leds_on = 3;
            } else if (angle >= 81 && angle < 108) {
                leds_on = 4;
            } else if (angle >= 108 && angle < 135) {
                leds_on = 5;
            } else if (angle >= 135 && angle < 162) {
                leds_on = 6;
            } else if (angle >= 162 && angle < 189) {
                leds_on = 7;
            } else if (angle >= 189 && angle < 216) {
                leds_on = 8;
            } else if (angle >= 216 && angle < 243) {
                leds_on = 9;
            } else if (angle >= 243 && angle < 270) {
                leds_on = 10;
            } else if (angle >= 270 && angle < 297) {
                leds_on = 11;
            }
            return leds_on;
        },

        printKnobLabels() {
            var knob_labels = $('.lbl_glow');
            var slf = this;
            $.each(knob_labels, function (i, el) {
                if (i < Device.settings.current_template_labels.length) {
                    var lbl_val = Device.settings.current_template_labels[i];
                    $(el).html(lbl_val);
                    $(Device.settings.knob[i]).removeClass('active');
                    $(Device.settings.knob[i]).addClass('active');
                } else {
                    var ticks = $(Device.settings.knob[i]).parent().children('.ticks').children('.tick');
                    $(Device.settings.knob[i]).removeClass('active');
                    $(el).html('');
                }
            })
        }
    }

    static oscillator = {


        selectTemplateValues() {
            Device.settings.current_template_values = Device.settings.knob_template_values[Device.settings.selected_template];
            Device.settings.current_template_limits = Device.settings.knob_template_limits[Device.settings.selected_template];
            Device.settings.current_template_labels = Device.settings.knob_template_labels[Device.settings.selected_template];
        },


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


