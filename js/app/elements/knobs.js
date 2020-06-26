class KnobAnalog extends Display {
    constructor(SYSTEM_DELTA_T, SAMPLES) {
        //  Initializing the Display
        super(SYSTEM_DELTA_T, SAMPLES)

        //  SYSTEM CONSTANTS
        this.SYSTEM_DELTA_T = SYSTEM_DELTA_T
        this.SAMPLES = SAMPLES

        //  Init Knobs Array
        this.knob_values_raw = [0, 0, 0, 0, 0, 0];
        this.knob_template_values = [];

        //  Init Knob functionality
        this.initKnob();
    }

    //  ROTATION TRIGGERING
    onRotateKnob(index) {
        super.SET_KnobValues(this.knob_values_raw[index], index);
    }



    killTweens() {
        TweenLite.killTweensOf([this.knob]);
    }
    //  !!! ROTATION TRIGGERING

    initKnob() {
        this.SetKnobParams();
        this.initializingKnobs();
    }

    SetKnobParams() {
        this.knob_template_values.push([5, 15, 0, 0, 0, 0]);
    }

    initializingKnobs() {
        this.knob = $(".knob_wheel_wave");
        var slf = this;
        Draggable.create(this.knob, {
            type: "rotation",
            throwProps: true,
            edgeResistance: 1,
            bounds: { minRotation: 0, maxRotation: 360 },
            onDragStart: function () {
                slf.killTweens();
            },
            onDrag: function () {
                var index = $(this.target).attr('accesskey');
                slf.knob_values_raw[index] = $(this)[0].endRotation
                slf.onRotateKnob(index);
            },
            onThrowUpdate: function () {
                var index = $(this.target).attr('accesskey');
                slf.knob_values_raw[index] = $(this)[0].endRotation
                slf.onRotateKnob(index);
            },
            snap: function (endValue) {
            }
        });
        super.SET_KnobValues(this.knob_values_raw);
        this.updateRotation(0);
    }

    updateRotation(index) {
        for (var i = 0; i < 6; i++) {
            console.log(this.knob_template_values[index])
            TweenMax.set(this.knob[i], {
                rotation:
                    this.knob_template_values[index][i] * 30
            });
        }
    }

}









