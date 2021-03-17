"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createPathMarkers;

var _math = require("math.gl");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getLineLength(vPoints) {
  // calculate total length
  var lineLength = 0;

  for (var i = 0; i < vPoints.length - 1; i++) {
    lineLength += vPoints[i].distance(vPoints[i + 1]);
  }

  return lineLength;
}

var DEFAULT_COLOR = [0, 0, 0, 255];
var DEFAULT_DIRECTION = {
  forward: true,
  backward: false
};

function createPathMarkers(_ref) {
  var data = _ref.data,
      _ref$getPath = _ref.getPath,
      getPath = _ref$getPath === void 0 ? function (x) {
    return x.path;
  } : _ref$getPath,
      _ref$getDirection = _ref.getDirection,
      getDirection = _ref$getDirection === void 0 ? function (x) {
    return x.direction;
  } : _ref$getDirection,
      _ref$getColor = _ref.getColor,
      getColor = _ref$getColor === void 0 ? function (x) {
    return DEFAULT_COLOR;
  } : _ref$getColor,
      _ref$getMarkerPercent = _ref.getMarkerPercentages,
      getMarkerPercentages = _ref$getMarkerPercent === void 0 ? function (x) {
    return [0.5];
  } : _ref$getMarkerPercent,
      projectFlat = _ref.projectFlat;
  var markers = [];

  var _iterator = _createForOfIteratorHelper(data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;
      var path = getPath(object);
      var direction = getDirection(object) || DEFAULT_DIRECTION;
      var color = getColor(object);
      var vPoints = path.map(function (p) {
        return new _math.Vector2(p);
      });
      var vPointsReverse = vPoints.slice(0).reverse(); // calculate total length

      var lineLength = getLineLength(vPoints); // Ask for where to put markers
      // @ts-ignore

      var percentages = getMarkerPercentages(object, {
        lineLength: lineLength
      }); // Create the markers

      var _iterator2 = _createForOfIteratorHelper(percentages),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var percentage = _step2.value;

          if (direction.forward) {
            var marker = createMarkerAlongPath({
              path: vPoints,
              percentage: percentage,
              lineLength: lineLength,
              color: color,
              object: object,
              projectFlat: projectFlat
            });
            markers.push(marker);
          }

          if (direction.backward) {
            var _marker = createMarkerAlongPath({
              path: vPointsReverse,
              percentage: percentage,
              lineLength: lineLength,
              color: color,
              object: object,
              projectFlat: projectFlat
            });

            markers.push(_marker);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return markers;
}

function createMarkerAlongPath(_ref2) {
  var path = _ref2.path,
      percentage = _ref2.percentage,
      lineLength = _ref2.lineLength,
      color = _ref2.color,
      object = _ref2.object,
      projectFlat = _ref2.projectFlat;
  var distanceAlong = lineLength * percentage;
  var currentDistance = 0;
  var previousDistance = 0;
  var i = 0;

  for (i = 0; i < path.length - 1; i++) {
    currentDistance += path[i].distance(path[i + 1]);

    if (currentDistance > distanceAlong) {
      break;
    }

    previousDistance = currentDistance;
  }

  var vDirection = path[i + 1].clone().subtract(path[i]).normalize();
  var along = distanceAlong - previousDistance;
  var vCenter = vDirection.clone().multiply(new _math.Vector2(along, along)).add(path[i]);
  var vDirection2 = new _math.Vector2(projectFlat(path[i + 1])).subtract(projectFlat(path[i]));
  var angle = -vDirection2.verticalAngle() * 180 / Math.PI;
  return {
    position: [vCenter.x, vCenter.y, 0],
    angle: angle,
    color: color,
    object: object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcGF0aC1tYXJrZXItbGF5ZXIvY3JlYXRlLXBhdGgtbWFya2Vycy50cyJdLCJuYW1lcyI6WyJnZXRMaW5lTGVuZ3RoIiwidlBvaW50cyIsImxpbmVMZW5ndGgiLCJpIiwibGVuZ3RoIiwiZGlzdGFuY2UiLCJERUZBVUxUX0NPTE9SIiwiREVGQVVMVF9ESVJFQ1RJT04iLCJmb3J3YXJkIiwiYmFja3dhcmQiLCJjcmVhdGVQYXRoTWFya2VycyIsImRhdGEiLCJnZXRQYXRoIiwieCIsInBhdGgiLCJnZXREaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJnZXRDb2xvciIsImdldE1hcmtlclBlcmNlbnRhZ2VzIiwicHJvamVjdEZsYXQiLCJtYXJrZXJzIiwib2JqZWN0IiwiY29sb3IiLCJtYXAiLCJwIiwiVmVjdG9yMiIsInZQb2ludHNSZXZlcnNlIiwic2xpY2UiLCJyZXZlcnNlIiwicGVyY2VudGFnZXMiLCJwZXJjZW50YWdlIiwibWFya2VyIiwiY3JlYXRlTWFya2VyQWxvbmdQYXRoIiwicHVzaCIsImRpc3RhbmNlQWxvbmciLCJjdXJyZW50RGlzdGFuY2UiLCJwcmV2aW91c0Rpc3RhbmNlIiwidkRpcmVjdGlvbiIsImNsb25lIiwic3VidHJhY3QiLCJub3JtYWxpemUiLCJhbG9uZyIsInZDZW50ZXIiLCJtdWx0aXBseSIsImFkZCIsInZEaXJlY3Rpb24yIiwiYW5nbGUiLCJ2ZXJ0aWNhbEFuZ2xlIiwiTWF0aCIsIlBJIiwicG9zaXRpb24iLCJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsU0FBU0EsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUI7QUFDQSxNQUFJQyxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixPQUFPLENBQUNHLE1BQVIsR0FBaUIsQ0FBckMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDM0NELElBQUFB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R0FBRyxDQUFMLENBQUosQ0FBWW1DLEtBQVosR0FBb0JDLFFBQXBCLENBQTZCekIsSUFBSSxDQUFDWCxDQUFELENBQWpDLEVBQXNDcUMsU0FBdEMsRUFBbkI7QUFDQSxNQUFNQyxLQUFLLEdBQUdQLGFBQWEsR0FBR0UsZ0JBQTlCO0FBQ0EsTUFBTU0sT0FBTyxHQUFHTCxVQUFVLENBQUNDLEtBQVgsR0FBbUJLLFFBQW5CLENBQTRCLElBQUlsQixhQUFKLENBQVlnQixLQUFaLEVBQW1CQSxLQUFuQixDQUE1QixFQUF1REcsR0FBdkQsQ0FBMkQ5QixJQUFJLENBQUNYLENBQUQsQ0FBL0QsQ0FBaEI7QUFFQSxNQUFNMEMsV0FBVyxHQUFHLElBQUlwQixhQUFKLENBQVlOLFdBQVcsQ0FBQ0wsSUFBSSxDQUFDWCxDQUFDLEdBQUcsQ0FBTCxDQUFMLENBQXZCLEVBQXNDb0MsUUFBdEMsQ0FBK0NwQixXQUFXLENBQUNMLElBQUksQ0FBQ1gsQ0FBRCxDQUFMLENBQTFELENBQXBCO0FBQ0EsTUFBTTJDLEtBQUssR0FBSSxDQUFDRCxXQUFXLENBQUNFLGFBQVosRUFBRCxHQUErQixHQUFoQyxHQUF1Q0MsSUFBSSxDQUFDQyxFQUExRDtBQUVBLFNBQU87QUFBRUMsSUFBQUEsUUFBUSxFQUFFLENBQUNSLE9BQU8sQ0FBQzdCLENBQVQsRUFBWTZCLE9BQU8sQ0FBQ1MsQ0FBcEIsRUFBdUIsQ0FBdkIsQ0FBWjtBQUF1Q0wsSUFBQUEsS0FBSyxFQUFMQSxLQUF2QztBQUE4Q3hCLElBQUFBLEtBQUssRUFBTEEsS0FBOUM7QUFBcURELElBQUFBLE1BQU0sRUFBTkE7QUFBckQsR0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gJ21hdGguZ2wnO1xuXG5mdW5jdGlvbiBnZXRMaW5lTGVuZ3RoKHZQb2ludHMpIHtcbiAgLy8gY2FsY3VsYXRlIHRvdGFsIGxlbmd0aFxuICBsZXQgbGluZUxlbmd0aCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdlBvaW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBsaW5lTGVuZ3RoICs9IHZQb2ludHNbaV0uZGlzdGFuY2UodlBvaW50c1tpICsgMV0pO1xuICB9XG4gIHJldHVybiBsaW5lTGVuZ3RoO1xufVxuXG5jb25zdCBERUZBVUxUX0NPTE9SID0gWzAsIDAsIDAsIDI1NV07XG5jb25zdCBERUZBVUxUX0RJUkVDVElPTiA9IHsgZm9yd2FyZDogdHJ1ZSwgYmFja3dhcmQ6IGZhbHNlIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVBhdGhNYXJrZXJzKHtcbiAgZGF0YSxcbiAgZ2V0UGF0aCA9ICh4KSA9PiB4LnBhdGgsXG4gIGdldERpcmVjdGlvbiA9ICh4KSA9PiB4LmRpcmVjdGlvbixcbiAgZ2V0Q29sb3IgPSAoeCkgPT4gREVGQVVMVF9DT0xPUixcbiAgZ2V0TWFya2VyUGVyY2VudGFnZXMgPSAoeCkgPT4gWzAuNV0sXG4gIHByb2plY3RGbGF0LFxufSkge1xuICBjb25zdCBtYXJrZXJzID0gW107XG5cbiAgZm9yIChjb25zdCBvYmplY3Qgb2YgZGF0YSkge1xuICAgIGNvbnN0IHBhdGggPSBnZXRQYXRoKG9iamVjdCk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKG9iamVjdCkgfHwgREVGQVVMVF9ESVJFQ1RJT047XG4gICAgY29uc3QgY29sb3IgPSBnZXRDb2xvcihvYmplY3QpO1xuXG4gICAgY29uc3QgdlBvaW50cyA9IHBhdGgubWFwKChwKSA9PiBuZXcgVmVjdG9yMihwKSk7XG4gICAgY29uc3QgdlBvaW50c1JldmVyc2UgPSB2UG9pbnRzLnNsaWNlKDApLnJldmVyc2UoKTtcblxuICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCBsZW5ndGhcbiAgICBjb25zdCBsaW5lTGVuZ3RoID0gZ2V0TGluZUxlbmd0aCh2UG9pbnRzKTtcblxuICAgIC8vIEFzayBmb3Igd2hlcmUgdG8gcHV0IG1hcmtlcnNcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcGVyY2VudGFnZXMgPSBnZXRNYXJrZXJQZXJjZW50YWdlcyhvYmplY3QsIHsgbGluZUxlbmd0aCB9KTtcblxuICAgIC8vIENyZWF0ZSB0aGUgbWFya2Vyc1xuICAgIGZvciAoY29uc3QgcGVyY2VudGFnZSBvZiBwZXJjZW50YWdlcykge1xuICAgICAgaWYgKGRpcmVjdGlvbi5mb3J3YXJkKSB7XG4gICAgICAgIGNvbnN0IG1hcmtlciA9IGNyZWF0ZU1hcmtlckFsb25nUGF0aCh7XG4gICAgICAgICAgcGF0aDogdlBvaW50cyxcbiAgICAgICAgICBwZXJjZW50YWdlLFxuICAgICAgICAgIGxpbmVMZW5ndGgsXG4gICAgICAgICAgY29sb3IsXG4gICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgIHByb2plY3RGbGF0LFxuICAgICAgICB9KTtcbiAgICAgICAgbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJlY3Rpb24uYmFja3dhcmQpIHtcbiAgICAgICAgY29uc3QgbWFya2VyID0gY3JlYXRlTWFya2VyQWxvbmdQYXRoKHtcbiAgICAgICAgICBwYXRoOiB2UG9pbnRzUmV2ZXJzZSxcbiAgICAgICAgICBwZXJjZW50YWdlLFxuICAgICAgICAgIGxpbmVMZW5ndGgsXG4gICAgICAgICAgY29sb3IsXG4gICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgIHByb2plY3RGbGF0LFxuICAgICAgICB9KTtcbiAgICAgICAgbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hcmtlcnM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmtlckFsb25nUGF0aCh7IHBhdGgsIHBlcmNlbnRhZ2UsIGxpbmVMZW5ndGgsIGNvbG9yLCBvYmplY3QsIHByb2plY3RGbGF0IH0pIHtcbiAgY29uc3QgZGlzdGFuY2VBbG9uZyA9IGxpbmVMZW5ndGggKiBwZXJjZW50YWdlO1xuICBsZXQgY3VycmVudERpc3RhbmNlID0gMDtcbiAgbGV0IHByZXZpb3VzRGlzdGFuY2UgPSAwO1xuICBsZXQgaSA9IDA7XG4gIGZvciAoaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGN1cnJlbnREaXN0YW5jZSArPSBwYXRoW2ldLmRpc3RhbmNlKHBhdGhbaSArIDFdKTtcbiAgICBpZiAoY3VycmVudERpc3RhbmNlID4gZGlzdGFuY2VBbG9uZykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHByZXZpb3VzRGlzdGFuY2UgPSBjdXJyZW50RGlzdGFuY2U7XG4gIH1cblxuICBjb25zdCB2RGlyZWN0aW9uID0gcGF0aFtpICsgMV0uY2xvbmUoKS5zdWJ0cmFjdChwYXRoW2ldKS5ub3JtYWxpemUoKTtcbiAgY29uc3QgYWxvbmcgPSBkaXN0YW5jZUFsb25nIC0gcHJldmlvdXNEaXN0YW5jZTtcbiAgY29uc3QgdkNlbnRlciA9IHZEaXJlY3Rpb24uY2xvbmUoKS5tdWx0aXBseShuZXcgVmVjdG9yMihhbG9uZywgYWxvbmcpKS5hZGQocGF0aFtpXSk7XG5cbiAgY29uc3QgdkRpcmVjdGlvbjIgPSBuZXcgVmVjdG9yMihwcm9qZWN0RmxhdChwYXRoW2kgKyAxXSkpLnN1YnRyYWN0KHByb2plY3RGbGF0KHBhdGhbaV0pKTtcbiAgY29uc3QgYW5nbGUgPSAoLXZEaXJlY3Rpb24yLnZlcnRpY2FsQW5nbGUoKSAqIDE4MCkgLyBNYXRoLlBJO1xuXG4gIHJldHVybiB7IHBvc2l0aW9uOiBbdkNlbnRlci54LCB2Q2VudGVyLnksIDBdLCBhbmdsZSwgY29sb3IsIG9iamVjdCB9O1xufVxuIl19