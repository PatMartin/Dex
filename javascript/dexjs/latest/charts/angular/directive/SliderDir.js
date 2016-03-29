'use strict';

angular.module('ui.slider', []).value('uiSliderConfig', {}).directive('uiSlider', ['uiSliderConfig', '$timeout',
function(uiSliderConfig, $timeout)
{
  uiSliderConfig = uiSliderConfig || {};
  return {
    require : 'ngModel',
    compile : function()
    {
      return function(scope, elm, attrs, ngModel)
      {

        function parseNumber(n, decimals)
        {
          return (decimals) ? parseFloat(n) : parseInt(n);
        };

        var options = angular.extend(scope.$eval(attrs.uiSlider) || {}, uiSliderConfig);
        // Object holding range values
        var prevRangeValues = {
          min : null,
          max : null
        };

        var init = function()
        {
          // When ngModel is assigned an array of values then range is expected to be true.
          // Warn user and change range to true else an error occurs when trying to drag handle
          if (angular.isArray(ngModel.$viewValue) && options.range !== true) {
            console.warn('Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true.');
            options.range = true;
          }
          elm.slider(options);
          init = angular.noop;
        };

        // convenience properties
        var properties = ['min', 'max', 'step'];
        // Find out if decimals are to be used for slider
        var useDecimals = (!angular.isUndefined(attrs.useDecimals)) ? true : false;
        angular.forEach(properties, function(property, i)
        {
          // support {{}} and watch for updates
          attrs.$observe(property, function(newVal)
          {
            if (!!newVal) {
              init();
              elm.slider('option', property, parseNumber(newVal, useDecimals));
            }
          });
        });
        attrs.$observe('disabled', function(newVal)
        {
          init();
          elm.slider('option', 'disabled', !!newVal);
        });

        // Watch ui-slider (byVal) for changes and update
        scope.$watch(attrs.uiSlider, function(newVal)
        {
          init();
          elm.slider('option', newVal);
        }, true);

        // Late-bind to prevent compiler clobbering
        $timeout(init, 0, true);

        // Update model value from slider
        elm.bind('slide', function(event, ui)
        {
          ngModel.$setViewValue(ui.values || ui.value);
          scope.$apply();
        });

        // Update slider from model value
        ngModel.$render = function()
        {
          init();
          var method = options.range === true ? 'values' : 'value';

          if (!ngModel.$viewValue)
            ngModel.$viewValue = 0;

          // Do some sanity check of range values
          if (options.range === true) {

            // Check outer bounds for min and max values
            if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
              ngModel.$viewValue[0] = options.min;
            }
            if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
              ngModel.$viewValue[1] = options.max;
            }

            // Check min and max range values
            if (ngModel.$viewValue[0] >= ngModel.$viewValue[1]) {
              // Min value should be less to equal to max value
              if (prevRangeValues.min >= ngModel.$viewValue[1])
                ngModel.$viewValue[0] = prevRangeValues.min;
              // Max value should be less to equal to min value
              if (prevRangeValues.max <= ngModel.$viewValue[0])
                ngModel.$viewValue[1] = prevRangeValues.max;
            }

            // Store values for later user
            prevRangeValues.min = ngModel.$viewValue[0];
            prevRangeValues.max = ngModel.$viewValue[1];

          }
          elm.slider(method, ngModel.$viewValue);
        };

        scope.$watch(attrs.ngModel, function()
        {
          if (options.range === true) {
            ngModel.$render();
          }
        }, true);

        function destroy()
        {
          elm.slider('destroy');
        }


        elm.bind('$destroy', destroy);
      };
    }
  };
}]); 