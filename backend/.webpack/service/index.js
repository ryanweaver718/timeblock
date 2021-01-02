(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./helpers.js":
/*!********************!*\
  !*** ./helpers.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "response": () => /* binding */ response
/* harmony export */ });
const response = data => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDay": () => /* binding */ createDay,
/* harmony export */   "createTask": () => /* binding */ createTask,
/* harmony export */   "createSavedDay": () => /* binding */ createSavedDay,
/* harmony export */   "getTasks": () => /* binding */ getTasks,
/* harmony export */   "getSavedDays": () => /* binding */ getSavedDays
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./helpers.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models */ "./models.js");


const createDay = async ({
  body
}) => {
  const {
    date,
    tasks
  } = JSON.parse(body);
  const day = await _models__WEBPACK_IMPORTED_MODULE_1__.DayModel.create({
    date,
    tasks
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    day
  });
};
const createTask = async ({
  body
}) => {
  const {
    details,
    startTime,
    endTime,
    totalMinutes
  } = JSON.parse(body);
  const task = await _models__WEBPACK_IMPORTED_MODULE_1__.TaskModel.create({
    details,
    startTime,
    endTime,
    totalMinutes,
    totalMinutes
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    task
  });
};
const createSavedDay = async ({
  body
}) => {
  const {
    name,
    tasks
  } = JSON.parse(body);
  const savedDay = await _models__WEBPACK_IMPORTED_MODULE_1__.DayModel.create({
    name,
    tasks
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    savedDay
  });
};
const getTasks = async () => {
  let tasks = await _models__WEBPACK_IMPORTED_MODULE_1__.TaskModel.scan().exec();
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    tasks
  });
};
const getSavedDays = async () => {
  let savedDays = await _models__WEBPACK_IMPORTED_MODULE_1__.SavedDayModel.scan().exec();
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    savedDays
  });
};

/***/ }),

/***/ "./models.js":
/*!*******************!*\
  !*** ./models.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DayModel": () => /* binding */ DayModel,
/* harmony export */   "SavedDayModel": () => /* binding */ SavedDayModel,
/* harmony export */   "TaskModel": () => /* binding */ TaskModel
/* harmony export */ });
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamoose */ "dynamoose");
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dynamoose__WEBPACK_IMPORTED_MODULE_0__);

const TaskSchema = new dynamoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  id: {
    type: String,
    hashKey: true
  },
  details: String,
  startTime: String,
  endTime: String,
  totalMinutes: String
});
const SavedDaySchema = new dynamoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: String,
  tasks: {
    type: Array,
    schema: TaskSchema
  }
});
const DaySchema = new dynamoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  type: {
    hashKey: true,
    type: String,
    default: 'day'
  },
  date: {
    rangeKey: true,
    type: String
  },
  tasks: {
    type: Array,
    schema: [TaskSchema]
  }
});
const DayModel = (0,dynamoose__WEBPACK_IMPORTED_MODULE_0__.model)('day', DaySchema);
const SavedDayModel = (0,dynamoose__WEBPACK_IMPORTED_MODULE_0__.model)('saved-day', SavedDaySchema);
const TaskModel = (0,dynamoose__WEBPACK_IMPORTED_MODULE_0__.model)('task', TaskSchema);

/***/ }),

/***/ "dynamoose":
/*!****************************!*\
  !*** external "dynamoose" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("dynamoose");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()

));
//# sourceMappingURL=index.js.map