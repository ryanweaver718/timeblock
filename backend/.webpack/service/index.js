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
/* harmony export */   "response": () => /* binding */ response,
/* harmony export */   "pickDefined": () => /* binding */ pickDefined
/* harmony export */ });
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/pickBy */ "lodash/pickBy");
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pickBy__WEBPACK_IMPORTED_MODULE_0__);

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
const pickDefined = object => lodash_pickBy__WEBPACK_IMPORTED_MODULE_0___default()(object, value => value !== undefined && value !== null);

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createItem": () => /* binding */ createItem,
/* harmony export */   "getItems": () => /* binding */ getItems,
/* harmony export */   "updateItem": () => /* binding */ updateItem,
/* harmony export */   "deleteItem": () => /* binding */ deleteItem,
/* harmony export */   "getItemGroups": () => /* binding */ getItemGroups,
/* harmony export */   "createItemGroup": () => /* binding */ createItemGroup
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./helpers.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models */ "./models.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/pickBy */ "lodash/pickBy");
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_pickBy__WEBPACK_IMPORTED_MODULE_3__);




const createItem = async ({
  body
}) => {
  const {
    details,
    totalMinutes,
    name
  } = JSON.parse(body);
  const item = await _models__WEBPACK_IMPORTED_MODULE_1__.ItemModel.create({
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)(),
    name,
    details,
    totalMinutes
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    item
  });
};
const getItems = async () => {
  let items = await _models__WEBPACK_IMPORTED_MODULE_1__.ItemModel.scan().exec();
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    items
  });
};
const updateItem = async ({
  body,
  queryStringParameters
}) => {
  const {
    id
  } = queryStringParameters;
  const {
    name,
    details,
    totalMinutes
  } = JSON.parse(body);
  const item = await _models__WEBPACK_IMPORTED_MODULE_1__.ItemModel.update({
    id
  }, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.pickDefined)({
    name,
    details,
    totalMinutes
  }));
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    item
  });
};
const deleteItem = async ({
  queryStringParameters
}) => {
  const {
    id
  } = queryStringParameters;
  await _models__WEBPACK_IMPORTED_MODULE_1__.ItemModel.delete({
    id
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    success: true
  });
};
const getItemGroups = async () => {
  const groups = (await _models__WEBPACK_IMPORTED_MODULE_1__.ItemGroupModel.scan().exec()) || [];
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    groups
  });
};
const createItemGroup = async ({
  body
}) => {
  const {
    itemIds,
    name,
    details
  } = JSON.parse(body);
  const group = await _models__WEBPACK_IMPORTED_MODULE_1__.ItemGroupModel.create({
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)(),
    itemIds,
    name,
    details
  });
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.response)({
    group
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
/* harmony export */   "ItemGroupModel": () => /* binding */ ItemGroupModel,
/* harmony export */   "ItemModel": () => /* binding */ ItemModel
/* harmony export */ });
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamoose */ "dynamoose");
/* harmony import */ var dynamoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dynamoose__WEBPACK_IMPORTED_MODULE_0__);

const ItemSchema = new dynamoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: String,
  details: String,
  totalMinutes: String
});
const ItemGroupSchema = new dynamoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: String,
  details: String,
  itemIds: {
    type: Array,
    schema: [String]
  }
}); // const DaySchema = new Schema({
//   type: {
//     hashKey: true,
//     type: String,
//     default: 'day',
//   },
//   date: {
//     rangeKey: true,
//     type: String,
//   },
//   tasks: {
//     type: Array,
//     schema: [TaskSchema],
//   },
// })
// export const DayModel = model('day', DaySchema)

const ItemGroupModel = (0,dynamoose__WEBPACK_IMPORTED_MODULE_0__.model)('item-group', ItemGroupSchema);
const ItemModel = (0,dynamoose__WEBPACK_IMPORTED_MODULE_0__.model)('item', ItemSchema);

/***/ }),

/***/ "dynamoose":
/*!****************************!*\
  !*** external "dynamoose" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("dynamoose");;

/***/ }),

/***/ "lodash/pickBy":
/*!********************************!*\
  !*** external "lodash/pickBy" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/pickBy");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

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