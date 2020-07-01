$(document).ready(function () {
    //  RUN
    Device.oscillator.initDevice();
})

class Device {
    //  SYSTEM SETTINGS
    static settings = {
        SYSTEM_DELTA_T: 0.1,
        SYSTEM_SIMULATION_SAMPLES: 200,
        SYSTEM_SIMULATION_TIME: 20,

        knobs: [],
        knob_angles: [0, 0, 0, 0, 0, 0],
        knob_seconds: [0, 0, 0, 0, 0, 0],

        max_knob_rotation: 270,

        selected_template: 0,

        screen_width: $('.kh_display_board').width(),
        screen_width_offset: 50,

        screen_h: $('.kh_display_board').height(),
        screen_h_offset: 20,

        sreen_rate : 1.82,

        knob_template_values: [],
        knob_template_limits: [],
        knob_template_labels: [],

        current_template_values: [],
        current_template_limits: [],
        current_template_labels: [],

        //  MECHANICS
        trolley_x: 0,
        trolley_velocity: 0,
        max_trolley_x:0,

        y: [],
        // v: [],
        t: [0],

    };

    static classes = {
        _Knobs: null,
        _Display: null,
        _Physics: null,
    }

    static oscillator = {
        initDevice: function () {
            this.loadTriggers();
            this.defineTemplateSettings();

            this.resetDevice();
        },

        defineTemplateSettings() {
            Device.settings.knob_template_values.push([5, 15, 0, 0, 0, 0]);
            Device.settings.knob_template_values.push([5, 5, 1, 0.75, 0, 0]);
            Device.settings.knob_template_values.push([5, 1, 90, 0.75, 0, 0]);
            Device.settings.knob_template_values.push([1, 10, 15, 2, 1, 0]);

            Device.settings.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 20], [0, 20], [0, 20]]);
            Device.settings.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 1], [0, 20], [0, 20]]);
            Device.settings.knob_template_limits.push([[0, 5], [0, 10], [0, 180], [0, 1], [0, 20], [0, 20]]);
            Device.settings.knob_template_limits.push([[0, 2], [0, 20], [0, 50], [0, 20], [0, 20], [0, 20]]);

            Device.settings.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]']);
            Device.settings.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]', 'Proportion [%]']);
            Device.settings.knob_template_labels.push(['Delay [s]', 'Frequency [Hz]', 'Phase [rads]']);
            Device.settings.knob_template_labels.push(['Delay [s]', 'Acceleration range [s]', 'Max. V [m/s]', 'Acc [rads]', 'Braking [rads]']);
        },

        loadTriggers() {
            var slf = this;
            //  SELECT TEMPLATE BUTTONS
            $('.osc_btn').click(function () {
                var template = $(this).attr('itemid');
                Device.settings.selected_template = parseInt(template);

                slf.resetDevice();
            })
        },

        refreshDisplay() {
            Device.classes._Display.refreshDisplay();
        },

        selectTemplateValues() {
            Device.settings.current_template_values = Device.settings.knob_template_values[Device.settings.selected_template];
            Device.settings.current_template_limits = Device.settings.knob_template_limits[Device.settings.selected_template];
            Device.settings.current_template_labels = Device.settings.knob_template_labels[Device.settings.selected_template];
        },

        resetDevice() {
            this.selectTemplateValues();

            Device.classes._Knobs = new KnobAnalog();
            Device.classes._Display = new Display();
            //Device.classes._Display.refreshDisplay();
        }
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


