
// /* Parallax Setup
//  * Set the home parallax configuration
//  */

var parallaxItems = {};
var middle = $(window).height() * 0.5;

/**
 * Sections
 *
 * Home top
 */
parallaxItems.top = new ParallaxProperties(0, 2000, {
  top: {
    from: 0,
    to: 2000
  }
});




/*
 * Triangles
 */
parallaxItems.triangles = new ParallaxPropertiesCollection;
parallaxItems.triangles.append(new ParallaxProperties(0, 50, {
  top: {
    from: 0,
    to: 50
  }
}));
// parallaxItems.triangles.append(new ParallaxProperties(900, 1250, {
//   top: {
//     from: 50,
//     to: 300
//   }
// }));


/*parallaxItems.servicesLosangle = new ParallaxPropertiesCollection;
parallaxItems.servicesLosangle.append(new ParallaxProperties(0, 1200, {
  top: {
    from: 0,
    to: -520
  }
}));*/

parallaxItems.servicesLosangle = new ParallaxPropertiesCollection;
parallaxItems.servicesLosangle.append(new ParallaxProperties(0, 1200, {
  top: {
    from: 0,
    to: -320
  }
}));

/*
 * About
 */
parallaxItems.about = new ParallaxProperties(0, 600, {
  top: {
    from: 0,
    to: 950
  },
  opacity: {
    from: 1,
    to: 0
  }
});

parallaxItems.servicesContent = new ParallaxPropertiesCollection;
parallaxItems.servicesContent.append(new ParallaxProperties(0, 2000, {
  top: {
    from: 100,
    to: -500
  },
  opacity: {
    form: 0,
    to: 1
  }
}));

parallaxItems.servicesDetail = new ParallaxPropertiesCollection;
parallaxItems.servicesDetail.append(new ParallaxProperties(0, 4900, {
  top: {
    from: 700,
    to: -1200
  },
  opacity: {
    form: 0,
    to: 1
  }
}));

/**
 * Footer
 */
parallaxItems.footer = new ParallaxProperties(3800, 'max', {
  top: {
    from: 100,
    to: 0
  }
});

parallaxItems.footerLogo = new ParallaxProperties(3800, 'max', {
  top: {
    from: 150,
    to: 0
  }
});


/*
 * Elements
 */

parallaxItems.logo = new ParallaxProperties(0, 100, {
  top: {
    from: 0,
    to: -100
  }
});

parallaxItems.header = new ParallaxProperties(0, 200, {
  top: {
    from: 0,
    to: -100
  },
  opacity: {
    from: 1,
    to: 0
  }
});

/*
* side contact label
*/
parallaxItems.sidecontact = new ParallaxProperties(0, 6000, {
  top: {
    from: 0,
    to: 6000
  }
});


/**
 * Devices: laptop
 */

parallaxItems.laptop = new ParallaxPropertiesCollection;
parallaxItems.laptop.append(new ParallaxProperties(0, 2000, {
  top: {
    from: 0,
    to: -400
  }
}));

// parallaxItems.laptop.append(new ParallaxProperties(1600, 2200, {
//   top: {
//     from: 200,
//     to: 500
//   }
// }));

/**
 * Devices: iphone
 */

parallaxItems.iphone = new ParallaxPropertiesCollection;
parallaxItems.iphone.append(new ParallaxProperties(0, 2500, {
  top: {
    from: -200,
    to: -700
  }
}));


/**
 * Devices: android
 */

parallaxItems.android = new ParallaxPropertiesCollection;
parallaxItems.android.append(new ParallaxProperties(0, 2500, {
  top: {
    from: -300,
    to: -600
  }
}));

/**
 * Planet
 */

parallaxItems.planetGroupText1 = new ParallaxProperties(500, 1400, {
  left: {
      from: -100,
      to: 0
  },
  opacity: {
      from: 0,
      to: 1
  }  
});

