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
            bounds: { minRotation: 0, maxRotation: 270 },
            onDragStart: function () {
                slf.killTweens();
            },
            onDrag: function () {
                var index = $(this.target).attr('accesskey');
                var angle = $(this)[0].endRotation
                slf.knob_values_raw[index] = angle;
                slf.tickManager(angle, this);
                slf.onRotateKnob(index);
            },
            onThrowUpdate: function () {
                var index = $(this.target).attr('accesskey');
                var angle = $(this)[0].endRotation
                slf.knob_values_raw[index] = angle;
                slf.tickManager(angle, this);
                slf.onRotateKnob(index);
            },
            snap: function (endValue) {
            }
        });
        super.SET_KnobValues(this.knob_values_raw);
        this.updateRotation(0);
        //this.tickManager();
    }

    tickManager(angle, container) {
        if (angle == null && container == null) {
            var ticks = $('#knobBG .ticks')
            var tick = $(ticks).find('.tick')
            var ang = this.knob_template_values;

            var ii = 0;
            $.each($(tick), function (i, el) {
                // console.log(el)

                if(ii % 11 == 0){
                    ii=0;
                }{
                    ii+=1;
                    $(this).attr('class', 'tick on');
                }

                // $(el).


                // if (i < leds_on) {
                //     console.log(i)
                //     $(this).attr('class', 'tick on');
                // } else {
                //     $(this).attr('class', 'tick off');
                // }

            })
        } else {
            // console.log(angle)
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

            var knob_container = container.target.parentElement;
            var ticks = $(knob_container).find('.tick')
            $.each($(ticks), function (i) {
                if (i < leds_on) {
                    // console.log(i)
                    $(this).attr('class', 'tick on');
                } else {
                    $(this).attr('class', 'tick off');
                }

            })
        }

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









