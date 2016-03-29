'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
dexcharts.directive('layout', function()
{
  return {

    link : function(scope, elm, attrs)
    {
      var layout = elm.layout({
        applyDefaultStyles : true
      });

      scope.layout = layout;

      scope.$watch(attrs.state, function(state)
      {
        if (state == true) {
          scope.layout.sizePane('east', 120);
          scope.layout.show('west');
          scope.layout.show('south');
        }
        else {
          scope.layout.sizePane('east', 60);
          scope.layout.hide('west');
          scope.layout.hide('south');
        }
      });
    }
  };
});
