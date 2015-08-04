$(document).ready(function() {
    var menu = new Menu();

    $('.added-menu-controls .icon.lock').on('click', menu.unlockMenuForPublicAccess);

    $('.add-cource-at-menu').on('click', menu.addCoursecTrigger);

    menu.dishesRotator();
});

var Menu = function() {
    /**
     * Show/Hide Menu from public access
     * @param e
     */
    this.unlockMenuForPublicAccess = function(e) {
        alert('a');
        e.preventDefault();
        var self = $(this);
        $(this).addClass('active');

        $.ajax({
            url: '',
            beforeSend: function() {},
            success: function(resp) {
                if(resp.status == 'success') {
                    self.addClass('active')
                }
            },
            error: function () {}
        });
    }

    this.addCoursecTrigger = function(e) {
        e.preventDefault();
        var $newEl = $('.add-cources-container').find('.prototype').clone().removeClass('prototype').removeClass('hidden');
        $newEl.find('.col-xs-12 label').text('New Course');

        $('.add-cources-container').append($newEl);
    }

    this.dishesRotator = function() {
        $('.dish-prev-arrow').on('click', function(e) {
            e.preventDefault();
            var current = $(this).closest('.dish-carousel-item_').data('dish_number'); // 0 return false else open 1
            if(current > 0) {
                var containerAmt = current - 1;
                console.log(containerAmt);
                container = $(this).closest('.menu-dishs-carousel');
                container.find('.dish-carousel-item_').css({display: 'none'});
                container.find('.dish-carousel-item_[data-dish_number='+containerAmt+']').show();
            } else {
                return false;
            }
        });

        $('.dish-next-arrow').on('click', function(e) {
            e.preventDefault();
            var current = $(this).closest('.dish-carousel-item_').data('dish_number'); // 1 return false else open 0
            if(current < $(this).closest('.menu-dishs-carousel').length) {
                var containerAmt = current + 1;
                container = $(this).closest('.menu-dishs-carousel');
                container.find('.dish-carousel-item_').css({display: 'none'});
                container.find('.dish-carousel-item_[data-dish_number='+containerAmt+']').show();
            } else {
                return false;
            }
        });
    }
}