parallaxItems.planetGroupText2 = new ParallaxProperties(500, 1400, {
  left: {
      from: 100,
      to: 0
  },
  opacity: {
      from: 0,
      to: 1
  }  
});

parallaxItems.planet = new ParallaxPropertiesCollection;
parallaxItems.planet.append(new ParallaxProperties(500, 1100, {
  scale: {
    from: 0.2,
    to: 1
  },
  opacity: {
    from: 0,
    to: 1
  }
}));

parallaxItems.outerAtmosphere = new ParallaxPropertiesCollection;
parallaxItems.outerAtmosphere.append(new ParallaxProperties(700, 1230, {
  scale: {
    from: 0.2,
    to: 1
  },
  opacity: {
    from: 0,
    to: 1
  }
}));


parallaxItems.innerAtmosphere = new ParallaxPropertiesCollection;
parallaxItems.innerAtmosphere.append(new ParallaxProperties(600, 1200, {
  scale: {
    from: 0.2,
    to: 1
  },
  opacity: {
    from: 0,
    to: 1
  }
}));

parallaxItems.orbitRings = new ParallaxPropertiesCollection;
parallaxItems.orbitRings.append(new ParallaxProperties(1130, 1300, {
  scale: {
    from: 0.99,
    to: 1
  },
  opacity: {
    from: 0,
    to: 1
  }
}));

parallaxItems.orbitElementRight = new ParallaxPropertiesCollection;
parallaxItems.orbitElementRight.append(new ParallaxProperties(1130, 1300, {
  opacity: {
    from: 0,
    to: 1
  }  
}));
                                       
