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

// })

$(document).ready(function () {
    //  RUN
    var device;
    var device = new Device();
})

class Device {
    constructor() {
        //  SYSTEM CONSTANTS
        this.SYSTEM_DELTA_T = 0.1
        this.SAMPLES = 200

        // // Knobs (wheels)
        // this.knob_labels = [];

        // //  Waves
        // this.wave_index = 0;

        //  MAIN TRIGGER
        this.runOscillator()
        //  MAIN TRIGGER
    }

    runOscillator() {
        new KnobAnalog(this.SYSTEM_DELTA_T, this.SAMPLES)
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


