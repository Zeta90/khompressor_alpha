class Display {
    constructor() {
        this.device_settings = Device.settings;

        //  SCREEN PARAMS
        this.screen_width = $('.kh_display_board').width();
        //  Offset (screen margin)
        this.screen_width_offset = 20;

        //  Knobs
        this.knob_seconds = [0, 0, 0, 0, 0, 0];
        this.knob_angles = [0, 0, 0, 0, 0, 0];

        this.selected_template = 0;

        //  Display Image Trigger
        this.initDisplay();
    }

    initDisplay() {
        console.log('dis inidis')
        this.resize_svg(false);
        this.manageHandler();
    }

    resize_svg() {
        var screen_width = $('.kh_screen').width();
        var screen_height = $('.kh_screen').height();
        var fit_screen = $('.kh_display_board');
        this.device_settings.screen_width = screen_width;
        this.device_settings.screen_h = screen_height;
        $(fit_screen).width(screen_width);
        $(fit_screen).height(screen_height);
        console.log('resi')

        // var glow = $('.kh_display_glow');
        // $(glow).css('width', this.device_settings.screen_width + 2 + 'px')
        //     .css('height', this.device_settings.screen_width + 2 + 'px');

        this.refreshDisplay();

    }

    manageHandler() {
        var slf = this;
        window.addEventListener('resize', function () {
            slf.resize_svg();
        });
    }

    refreshDisplay() {
        $('.kh_display_board').empty();
        SignalGenerator.StaticEnvelopeScenario();
        SignalGenerator.EnvelopeTemplates()
    }


}