parallaxItems.orbitElementRight.append(new ParallaxProperties(1300, 1350, {
  scale: {
    from: 0.4 ,
    to: 1
  },
  
  quadratic: {
    p1: { top: 0, left: 0 },
    p2: { top: -90, left: 90 },
    p3: { top: 0, left:  70 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

parallaxItems.orbitElementRight.append(new ParallaxProperties(1350, 1550, {
  quadratic: {
    p1: { top: 0, left: 70 },
    p2: { top: 180, left: 2 },
    p3: { top: 300, left:  -113 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 4);
  }  
}));

parallaxItems.orbitElementRight.append(new ParallaxProperties(1550, 1700, {
  scale: {
    from: 1,
    to: 0.4
  },
  
  quadratic: {
    p1: { top: 300, left: -113 },
    p2: { top: 380, left: -213 },
    p3: { top: 244, left: -157 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

parallaxItems.orbitElementLeft = new ParallaxPropertiesCollection;
parallaxItems.orbitElementLeft.append(new ParallaxProperties(1230, 1300, {
  opacity: {
    from: 0,
    to: 1
  }  
}));

parallaxItems.orbitElementLeft.append(new ParallaxProperties(1350, 1400, {
  scale: {
    from: 0.4 ,
    to: 1
  },
  
  quadratic: {
    p1: { top: 0, left: 0 },
    p2: { top: -96, left: -65 },
    p3: { top: -86, left:  -13 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

parallaxItems.orbitElementLeft.append(new ParallaxProperties(1400, 1600, {
  quadratic: {
    p1: { top: -86, left:  -13 },
    p2: { top: -3, left: 155 },
    p3: { top: 200, left:  285 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 4);
  }  
}));

parallaxItems.orbitElementLeft.append(new ParallaxProperties(1600, 1800, {
  scale: {
    from: 1,
    to: 0.4
  },
  
  quadratic: {
    p1: { top: 200, left:  285 },
    p2: { top: 315, left:  325 },
    p3: { top: 110, left:  85 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

/* Center */

parallaxItems.orbitElementCenter = new ParallaxPropertiesCollection;
parallaxItems.orbitElementCenter.append(new ParallaxProperties(1230, 1300, {
  opacity: {
    from: 0,
    to: 1
  }  
}));
                                       
parallaxItems.orbitElementCenter.append(new ParallaxProperties(1400, 1450, {
  scale: {
    from: 0.4,
    to: 1
  },
  
  quadratic: {
    p1: { top: 0, left: 0 },
    p2: { top: 20, left: 65 },
    p3: { top: 40, left:  10 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

parallaxItems.orbitElementCenter.append(new ParallaxProperties(1450, 1650, {
  quadratic: {
    p1: { top: 40, left:  10 },
    p2: { top: 75, left: -120 },
    p3: { top: 40, left:  -300 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 4);
  }  
}));

parallaxItems.orbitElementCenter.append(new ParallaxProperties(1650, 1700, {
  scale: {
    from: 1,
    to: 0.4
  },
  
  quadratic: {
    p1: { top: 40, left:  -300 },
    p2: { top: 20, left:  -345 },
    p3: { top: -1, left:  -290 }
  }
}, {
  onUpdate: function(properties, element) {
    element.css('z-index', 1);
  }  
}));

/* Devices */

parallaxItems.orbitDevices = new ParallaxPropertiesCollection;
parallaxItems.orbitDevices.append(new ParallaxProperties(1300, 1450, {
  opacity: {
    from: 0,
    to: 1
  }  
}));

/* Particles */

parallaxItems.orbitParticles = new ParallaxPropertiesCollection;
parallaxItems.orbitParticles.append(new ParallaxProperties(1100, 1200, {
  opacity: {
    from: 0,
    to: 1
  }  
}));

/* Clients header */

parallaxItems.clientsH1 = new ParallaxPropertiesCollection;
parallaxItems.clientsH1.append(new ParallaxProperties(2800 - middle, 3200 - middle, {
  opacity: {
    from: 0,
    to: 1
  },  
  left: {
    from: -30,
    to: 0
  },
  top: {
    from: -10,
    to: 0
  }
}));

parallaxItems.clientsH2 = new ParallaxPropertiesCollection;
parallaxItems.clientsH2.append(new ParallaxProperties(2950 - middle, 3350 - middle, {
  opacity: {
    from: 0,
    to: 1
  },  
  left: {
    from: 50,
    to: 0
  },
  top: {
    from: 10,
    to: 0
  }
}));

/* Clients losangles */

var distance = 20;
var initial = 2920;
var interval = '+50';

// first

parallaxItems.clientesLosangle01 = new ParallaxProperties(initial + 300, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle02 = new ParallaxProperties(initial, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle03 = new ParallaxProperties(initial + 100, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: distance,
    to: 0
  }
});

parallaxItems.clientesLosangle04 = new ParallaxProperties(initial + 200, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: distance,
    to: 0
  }
});

// second

parallaxItems.clientesLosangle05 = new ParallaxProperties(initial + 150, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle06 = new ParallaxProperties(initial + 50, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle07 = new ParallaxProperties(initial - 50, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: distance,
    to: 0
  }
});

parallaxItems.clientesLosangle08 = new ParallaxProperties(initial + 300, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: distance,
    to: 0
  }
});

// third

parallaxItems.clientesLosangle09 = new ParallaxProperties(initial + 100, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle10 = new ParallaxProperties(initial + 300, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle11 = new ParallaxProperties(initial + 400, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: distance,
    to: 0
  }
});

parallaxItems.clientesLosangle12 = new ParallaxProperties(initial + 200, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: distance,
    to: 0
  }
});

// fourth

parallaxItems.clientesLosangle13 = new ParallaxProperties(initial + 50, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle14 = new ParallaxProperties(initial + 350, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: -distance,
    to: 0
  }
});

parallaxItems.clientesLosangle15 = new ParallaxProperties(initial + 150, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  left: {
    from: distance,
    to: 0
  }
});

parallaxItems.clientesLosangle16 = new ParallaxProperties(initial + 250, interval, {
  opacity: {
    from: 0,
    to: 1
  },
  top: {
    from: distance,
    to: 0
  }
});



