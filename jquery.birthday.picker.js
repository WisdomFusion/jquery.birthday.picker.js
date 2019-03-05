/**
 * jquery.birthday.picker.js 1.0
 * (c) 2018 WisdomFusion
 * jquery.birthday.picker.js may be freely distributed under the MIT license.
 */
(function ($) {
    $.extend({
        birthdayPicker: function (options) {
            var defaults = {
                yearSelector:     '#select-year',  // 默认年份 <select id="select-year"
                monthSelector:    '#select-month', // 默认月份 <select id="select-month"
                daySelector:      '#select-day',   // 默认日期 <select id="select-day"
                minimumAge:       0,               // 优化年份选择，默认0到100岁
                maximumAge:       100,
                yearDefaultText:  '年份',
                monthDefaultText: '月份',
                dayDefaultText:   '日期',
                defaultValue:     0                // 类似'选择年份'这种 placeholder 项的值，便于作空值判断
            };

            var opts = $.extend({}, defaults, options);

            var $yearSelector  = $(opts.yearSelector);
            var $monthSelector = $(opts.monthSelector);
            var $daySelector   = $(opts.daySelector);

            // 初始化
            $yearSelector.html('<option value="' + opts.defaultValue + '">' + opts.yearDefaultText + '</option>');
            $monthSelector.html('<option value="' + opts.defaultValue + '">' + opts.monthDefaultText + '</option>');
            $daySelector.html('<option value="' + opts.defaultValue + '">' + opts.dayDefaultText + '</option>');

            // 年份列表
            var yearNow      = new Date().getFullYear();
            var yearStart    = yearNow - opts.minimumAge;
            var yearEnd      = yearStart - opts.maximumAge;
            var yearSelected = $yearSelector.attr('rel');

            for (var y = yearStart; y >= yearEnd; y--) {
                var selected = yearSelected === y ? 'selected' : '';
                var yearStr  = '<option value="' + y + '" ' + selected + '>' + y + '年</option>';
                $yearSelector.append(yearStr);
            }

            // 月份列表
            var monthSelected = $monthSelector.attr('rel');
            for (var m = 1; m <= 12; m++) {
                var selected = monthSelected === m ? 'selected' : '';
                var monthStr = '<option value="' + m + '" ' + selected + '>' + m + '月</option>';
                $monthSelector.append(monthStr);
            }

            // 日期列表，仅当选择了年月
            function buildDays() {
                if ($yearSelector.val() === 0 || $monthSelector.val() === 0) {
                    // 未选择年份或者月份
                    $daySelector.html('<option value="' + opts.defaultValue + '">' + opts.dayDefaultText + '</option>');
                } else {
                    $daySelector.html('<option value="' + opts.defaultValue + '">' + opts.dayDefaultText + '</option>');

                    var year     = parseInt($yearSelector.val());
                    var month    = parseInt($monthSelector.val());
                    var dayCount = 0;

                    switch (month) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            dayCount = 31;
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            dayCount = 30;
                            break;
                        case 2:
                            dayCount = 28;
                            if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) { // 闰年 2 月 29 天
                                dayCount = 29;
                            }
                            break;
                        default:
                            break;
                    }

                    var daySel = $daySelector.attr('rel');
                    for (var d = 1; d <= dayCount; d++) {
                        var selected = daySel === d ? 'selected' : '';
                        var dayStr   = '<option value="' + d + '" ' + selected + '>' + d + '日</option>';
                        $daySelector.append(dayStr);
                    }
                }
            }

            $monthSelector.change(function () {
                buildDays();
            });

            $yearSelector.change(function () {
                buildDays();
            });

            if ($daySelector.attr('rel') !== '') {
                buildDays();
            }
        }
    });

})(jQuery);
