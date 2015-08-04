$(document).ready(function() {

    var preloadModals = ['#awesome_menu', '#schedule_pending', '#pre_approve', '#accepted_by_chef', '#pre_approve-1', '#past_booking'];

    for(var key in preloadModals) {
        if(preloadModals.indexOf(document.location.hash) != -1) {
            $(document.location.hash).modal('show');
        }
    }

    /**
     * Custom controls
     */
    $('.fancySelect').transformSelect({
    });
    $('.fancyCheckbox').transformCheckbox({
        checked: "img/checkbox-checked.png",
        unchecked: "img/checkbox-unchecked.png",
        changeHandler: function(is_checked) {
            if(is_checked) {
                $(this).parent().find('input[type=checkbox]').removeAttr('checked');
            } else {
                $(this).parent().find('input[type=checkbox]').attr('checked', 'checked');
            }
        }
    });
    $('.fancyRadio').transformRadio({
        checked : "img/radio-checked.png",
        unchecked : "img/radio-unchecked.png"
    });

    /**
     * Simple datepicker for inputs
     */
    $('.datepicker').datepicker({
        'beforeShow': function(input, picker) {
            console.log(picker.dpDiv);
            picker.dpDiv[0].className += ' simple-datepicker';
        }
    });

    /**
     * Carousel at home page
     */
    $('.slick-home-slider').slick({
        'slidesToShow': 6,
        'slidesToScroll': 6
    });

    /**
     * Carousel at chef account that rotate menus
     */
    $('.chef-profile-menus-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        mobileFirst: true
    });

    /**
     * Slider at chef settings page
     */
    $('.travel-range-slider').slider({
        range: 'min',
        min: 0,
        max: 500,
        value: 250,
        slide: function(event, ui) {
            $('.travel-max-value').text(ui.value);
        }
    });

    /**
     * Slider at search results
     */

    $('#search-price-slider').slider({
        range: true,
        min: 0,
        max: 200,
        values: [50, 180],
        slide: function(event, ui) {
            $('.price-view-min').text(ui.values[0]);
            $('.price-view-max').text(ui.values[1]);
        }
    });

    $('.search-rank-changer').on('click', function(e) {
        e.preventDefault();
        var val = $(this).data('value');
        $('#ranking_value_at_search').val(val);
        $('.search-rank-changer').find('.icon').addClass('gray');
        $(this).find('.icon').removeClass('gray');
    });
});