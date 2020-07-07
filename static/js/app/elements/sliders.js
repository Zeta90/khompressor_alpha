class Sliders{
    InitSliders(){
        $('.simulation_range').on('change', function(){
            console.log($(this).val())
        })
    }
}