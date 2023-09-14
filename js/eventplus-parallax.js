(function() {
  var DEBUG = true;
  var transitions3d = !(/MSIE/i.test(navigator.userAgent));

  window.animationFrame = (function(){
      return 	window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame  ||
              window.mozRequestAnimationFrame     ||
              window.oRequestAnimationFrame       ||
              window.msRequestAnimationFrame      ||

              function(callback, element){
                  return window.setTimeout(callback, 1000 / 60);
              };
  })();

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(frame) { clearTimeout(frame); };
  }

  var ParallaxTransforms = {
    left: function(value) { return 'translateX(' + parseFloat(value).toFixed(4) + 'px) ' },
    top: function(value) { return 'translateY(' + parseFloat(value).toFixed(4) + 'px) ' },
    scale: function(value) { return 'scale(' + parseFloat(value).toFixed(4) + ') ' },
    rotateY: function(value) { return 'rotateY(' + parseInt(value, 10).toString() + 'deg) ' },
    rotateX: function(value) { return 'rotateX(' + parseInt(value, 10).toString() + 'deg) ' }
  };

  /* ParallaxItem */

  var ParallaxItem = function(stage, setup, element) {
    this.stage = stage;
    this.init(setup, element);
  };

  ParallaxItem.prototype.init = function(setup, element) {
    this.setup = setup;
    this.element = element;
    typeof this.element.status === 'undefined' && (this.element.status = 2);

    this.start = false;
    this.stopped = false;

    this.element._originalProperties = {};
  
    this
      .updateOptions()
      .build();
  };

  ParallaxItem.prototype.reset = function() {
    this.update(this.element._originalProperties);
  };

  ParallaxItem.prototype.update = function(property) {
    var transform = '';

    if (transitions3d) {
      transform = 'translateZ(0) ';

      property.left && (transform += ParallaxTransforms.left(property.left));
      property.top && (transform += ParallaxTransforms.top(property.top));
    } else {
      property.top && this.element.css('top', property.top);
      property.left && this.element.css('left', property.left);
    }

    property.scale && (transform += ParallaxTransforms.scale(property.scale));
    property.rotateX && (transform += ParallaxTransforms.rotateX(property.rotateX));
    property.rotateY && (transform += ParallaxTransforms.rotateY(property.rotateY));

  
    this.element.css(Modernizr.prefixed('transform'), transform);
    property.opacity && this.element.css('opacity', property.opacity);
    property.height && this.element.css('height', property.height);
  
    return this;
  };

  ParallaxItem.prototype.get = function(property) {
    var method = 'get' + property.charAt(0).toUpperCase() + property.slice(1);
    return this[method] ? this[method]() : this.getDefault(property);
  }; 

  ParallaxItem.prototype.getOptions = function() {
    return this.setup.getProperties ? this.setup.getProperties(this.stage.top) : this.setup;
  };

  ParallaxItem.prototype.updateOptions = function() {
    this.options = this.getOptions();
    this.properties = this.options.properties;
    
    return this;
  }

  ParallaxItem.prototype.build = function() {
    var properties = {};
  
    for (var i in this.properties) {
      properties[i] = this.properties[i].from;
      this.element._originalProperties[i] = this.get(i);
    }

    this.update(properties);
  
    return this;
  };

  ParallaxItem.prototype.reload = function() {
    var properties = {};
    var action = 'Update';

    if (this.parallaxPercent <= 0) {
      //if (this.element.status === 1) return this;

      this.element.status = 1;
      action = 'Start';
    } else if (this.parallaxPercent >= 1) {
      //if (this.element.status === 0) return this;

      this.element.status = 0;
      action = 'Stop';
    } else {
      this.element.status = 2;
    }
  
    for (var i in this.properties) {
      var currentValue = this.get(i);

      var property = this.properties[i];
      var newValue = this['get' + action + 'Value'](property, i);

      properties = this.formatProperty(i, currentValue, newValue, 0.5, properties);
    }

    this.options['on' + action] && this.options['on' + action](properties, this.element, this.stage);

    this.update(properties);
    return this;
  };

  ParallaxItem.prototype.getStartValue = function(property, name) {
    var method = 'getStartValueFrom' + name.charAt(0).toUpperCase() + name.slice(1);
    return this[method] ? this[method](property) : property.from;
  };

  ParallaxItem.prototype.getStopValue = function(property, name) {
    var method = 'getStopValueFrom' + name.charAt(0).toUpperCase() + name.slice(1);
    return this[method] ? this[method](property) : property.to;
  };  

  ParallaxItem.prototype.getUpdateValue = function(property, name) {
    var method = 'getPercentValueFrom' + name.charAt(0).toUpperCase() + name.slice(1);

    return this[method] ? this[method](property) : property.from + ((property.to - property.from) * this.parallaxPercent);
  };

  /* Quadratic Values */

  ParallaxItem.prototype.getStartValueFromQuadratic = function(property) {
    return property.p1;
  };
  
  ParallaxItem.prototype.getStopValueFromQuadratic = function(property) {
    return property.p3;
  };
  
  ParallaxItem.prototype.getPercentValueFromQuadratic = function(property) {
    var values = {};
    var t = this.parallaxPercent;
    var i = 1 - t;
    
    values.top = i * (i * property.p1.top + t * property.p2.top) + t * (i * property.p2.top + t * property.p3.top);
    values.left = i * (i * property.p1.left + t * property.p2.left) + t * (i * property.p2.left + t * property.p3.left);
    
    return values;
  };

  ParallaxItem.prototype.formatProperty = function(property, current, next, multiplier, properties) {

    if (property === 'quadratic') {
      properties.top = next.top;
      properties.left = next.left;
    } else {
      properties[property] = this.smoothAnimation(current, next, multiplier);
    }
    
    return properties;
  };

  ParallaxItem.prototype.smoothAnimation = function(current, next, multiplier) {
    return current + (next - current) * multiplier;
  };

  /* Properties Getters */
  
  ParallaxItem.prototype.getDefault = function(property) {
    var value = parseFloat(this.element.css(property));

    if (property == 'left' || property == 'top') {
      var start = parseFloat(this.element._originalProperties[property]);

      if (property == 'opacity') {}
      
      !isNaN(start) && (value += start);
    }

    return isNaN(value) ? 0 : value;
  };
  
  ParallaxItem.prototype.getTop = function() {
    if (!transitions3d) {
      return this.getDefault('top');
    }

    var transform = this.element.css(Modernizr.prefixed('transform'));
    if (!transform || transform == 'none') return 0;

    var matrix = transform.match(/\((.*)\)/)[1].split(',');
    return parseFloat(matrix[5]);
  };

  ParallaxItem.prototype.getLeft = function() {
    if (!transitions3d) {
      return this.getDefault('left');
    }

    var transform = this.element.css(Modernizr.prefixed('transform'));
    if (!transform || transform == 'none') return 0;

    var matrix = transform.match(/\((.*)\)/)[1].split(',');
    return parseFloat(matrix[4]);
  };

  ParallaxItem.prototype.getScale = function() {
    var transform = this.element.css(Modernizr.prefixed('transform'));
    if (!transform || transform == 'none') return 0;

    var matrix = transform.match(/\((.*)\)/)[1].split(',');
    return parseFloat(matrix[0]);
  };

  ParallaxItem.prototype.getRotateX = function() {
    var transform = this.element.css(Modernizr.prefixed('transform')).split('rotateX(');
    if (transform.length == 1) return 0;

    return parseFloat(transform[1].split('d')[0]);
  };

  ParallaxItem.prototype.getRotateY = function() {
    var transform = this.element.css(Modernizr.prefixed('transform')).split('rotateY(');

    if (transform.length == 1) return 0;

    return parseFloat(transform[1].split('d')[0]);
  };
  
  ParallaxItem.prototype.getBackgroundPosition = function() {
    return this.element.css('background-position').split(' ');
  };

  /* ParallaxStage */

  window.ParallaxStage = function(settings, callback) {
    this.settings = settings;
    
    this.stopped = true;
    this.top = 0;

    this.frame = null;

    this.windowHeight = 0;
    this.scrollHeight = 0;
    this.pageHeight = 0;

    this.callback = callback;
  
    window.smoothScrollY = ParallaxStage.getScrollY();

    this.init();
  };

  ParallaxStage.avaliable = function(minWidth) {
    return Modernizr.mq('(min-width: ' + minWidth + 'px)');
  };

  ParallaxStage.bindToWindow = function(callback) {
    window.parallax = new ParallaxStage({
      relativeToWindowHeight: 800
    }, callback);
  };

  ParallaxStage.reload = function(callback) {
    if (!window.parallax) return ParallaxStage.bindToWindow(callback);

    window.parallax.destroy();
    window.parallax.rebuild(callback);
    window.parallax.start();
  };  

  ParallaxStage.prototype.init = function() {
    this.build();
    
    this.start();
    this.bindEvents();
    this.animate();
  };
  
  ParallaxStage.prototype.build = function() {
    this.parallaxElements = [];

    // Append parallax container
    !this.parallaxWrapper && this.structure();

    // Append debbuger
    DEBUG && !this.parallaxDebugger && this.debbuger();

    this.updateHeightValues();
    this.appendScroll();
    this.animateElements();

    this.callback && this.callback();
  };

  ParallaxStage.prototype.debbuger = function() {
    var $body = $('body');
    
    this.parallaxDebugger = $('<div>0 / 0</div>').css({ position: 'fixed', top: 0, left: 0, width: 100, height: 20, lineHeight: '20px', borderBottom: '2px solid #ccc', background: '#f3f3f3', textAlign: 'center', zIndex: 100000 });
    
    // $body.append(this.parallaxDebugger);
  };

  ParallaxStage.prototype.structure = function() {
    var $body = $('body');

    this.parallaxWrapper = $('<div></div>');
    this.parallaxPlaceholder = $('<div></div>');

    var bodyChildren = $body.children().not('script, [data-parallax-ignore], #parallax-placeholder, #parallax-wrapper');

    this.parallaxWrapper.attr('id', 'parallax-wrapper').addClass('parallax-element');
    this.parallaxPlaceholder.attr('id', 'parallax-placeholder');
    
    this.parallaxWrapper.append(bodyChildren).css({
      position: 'fixed',
      width: '100%'
    });

    $body.prepend(this.parallaxPlaceholder);
    $body.prepend(this.parallaxWrapper);
  };

  ParallaxStage.prototype.destroy = function() {
    if (!this.parallaxWrapper) return;

    var $body = $('body');

    // Stop parallax animation
    this.stop();
    this.top = 0;

    // Reset parallax items
    this.parallaxElements.map(function(item) { 
      item.reset();
    })

    // Clear parallax elements
    this.parallaxElements = [];

    // Append to the body the parallax elements
    var parallaxWrapperChildren = this.parallaxWrapper.children();
    this.parallaxWrapper.after(parallaxWrapperChildren);

    // Destroy structure
    this.parallaxWrapper.remove();
    this.parallaxPlaceholder.remove();
    this.parallaxDebugger && this.parallaxDebugger.remove();

    delete this.parallaxWrapper;
    delete this.parallaxPlaceholder;
    delete this.parallaxDebugger;
  };

  ParallaxStage.prototype.rebuild = function(callback) {
    // Reset parallax elements
    this.parallaxElements = [];

    // Callback
    callback !== true && (this.callback = callback);

    // Build
    this.build();
  };

  ParallaxStage.prototype.updateHeightValues = function() {
    if (!this.parallaxWrapper) return;

    this.pageHeight = this.parallaxWrapper.outerHeight();
    
    this.parallaxPlaceholder.height(this.pageHeight);

    this.windowHeight = $(window).height();
    this.scrollHeight = this.pageHeight - this.windowHeight;

    this.settings.heightDifference = this.windowHeight - this.settings.relativeToWindowHeight;
  };

  ParallaxStage.prototype.appendScroll = function() {
    var that = this;

    var proporties = new ParallaxProperties(0, this.pageHeight, {
      top: {
        from: 0,
        to: -this.pageHeight
      }
    }, {
      onUpdate: function(properties) {
        that.top = - parseFloat(properties.top).toFixed(0);
        that.top === ParallaxStage.getScrollY() && that.stop();
      }      
    });

    this.parallaxWrapper[0]._parallax = new ParallaxItem(this, proporties, this.parallaxWrapper);
    this.parallaxElements.push(this.parallaxWrapper[0]._parallax);
  };

  ParallaxStage.prototype.animateElements = function() {
    var that = this;

    $('[data-parallax]').each(function() {
      var $this = $(this);
      var key = $.camelCase($this.data('parallax'));
      var properties = parallaxItems[key];

      if (typeof properties !== 'object') return true;
    
      this._parallax = new ParallaxItem(that, properties, $this);
      that.parallaxElements.push(this._parallax);
    });
  }

  ParallaxStage.prototype.bindEvents = function() {
    var that = this;

    $(window).on('resize', function() {
      that.updateHeightValues();

      if (that.parallaxElements && that.parallaxElements[0]) {
        that.parallaxElements[0].scrollStop = that.pageHeight;
        that.parallaxElements[0].properties.top.to = -that.pageHeight;
      }
    });

    $(document).on('scroll', function() {
      that.start();
    });
  };

  ParallaxStage.getScrollY = function () {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  };

  ParallaxStage.prototype.scroll = function() {
    window.smoothScrollY = window.smoothScrollY + (ParallaxStage.getScrollY() - window.smoothScrollY) * 0.1;

    for (var i = 0; i < this.parallaxElements.length; i++) {
        var item = this.parallaxElements[i].updateOptions();

        var scrollStart = this.parseScroll(item.options.scrollStart);
        var scrollStop = this.parseScroll(item.options.scrollStop, scrollStart);

        if (scrollStart === null || scrollStop === null) continue;

        /*if (this.settings.relativeToWindowHeight && i != 0) {
          scrollStart = this.updateScrollForWindowHeight(scrollStart);
          scrollStop = this.updateScrollForWindowHeight(scrollStop);
        }*/

        var percent = (window.smoothScrollY - scrollStart) / (scrollStop - scrollStart);

        if (percent > 1) percent = 1;
        else if (percent < 0.00001) percent = 0;


        item.parallaxPercent = percent;
    }
  };

  ParallaxStage.prototype.updateScrollForWindowHeight = function(value) {
    value += this.settings.heightDifference;

    return value;
  };
  
  ParallaxStage.prototype.parseScroll = function(value, opposite) {

    // Normal number value
    if (typeof value === 'number') return value;

    // Max value
    if (value.indexOf('max') > -1) return this.getMaxScroll(value);

    // Calculate by opposite value
    if (value.search(/[\+\-\*\/]/) > -1) return this.getOppositeScroll(value, opposite);

    // Percent value
    if (value.indexOf('%') > -1) return this.getPercentScroll(value);

    // Invalid value
    return null;
  };

  ParallaxStage.prototype.getPercentScroll = function(value) {

    // Get percent
    var percent = value.replace('%', '') / 100;

    // Return the percent value
    return this.scrollHeight - this.scrollHeight;
  };

  ParallaxStage.prototype.getMaxScroll = function(value) {
    // Remove string and parse number
    var modifier = value.slice(4);
    var operator = value.slice(3,4);

    // Get the max value
    value = this.scrollHeight;

    // Return the max value modified
    return this.applyOperation(value, operator, modifier);
  };

  ParallaxStage.prototype.getOppositeScroll = function(value, opposite) {
    // Remove string and parse number
    var modifier = value.slice(1);
    var operator = value.slice(0,1);

    // Return the max value modified
    return this.applyOperation(opposite, operator, modifier);
  };  

  ParallaxStage.prototype.applyOperation = function(value, operator, modifier) {

    modifier = parseInt(modifier, 10);
    value = parseInt(value, 10);

    // Apply the modifier with their operator
    switch(operator) {
      case '+':
        value += modifier;
        break;
      case '-':
        value -= modifier;
        break;
      case '*':
        value *= modifier;
        break;
      case '/':
        value /= modifier;
        break;
    }

    return value;
  };    
  
  ParallaxStage.prototype.getTop = function() {
    return this.top;
  };  
  
  ParallaxStage.prototype.stop = function() {
    this.stopped = true;
    window.cancelAnimationFrame(this.frame);

    Clients && Clients.update();
  };
  
  ParallaxStage.prototype.start = function() {
    if (!this.stopped) return;

    this.stopped = false;
    this.scroll();
    this.animate();
  };

  ParallaxStage.prototype.animate = function() {

    var that = this;

    this.frame = animationFrame(function() {
      if (that.stopped) return;
      
      that.animate();
    });
  
    this.scroll();
  
    for (var i = 0; i < this.parallaxElements.length; i++) {
      this.parallaxElements[i]
        .reload();
    }
  };
  
  /* ParallaxProperties */

  window.ParallaxProperties = function(start, stop, properties, events) {
    if (typeof events !== 'object') events = {};
  
    return {
      scrollStart: start,
      scrollStop: stop,
      properties: properties || {},
      onUpdate: events.onUpdate,
      onStart: events.onStart,
      onStop: events.onStop
    }
  };

  /* ParallaxPropertiesCollection */

  window.ParallaxPropertiesCollection = function() {
    this.collection = [];
  };

  ParallaxPropertiesCollection.prototype.append = function(properties) {
    this.collection.push(properties);
  };

  ParallaxPropertiesCollection.prototype.getProperties = function(position) {
    var properties = this.collection[0];
    
    for (var index = 1, t = this.collection.length; index < t; index++) {
      var parallaxProperty = this.collection[index];
      
      if (position >= properties.scrollStop) {
        properties = parallaxProperty;
      }
    }
    
    return properties;
  };
      
})();


