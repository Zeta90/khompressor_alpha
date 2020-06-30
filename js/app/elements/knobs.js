class KnobAnalog {
    constructor() {
        //  SYSTEM CONSTANTS
        this.SYSTEM_DELTA_T = Device.settings.SYSTEM_DELTA_T
        this.SAMPLES = Device.settings.SYSTEM_SIMULATION_SAMPLES

        //  Init Knobs Array

        this.knob_seconds = Device.settings.knob_seconds;
        this.knob_angles = Device.settings.knob_angles;

        this.knob_template_values = [];
        this.knob_template_limits = [];
        this.knob_template_labels = []

        // this.selected_template = selected_template;
        this.selected_template = Device.settings.selected_template;
        this.current_template_values = [];
        this.current_template_limits = [];
        this.current_template_labels = [];
        //  Init Knob functionality

        this.device_settings = Device.settings;
        this.oscillator = Device.oscillator;

        this.initKnobs();
    }

    //  INIT AND SETUP
    initKnobs() {
        // this.SetKnobParams();
        this.defineKnobs();
    }

    SetKnobParams() {

        // this.knob_template_values.push([5, 15, 0, 0, 0, 0]);
        // this.knob_template_values.push([5, 5, 1, 0.75, 0, 0]);
        // this.knob_template_values.push([5, 1, 90, 0.75, 0, 0]);

        // this.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 20], [0, 20], [0, 20]]);
        // this.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 1], [0, 20], [0, 20]]);
        // this.knob_template_limits.push([[0, 5], [0, 10], [0, 180], [0, 1], [0, 20], [0, 20]]);

        // this.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]'])
        // this.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]','Proportion [%]'])
        // this.knob_template_labels.push(['Delay [s]', 'Frequency [Hz]', 'Phase [rads]'])

        // this.device_settings.current_template_values = this.device_settings.knob_template_values[this.device_settings.selected_template];
        // this.device_settings.current_template_limits = this.device_settings.knob_template_limits[this.device_settings.selected_template];
        // this.device_settings.current_template_labels = this.device_settings.knob_template_labels[this.device_settings.selected_template];
    }

    printKnobLabels() {
        var knob_labels = $('.knob_labels .label_container .lbl_glow');
        var slf = this;
        $.each(knob_labels, function (i, el) {
            console.log(slf.device_settings.current_template_labels)
            if (i < slf.device_settings.current_template_labels.length) {
                var lbl_val = slf.device_settings.current_template_labels[i];
                $(el).html(lbl_val);
                console.log(slf.device_settings.knob)
                $(slf.device_settings.knob[i]).removeClass('active');
                $(slf.device_settings.knob[i]).addClass('active');
            } else {
                var ticks = $(slf.device_settings.knob[i]).parent().children('.ticks').children('.tick');
                $(slf.device_settings.knob[i]).removeClass('active');
                $(el).html('');
            }
        })
    }
    //  **********************

    killTweens() {
        TweenLite.killTweensOf([this.device_settings.knob]);
    }

    updateInitialRotation() {
        for (var i = 0; i < 6; i++) {
            TweenMax.set(this.device_settings.knob[i], {
                rotation:
                    this.device_settings.knob_angles[i]
            });
        }
        // this.oscillator.refreshDisplay();
    }

    defineKnobs() {
        this.device_settings.knob = $(".knob_wheel_wave");
        var slf = this;
        Draggable.create(slf.device_settings.knob, {
            type: "rotation",
            throwProps: true,
            edgeResistance: 1,
            bounds: { minRotation: 0, maxRotation: slf.device_settings.max_knob_rotation },
            onDragStart: function () {
                slf.killTweens();
            },
            onDrag: function () {
                slf.rotationEvent(this);
            },
            onThrowUpdate: function () {
                slf.rotationEvent(this);
            },
            snap: function (endValue) {
            }
        });

        this.printKnobLabels();
        this.setInitialKnobParams();    //  Sets the class vars (initial) | knob_angles AND knob_seconds |
        this.updateInitialRotation();   //  Sets the initial knob position
        this.ledsTickOn();              //  Turns on the leds
        // this.setSuperData();
    }

    setInitialKnobParams() {
        var slf = this;
        $.each(slf.device_settings.knob, function (i, el) {
            var limits = slf.device_settings.current_template_limits[i];
            var time_range = limits[1] - limits[0];

            var seconds = slf.device_settings.current_template_values[i];
            var angle = slf.device_settings.current_template_values[i] * (slf.device_settings.max_knob_rotation / time_range);
            console.log(slf.device_settings.knob_angles)
            slf.device_settings.knob_angles[i] = angle;
            slf.device_settings.knob_seconds[i] = seconds;
        })
    }

    rotationEvent(knob) {
        var index = $(knob.target).attr('accesskey');
        var angle = $(knob)[0].endRotation;

        var limits = this.device_settings.knob_template_limits[this.device_settings.selected_template][index];
        var time_range = limits[1] - limits[0];
        var seconds = angle * time_range / this.device_settings.max_knob_rotation;

        console.log(this.device_settings.knob_angles)

        this.device_settings.knob_angles[index] = angle;
        this.device_settings.knob_seconds[index] = seconds;

        this.ledsTickOn();
        this.oscillator.refreshDisplay();
    }

    //  LEDS
    ledsTickOn() {
        var ticks = $('#knobBG .ticks');
        var slf = this;
        $.each(ticks, function (i, eli) {
            var current_angle = slf.device_settings.knob_angles[i];
            var total_leds_on = slf.ledsManager(current_angle);
            var tick = $(eli).find('.tick');

            $.each(tick, function (j, elj) {

                if (j < total_leds_on) {
                    if ($(slf.device_settings.knob[i]).hasClass('active')) {
                        $(this).attr('class', 'tick on');
                    } else {
                        $(this).attr('class', 'tick off');
                    }
                } else {
                    $(this).attr('class', 'tick off');
                }
            })
        })
    }

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
    }
}