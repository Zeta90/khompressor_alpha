class KnobAnalog extends Display {
    constructor(SYSTEM_DELTA_T, SAMPLES, selected_template) {
        //  Initializing the Display
        super(SYSTEM_DELTA_T, SAMPLES)

        //  SYSTEM CONSTANTS
        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES

        //  Init Knobs Array

        this.knob_seconds = [0, 0, 0, 0, 0, 0];
        this.knob_angles = [0, 0, 0, 0, 0, 0];

        this.knob_template_values = [];
        this.knob_template_limits = [];
        this.knob_template_labels = []

        // this.selected_template = selected_template;
        this.selected_template = 0;
        this.current_template_values = [];
        this.current_template_limits = [];
        this.current_template_labels = [];
        //  Init Knob functionality
        this.initKnobs();
    }

    //  INIT AND SETUP
    initKnobs() {
        this.SetKnobParams();
        this.defineKnobs();
    }

    SetKnobParams() {
        this.knob = $(".knob_wheel_wave");
        this.knob_template_values.push([5, 15, 0, 0, 0, 0]);

        this.knob_template_limits.push([[0, 5], [0, 20], [0, 20], [0, 20], [0, 20], [0, 20]]);

        this.knob_template_labels.push(['Delay [s]', 'Step time [s]', 'Step off [s]'])

        this.current_template_values = this.knob_template_values[this.selected_template];
        this.current_template_limits = this.knob_template_limits[this.selected_template];
        this.current_template_labels = this.knob_template_labels[this.selected_template];
    }

    printKnobLabels() {
        var knob_labels = $('.knob_labels .label_container .lbl_glow');
        var slf = this;
        $.each(knob_labels, function (i, el) {
            if (i < slf.current_template_labels.length) {
                var lbl_val = slf.current_template_labels[i];
                $(el).html(lbl_val);
                $(slf.knob[i]).removeClass('active');
                $(slf.knob[i]).addClass('active');
            } else {
                var ticks = $(slf.knob[i]).parent().children('.ticks').children('.tick');
                console.log($(slf.knob[i]))
                $(slf.knob[i]).removeClass('active');
                $(el).html('');
            }
        })
    }
    //  **********************

    killTweens() {
        TweenLite.killTweensOf([this.knob]);
    }

    updateInitialRotation() {
        for (var i = 0; i < 6; i++) {
            TweenMax.set(this.knob[i], {
                rotation:
                    this.knob_angles[i]
            });
        }
    }

    defineKnobs() {
        var slf = this;
        Draggable.create(this.knob, {
            type: "rotation",
            throwProps: true,
            edgeResistance: 1,
            bounds: { minRotation: 0, maxRotation: 270 },
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
        this.setSuperData();
    }

    setInitialKnobParams() {
        var slf = this;
        $.each(this.knob, function (i, el) {
            var limits = slf.current_template_limits[i];
            var time_range = limits[1] - limits[0];

            var seconds = slf.current_template_values[i];
            var angle = slf.current_template_values[i] * (270 / time_range);

            slf.knob_angles[i] = angle;
            slf.knob_seconds[i] = seconds;
        })
    }

    rotationEvent(knob) {
        var index = $(knob.target).attr('accesskey');
        var angle = $(knob)[0].endRotation
        var limits = this.knob_template_limits[this.selected_template][index];
        var time_range = limits[1] - limits[0];
        var seconds = angle * time_range / 270

        this.knob_angles[index] = angle;
        this.knob_seconds[index] = seconds;
        this.ledsTickOn();
        this.setSuperData(index);
    }

    //  SUPER - DISPLAY
    setSuperData(index) {
        super.setFromChildKnobValues(this.knob_angles, this.knob_seconds)
    }

    //  LEDS
    ledsTickOn() {
        var ticks = $('#knobBG .ticks')
        var slf = this;
        $.each(ticks, function (i, eli) {
            var current_angle = slf.knob_angles[i];
            var total_leds_on = slf.ledsManager(current_angle);
            var tick = $(eli).find('.tick');

            $.each(tick, function (j, elj) {

                if (j < total_leds_on) {
                    if ($(slf.knob[i]).hasClass('active')) {
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