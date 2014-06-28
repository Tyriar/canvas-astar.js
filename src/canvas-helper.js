/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'));
  } else {
    root.canvasHelper = factory(core);
  }
}(this, function (core) {
  'use strict';

  var module = {};

  var PATH_WIDTH        = 4;
  var BACKGROUND_COLOUR = '#EEE';
  var OBSTACLE_COLOUR   = '#2D2D30';
  var PATH_COLOUR       = '#0C0';
  var VISITED_COLOUR    = '#44F';
  var OPEN_LIST_COLOUR  = '#88F';

  var canvas;
  var context;

  module.setCanvas = function (canvasElement) {
    canvas = canvasElement;
    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
    }
  };

  module.drawObstacles = function (map) {
    for (var x = 0; x < core.MAP_WIDTH; x++) {
      for (var y = 0; y < core.MAP_HEIGHT; y++) {
        if (!map[x][y]) {
          module.drawObstacle(x, y);
        }
      }
    }
  };

  module.drawObstacle = function (x, y) {
    module.drawNode(x, y, OBSTACLE_COLOUR);
  };

  module.clearObstacle = function (x, y) {
    module.drawNode(x, y, BACKGROUND_COLOUR);
  };

  module.drawVisited = function (x, y) {
    module.drawNode(x, y, VISITED_COLOUR);
  };

  module.drawOpenListNode = function (x, y) {
    module.drawNode(x, y, OPEN_LIST_COLOUR);
  };

  module.drawStartGoal = function (x, y) {
    module.drawNode(x, y, PATH_COLOUR);
  };

  module.drawNode = function (x, y, COLOUR) {
    context.fillStyle = COLOUR;
    context.fillRect(x * core.MAP_SCALE, y * core.MAP_SCALE, core.MAP_SCALE, core.MAP_SCALE);
  };

  module.clearCanvas = function () {
    context.fillStyle = BACKGROUND_COLOUR;
    context.fillRect(0, 0, core.CANVAS_WIDTH, core.CANVAS_HEIGHT);
  };

  module.draw = function (closedList, openList, startNode, goalNode) {
    module.drawStartGoal(goalNode.x, goalNode.y);
    module.drawStartGoal(startNode.x, startNode.y);

    context.beginPath();
    context.moveTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);

    while (goalNode.parent) {
      goalNode = goalNode.parent;
      context.lineTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);
    }

    for (var i = 0; i < openList.length; i++) {
      module.drawOpenListNode(openList[i].x, openList[i].y);
    }

    context.strokeStyle = PATH_COLOUR;
    context.lineWidth = PATH_WIDTH;
    context.stroke();
    context.closePath();
  };

  module.getCanvasWidth = function () {
    canvas.setAttribute('width', canvas.clientWidth);
    return canvas.clientWidth;
  };

  module.getCanvasHeight = function () {
    canvas.setAttribute('height', canvas.clientHeight);
    return canvas.clientHeight;
  };

  return module;
}));
