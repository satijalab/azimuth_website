"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeasureDistanceMode = void 0;

var _distance = _interopRequireDefault(require("@turf/distance"));

var _memoize = _interopRequireDefault(require("../memoize"));

var _geojsonEditMode = require("./geojson-edit-mode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_TOOLTIPS = [];

var MeasureDistanceMode = /*#__PURE__*/function (_GeoJsonEditMode) {
  _inherits(MeasureDistanceMode, _GeoJsonEditMode);

  var _super = _createSuper(MeasureDistanceMode);

  function MeasureDistanceMode() {
    var _this;

    _classCallCheck(this, MeasureDistanceMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "startingPoint", null);

    _defineProperty(_assertThisInitialized(_this), "endingPoint", null);

    _defineProperty(_assertThisInitialized(_this), "endingPointLocked", false);

    _defineProperty(_assertThisInitialized(_this), "_getTooltips", (0, _memoize["default"])(function (_ref) {
      var modeConfig = _ref.modeConfig,
          startingPoint = _ref.startingPoint,
          endingPoint = _ref.endingPoint;
      var tooltips = DEFAULT_TOOLTIPS;

      if (startingPoint && endingPoint) {
        var _ref2 = modeConfig || {},
            formatTooltip = _ref2.formatTooltip,
            turfOptions = _ref2.turfOptions,
            measurementCallback = _ref2.measurementCallback;

        var units = turfOptions && turfOptions.units || 'kilometers';
        var distance = (0, _distance["default"])(startingPoint, endingPoint, turfOptions);
        var text;

        if (formatTooltip) {
          text = formatTooltip(distance);
        } else {
          // By default, round to 2 decimal places and append units
          text = "".concat(parseFloat(distance).toFixed(2), " ").concat(units);
        }

        if (measurementCallback) {
          measurementCallback(distance);
        }

        tooltips = [{
          position: endingPoint.geometry.coordinates,
          text: text
        }];
      }

      return tooltips;
    }));

    return _this;
  }

  _createClass(MeasureDistanceMode, [{
    key: "_setEndingPoint",
    value: function _setEndingPoint(mapCoords) {
      this.endingPoint = {
        type: 'Feature',
        properties: {
          guideType: 'editHandle',
          editHandleType: 'existing',
          featureIndex: -1,
          positionIndexes: []
        },
        geometry: {
          type: 'Point',
          coordinates: mapCoords
        }
      };
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, props) {
      if (!this.startingPoint || this.endingPointLocked) {
        this.startingPoint = {
          type: 'Feature',
          properties: {
            guideType: 'editHandle',
            editHandleType: 'existing',
            featureIndex: -1,
            positionIndexes: []
          },
          geometry: {
            type: 'Point',
            coordinates: event.mapCoords
          }
        };
        this.endingPoint = null;
        this.endingPointLocked = false;
      } else if (this.startingPoint) {
        this._setEndingPoint(event.mapCoords);

        this.endingPointLocked = true;
      }
    } // Called when the pointer moved, regardless of whether the pointer is down, up, and whether something was picked

  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {
      if (this.startingPoint && !this.endingPointLocked) {
        this._setEndingPoint(event.mapCoords);
      }

      props.onUpdateCursor('cell');
    } // Return features that can be used as a guide for editing the data

  }, {
    key: "getGuides",
    value: function getGuides(props) {
      var guides = {
        type: 'FeatureCollection',
        features: []
      };
      var features = guides.features;

      if (this.startingPoint) {
        features.push(this.startingPoint);
      }

      if (this.endingPoint) {
        features.push(this.endingPoint);
      }

      if (this.startingPoint && this.endingPoint) {
        features.push({
          type: 'Feature',
          properties: {
            guideType: 'tentative'
          },
          geometry: {
            type: 'LineString',
            coordinates: [this.startingPoint.geometry.coordinates, this.endingPoint.geometry.coordinates]
          }
        });
      }

      return guides;
    }
  }, {
    key: "getTooltips",
    value: function getTooltips(props) {
      return this._getTooltips({
        modeConfig: props.modeConfig,
        startingPoint: this.startingPoint,
        endingPoint: this.endingPoint
      });
    }
  }]);

  return MeasureDistanceMode;
}(_geojsonEditMode.GeoJsonEditMode);

exports.MeasureDistanceMode = MeasureDistanceMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbWVhc3VyZS1kaXN0YW5jZS1tb2RlLnRzIl0sIm5hbWVzIjpbIkRFRkFVTFRfVE9PTFRJUFMiLCJNZWFzdXJlRGlzdGFuY2VNb2RlIiwibW9kZUNvbmZpZyIsInN0YXJ0aW5nUG9pbnQiLCJlbmRpbmdQb2ludCIsInRvb2x0aXBzIiwiZm9ybWF0VG9vbHRpcCIsInR1cmZPcHRpb25zIiwibWVhc3VyZW1lbnRDYWxsYmFjayIsInVuaXRzIiwiZGlzdGFuY2UiLCJ0ZXh0IiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJwb3NpdGlvbiIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJtYXBDb29yZHMiLCJ0eXBlIiwicHJvcGVydGllcyIsImd1aWRlVHlwZSIsImVkaXRIYW5kbGVUeXBlIiwiZmVhdHVyZUluZGV4IiwicG9zaXRpb25JbmRleGVzIiwiZXZlbnQiLCJwcm9wcyIsImVuZGluZ1BvaW50TG9ja2VkIiwiX3NldEVuZGluZ1BvaW50Iiwib25VcGRhdGVDdXJzb3IiLCJndWlkZXMiLCJmZWF0dXJlcyIsInB1c2giLCJfZ2V0VG9vbHRpcHMiLCJHZW9Kc29uRWRpdE1vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFFQTs7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixHQUFHLEVBQXpCOztJQUVhQyxtQjs7Ozs7Ozs7Ozs7Ozs7OztvRUFDcUQsSTs7a0VBQ0YsSTs7d0VBQzFDLEs7O21FQWtCTCx5QkFBUSxnQkFBZ0Q7QUFBQSxVQUE3Q0MsVUFBNkMsUUFBN0NBLFVBQTZDO0FBQUEsVUFBakNDLGFBQWlDLFFBQWpDQSxhQUFpQztBQUFBLFVBQWxCQyxXQUFrQixRQUFsQkEsV0FBa0I7QUFDckUsVUFBSUMsUUFBUSxHQUFHTCxnQkFBZjs7QUFFQSxVQUFJRyxhQUFhLElBQUlDLFdBQXJCLEVBQWtDO0FBQUEsb0JBQzRCRixVQUFVLElBQUksRUFEMUM7QUFBQSxZQUN4QkksYUFE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RCxNQUZnRCxDQUU3REMsUUFGNkQ7O0FBSXJFLFVBQUksS0FBSzNCLGFBQVQsRUFBd0I7QUFDdEIyQixRQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBYyxLQUFLNUIsYUFBbkI7QUFDRDs7QUFDRCxVQUFJLEtBQUtDLFdBQVQsRUFBc0I7QUFDcEIwQixRQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBYyxLQUFLM0IsV0FBbkI7QUFDRDs7QUFDRCxVQUFJLEtBQUtELGFBQUwsSUFBc0IsS0FBS0MsV0FBL0IsRUFBNEM7QUFDMUMwQixRQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBYztBQUNaYixVQUFBQSxJQUFJLEVBQUUsU0FETTtBQUVaQyxVQUFBQSxVQUFVLEVBQUU7QUFBRUMsWUFBQUEsU0FBUyxFQUFFO0FBQWIsV0FGQTtBQUdaTCxVQUFBQSxRQUFRLEVBQUU7QUFDUkcsWUFBQUEsSUFBSSxFQUFFLFlBREU7QUFFUkYsWUFBQUEsV0FBVyxFQUFFLENBQ1gsS0FBS2IsYUFBTCxDQUFtQlksUUFBbkIsQ0FBNEJDLFdBRGpCLEVBRVgsS0FBS1osV0FBTCxDQUFpQlcsUUFBakIsQ0FBMEJDLFdBRmY7QUFGTDtBQUhFLFNBQWQ7QUFXRDs7QUFDRCxhQUFPYSxNQUFQO0FBQ0Q7OztnQ0FFV0osSyxFQUFnRDtBQUMxRCxhQUFPLEtBQUtPLFlBQUwsQ0FBa0I7QUFDdkI5QixRQUFBQSxVQUFVLEVBQUV1QixLQUFLLENBQUN2QixVQURLO0FBRXZCQyxRQUFBQSxhQUFhLEVBQUUsS0FBS0EsYUFGRztBQUd2QkMsUUFBQUEsV0FBVyxFQUFFLEtBQUtBO0FBSEssT0FBbEIsQ0FBUDtBQUtEOzs7O0VBdEhzQzZCLGdDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHR1cmZEaXN0YW5jZSBmcm9tICdAdHVyZi9kaXN0YW5jZSc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgbWVtb2l6ZSBmcm9tICcuLi9tZW1vaXplJztcbmltcG9ydCB7XG4gIENsaWNrRXZlbnQsXG4gIFBvaW50ZXJNb3ZlRXZlbnQsXG4gIFRvb2x0aXAsXG4gIE1vZGVQcm9wcyxcbiAgR3VpZGVGZWF0dXJlQ29sbGVjdGlvbixcbiAgRWRpdEhhbmRsZUZlYXR1cmUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEZlYXR1cmVDb2xsZWN0aW9uLCBQb3NpdGlvbiB9IGZyb20gJy4uL2dlb2pzb24tdHlwZXMnO1xuaW1wb3J0IHsgR2VvSnNvbkVkaXRNb2RlIH0gZnJvbSAnLi9nZW9qc29uLWVkaXQtbW9kZSc7XG5cbmNvbnN0IERFRkFVTFRfVE9PTFRJUFMgPSBbXTtcblxuZXhwb3J0IGNsYXNzIE1lYXN1cmVEaXN0YW5jZU1vZGUgZXh0ZW5kcyBHZW9Kc29uRWRpdE1vZGUge1xuICBzdGFydGluZ1BvaW50OiBSZWFkb25seTxFZGl0SGFuZGxlRmVhdHVyZT4gfCBudWxsIHwgdW5kZWZpbmVkID0gbnVsbDtcbiAgZW5kaW5nUG9pbnQ6IFJlYWRvbmx5PEVkaXRIYW5kbGVGZWF0dXJlPiB8IG51bGwgfCB1bmRlZmluZWQgPSBudWxsO1xuICBlbmRpbmdQb2ludExvY2tlZCA9IGZhbHNlO1xuXG4gIF9zZXRFbmRpbmdQb2ludChtYXBDb29yZHM6IFBvc2l0aW9uKSB7XG4gICAgdGhpcy5lbmRpbmdQb2ludCA9IHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZ3VpZGVUeXBlOiAnZWRpdEhhbmRsZScsXG4gICAgICAgIGVkaXRIYW5kbGVUeXBlOiAnZXhpc3RpbmcnLFxuICAgICAgICBmZWF0dXJlSW5kZXg6IC0xLFxuICAgICAgICBwb3NpdGlvbkluZGV4ZXM6IFtdLFxuICAgICAgfSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBtYXBDb29yZHMsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBfZ2V0VG9vbHRpcHMgPSBtZW1vaXplKCh7IG1vZGVDb25maWcsIHN0YXJ0aW5nUG9pbnQsIGVuZGluZ1BvaW50IH0pID0+IHtcbiAgICBsZXQgdG9vbHRpcHMgPSBERUZBVUxUX1RPT0xUSVBTO1xuXG4gICAgaWYgKHN0YXJ0aW5nUG9pbnQgJiYgZW5kaW5nUG9pbnQpIHtcbiAgICAgIGNvbnN0IHsgZm9ybWF0VG9vbHRpcCwgdHVyZk9wdGlvbnMsIG1lYXN1cmVtZW50Q2FsbGJhY2sgfSA9IG1vZGVDb25maWcgfHwge307XG4gICAgICBjb25zdCB1bml0cyA9ICh0dXJmT3B0aW9ucyAmJiB0dXJmT3B0aW9ucy51bml0cykgfHwgJ2tpbG9tZXRlcnMnO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHR1cmZEaXN0YW5jZShzdGFydGluZ1BvaW50LCBlbmRpbmdQb2ludCwgdHVyZk9wdGlvbnMpO1xuXG4gICAgICBsZXQgdGV4dDtcbiAgICAgIGlmIChmb3JtYXRUb29sdGlwKSB7XG4gICAgICAgIHRleHQgPSBmb3JtYXRUb29sdGlwKGRpc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHJvdW5kIHRvIDIgZGVjaW1hbCBwbGFjZXMgYW5kIGFwcGVuZCB1bml0c1xuICAgICAgICB0ZXh0ID0gYCR7cGFyc2VGbG9hdChkaXN0YW5jZSkudG9GaXhlZCgyKX0gJHt1bml0c31gO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVhc3VyZW1lbnRDYWxsYmFjaykge1xuICAgICAgICBtZWFzdXJlbWVudENhbGxiYWNrKGRpc3RhbmNlKTtcbiAgICAgIH1cblxuICAgICAgdG9vbHRpcHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBwb3NpdGlvbjogZW5kaW5nUG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvb2x0aXBzO1xuICB9KTtcblxuICBoYW5kbGVDbGljayhldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRpbmdQb2ludCB8fCB0aGlzLmVuZGluZ1BvaW50TG9ja2VkKSB7XG4gICAgICB0aGlzLnN0YXJ0aW5nUG9pbnQgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGd1aWRlVHlwZTogJ2VkaXRIYW5kbGUnLFxuICAgICAgICAgIGVkaXRIYW5kbGVUeXBlOiAnZXhpc3RpbmcnLFxuICAgICAgICAgIGZlYXR1cmVJbmRleDogLTEsXG4gICAgICAgICAgcG9zaXRpb25JbmRleGVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBldmVudC5tYXBDb29yZHMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgdGhpcy5lbmRpbmdQb2ludCA9IG51bGw7XG4gICAgICB0aGlzLmVuZGluZ1BvaW50TG9ja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0aW5nUG9pbnQpIHtcbiAgICAgIHRoaXMuX3NldEVuZGluZ1BvaW50KGV2ZW50Lm1hcENvb3Jkcyk7XG4gICAgICB0aGlzLmVuZGluZ1BvaW50TG9ja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxsZWQgd2hlbiB0aGUgcG9pbnRlciBtb3ZlZCwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwb2ludGVyIGlzIGRvd24sIHVwLCBhbmQgd2hldGhlciBzb21ldGhpbmcgd2FzIHBpY2tlZFxuICBoYW5kbGVQb2ludGVyTW92ZShldmVudDogUG9pbnRlck1vdmVFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGFydGluZ1BvaW50ICYmICF0aGlzLmVuZGluZ1BvaW50TG9ja2VkKSB7XG4gICAgICB0aGlzLl9zZXRFbmRpbmdQb2ludChldmVudC5tYXBDb29yZHMpO1xuICAgIH1cblxuICAgIHByb3BzLm9uVXBkYXRlQ3Vyc29yKCdjZWxsJyk7XG4gIH1cblxuICAvLyBSZXR1cm4gZmVhdHVyZXMgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGd1aWRlIGZvciBlZGl0aW5nIHRoZSBkYXRhXG4gIGdldEd1aWRlcyhwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6IEd1aWRlRmVhdHVyZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGd1aWRlczogR3VpZGVGZWF0dXJlQ29sbGVjdGlvbiA9IHsgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IFtdIH07XG4gICAgY29uc3QgeyBmZWF0dXJlcyB9ID0gZ3VpZGVzO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRpbmdQb2ludCkge1xuICAgICAgZmVhdHVyZXMucHVzaCh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmRpbmdQb2ludCkge1xuICAgICAgZmVhdHVyZXMucHVzaCh0aGlzLmVuZGluZ1BvaW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhcnRpbmdQb2ludCAmJiB0aGlzLmVuZGluZ1BvaW50KSB7XG4gICAgICBmZWF0dXJlcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7IGd1aWRlVHlwZTogJ3RlbnRhdGl2ZScgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRpbmdQb2ludC5nZW9tZXRyeS5jb29yZGluYXRlcyxcbiAgICAgICAgICAgIHRoaXMuZW5kaW5nUG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ3VpZGVzO1xuICB9XG5cbiAgZ2V0VG9vbHRpcHMocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pOiBUb29sdGlwW10ge1xuICAgIHJldHVybiB0aGlzLl9nZXRUb29sdGlwcyh7XG4gICAgICBtb2RlQ29uZmlnOiBwcm9wcy5tb2RlQ29uZmlnLFxuICAgICAgc3RhcnRpbmdQb2ludDogdGhpcy5zdGFydGluZ1BvaW50LFxuICAgICAgZW5kaW5nUG9pbnQ6IHRoaXMuZW5kaW5nUG9pbnQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==