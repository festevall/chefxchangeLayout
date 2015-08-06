var booking = ['2015-08-07'],
    bookingPending = ['2015-08-21', '2015-08-26'],
    cooking = ['2015-08-10', '2015-08-17'];

$(document).ready(function() {

    var account = new Account();

    account.enableScheduleDatepicker();

    $('.switcher-container').on('click', account.enableSwitcher);

    $('.chef-rank-changer').on('click', account.changeChefRankAction);

    $('.add-account-select').on('click', account.addSelectForChoosePropAtAccount);

    $('.languages-container').on('click', '.remove-select-section', account.removeSelectItem);

    $('.add-experience-button').on('click', account.showAddExperienceContainer);
    $('.dissmiss-new-experience').on('click', account.hideAddExperienceContainer);
    $('.experience-workflow-container').on('click', '.edit-workflow', account.editExperience);

    $('.bussy-radio-container').on('click', function() {
        var showDatepicker = $(this).data('show_datepicker');
        console.log(showDatepicker);
        if(showDatepicker) {
            $('.bussy-datepicker-container').show().find('.chefxchange-input').removeAttr('disabled');
        } else {
            $('.bussy-datepicker-container').hide().find('.chefxchange-input').attr('disabled', 'disabled');
        }
    });

    $('.added-menu-controls').on('mouseover', '.icon', function() {
        var tooltip = $(this).closest('.added-menu-controls').find('.menu-tooltip-container'),
            tooltipText = $(this).data('tooltip_text'),
            tooltipPosition = -21;

        tooltip.text(tooltipText).fadeIn(200);

        if($(this).hasClass('.lock')) {
            tooltipPosition = -21;
        } else if($(this).hasClass('pencil')) {
            tooltipPosition = 5;
        } else if($(this).hasClass('eya')) {
            tooltipPosition = 27;
        } else if($(this).hasClass('recycle-bin')) {
            tooltipPosition = 52;
        }
            tooltip.css('left', tooltipPosition + '%');
    });

    $('.added-menu-controls').on('mouseout', '.icon', function() {
        $(this).closest('.added-menu-controls').find('.menu-tooltip-container').fadeOut(300);
    })

});

var Account = function() {

    /**
     * Switcher at Willing to travell setting
     * @param e
     */
    this.enableSwitcher = function(e) {
        e.preventDefault();
        var $slider = $('.travel-range-slider');

        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $slider.slider('enable');
            $('#willing-to-travel-value').val(1);
        } else {
            $slider.slider('disable');
            $('#willing-to-travel-value').val(0);
        }
    }

    /**
     * Schedule datepicker
     */
    this.enableScheduleDatepicker = function() {
        $('#schedule-datepicker').datepicker({
            'autosize': true,
            firstDay: 1,
            beforeShowDay: function(date) {
                if(booking.indexOf($.datepicker.formatDate('yy-mm-dd', date)) != -1) {
                    return [false, 'booking-done', 'Booking past'];
                } else if(bookingPending.indexOf($.datepicker.formatDate('yy-mm-dd', date)) != -1) {
                    return [false, 'booking-pending', 'Booking'];
                } else if(cooking.indexOf($.datepicker.formatDate('yy-mm-dd', date)) != -1) {
                    return [false, 'cooking', 'Cooking'];
                } else {
                    return [false, '', ''];
                }
            }
        });
    }

    /**
     * Chef rank at settings
     */
    this.changeChefRankAction = function() {
        var $input = $('#chef-rank-input'),
            $icons = $('.rank-container').find('.icon'),
            $icon = $(this).find('.icon'),
            value = $(this).data('value');

        $icons.addClass('gray');

        $icon.removeClass('gray');

        $input.val(value)

    }

    /**
     * Select for cuisines, languages, courses
     * @param e
     */
    this.addSelectForChoosePropAtAccount = function(e) {
        e.preventDefault();
        var $lastParent = $(this).closest('.chef-about-additional-info-section'),
            $repeatedElement = $lastParent.find('.prototype').clone().removeClass('prototype'),
            $appendElement = $lastParent.find('.languages-container'),
            name = $repeatedElement.find('.repeated-select').data('name'),
            amountOfRepeats = $appendElement.data('items_repeat'),
            $newSelect = $repeatedElement.find('.repeated-select').attr('name', name).removeClass('repeated-select').addClass('fancySelect');
        if($appendElement.find('.fancySelect').length < amountOfRepeats) {
            $appendElement.append($repeatedElement.removeClass('hidden'));
            $('.languages-container').find('.fancySelect').transformSelect();
        }
    }

    /**
     * Remove select-item from setting
     * @param e
     */
    this.removeSelectItem = function(e) {
        e.preventDefault();
        $(this).closest('.language-item').remove();
    }

    this.showAddExperienceContainer = function(e) {
        e.preventDefault();
        var $closestParent = $(this).closest('.chef-about-additional-info-section'),
            $appendElement = $closestParent.find('.experience-workflow-container'),
            $newExpContainer = $closestParent.find('.add-experience-container');

        $(this).addClass('hidden');

        $appendElement.addClass('hidden');
        $newExpContainer.removeClass('hidden');

    }

    this.hideAddExperienceContainer = function(e) {
        e.preventDefault();
        var $closestParent = $(this).closest('.chef-about-additional-info-section'),
            $appendElement = $closestParent.find('.experience-workflow-container'),
            $newExpContainer = $closestParent.find('.add-experience-container');

        $closestParent.find('.add-experience-button').removeClass('hidden');

        $appendElement.removeClass('hidden');
        $newExpContainer.addClass('hidden');
    }

    this.editExperience = function() {
        var _this = $(this),
            $closestParent = _this.closest('.chef-about-additional-info-section'),
            $newExpContainer = $closestParent.find('.add-experience-container'),
            $newElement = _this.closest('.experience-workflow-item'),
            $itemsContainer = $closestParent.find('.experience-workflow-container'),
            name = $newElement.find('.experience_name').text(),
            held = $newElement.find('.position_held').text(),
            description = $newElement.find('.experience_description').text(),
            dateTime = $newElement.find('.experience_date').text().split(' - ');

        $newExpContainer.find('.companyName').val(name);
        $newExpContainer.find('.positionHeld').val(held);
        $newExpContainer.find('.experienceDescription').val(description);

        $newExpContainer.removeClass('hidden');
        $itemsContainer.addClass('hidden');
    }

}