"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(index)/home/page",{

/***/ "(app-pages-browser)/./app/(index)/home/page.tsx":
/*!***********************************!*\
  !*** ./app/(index)/home/page.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Container_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=Container!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Container.js\");\n/* harmony import */ var _app_ui_common_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/ui/common-pagination */ \"(app-pages-browser)/./app/ui/common-pagination.tsx\");\n/* harmony import */ var _app_ui_home_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/ui/home/selection */ \"(app-pages-browser)/./app/ui/home/selection.tsx\");\n/* harmony import */ var _app_ui_home_posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/ui/home/posts */ \"(app-pages-browser)/./app/ui/home/posts.tsx\");\n/* harmony import */ var _app_lib_endpoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/lib/endpoints */ \"(app-pages-browser)/./app/lib/endpoints.ts\");\n/* harmony import */ var _app_lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/app/lib/constants */ \"(app-pages-browser)/./app/lib/constants.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    console.log(\" ===================================== /home ===================================== \");\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [pagination, setPagination] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const [orderMode, setOrderMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    // 获取初始页面数据\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        (0,_app_lib_endpoints__WEBPACK_IMPORTED_MODULE_5__.indexEndpoint)({\n            requestParams: [\n                0,\n                _app_lib_constants__WEBPACK_IMPORTED_MODULE_6__.limitDefault,\n                orderMode\n            ]\n        }).then((data)=>{\n            setData(data);\n            setPagination({\n                current: 1,\n                limit: 5,\n                count: data.count\n            });\n        });\n    }, [\n        orderMode\n    ]);\n    // 用于分页\n    const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (pagination)=>{\n        const data = await (0,_app_lib_endpoints__WEBPACK_IMPORTED_MODULE_5__.indexEndpoint)({\n            requestParams: [\n                (pagination.current - 1) * pagination.limit,\n                pagination.limit,\n                orderMode\n            ]\n        });\n        if (data.code == \"200\") {\n            setData(data);\n            setPagination({\n                current: pagination.current,\n                limit: pagination.limit,\n                count: data.count\n            });\n        }\n    }, []);\n    if (data != undefined) {\n        console.log(\"data: \", data);\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Container_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_ui_home_selection__WEBPACK_IMPORTED_MODULE_3__.SelectionAndPublish, {\n                    orderMode: orderMode,\n                    setOrderMode: setOrderMode,\n                    set: true\n                }, void 0, false, {\n                    fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\(index)\\\\home\\\\page.tsx\",\n                    lineNumber: 54,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_ui_home_posts__WEBPACK_IMPORTED_MODULE_4__.Posts, {\n                    data: data\n                }, void 0, false, {\n                    fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\(index)\\\\home\\\\page.tsx\",\n                    lineNumber: 56,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_ui_common_pagination__WEBPACK_IMPORTED_MODULE_2__.CommonPagination, {\n                    pagination: pagination,\n                    onClick: handleClick\n                }, void 0, false, {\n                    fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\(index)\\\\home\\\\page.tsx\",\n                    lineNumber: 58,\n                    columnNumber: 5\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\(index)\\\\home\\\\page.tsx\",\n            lineNumber: 52,\n            columnNumber: 4\n        }, this);\n    } else {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Container_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\(index)\\\\home\\\\page.tsx\",\n            lineNumber: 65,\n            columnNumber: 4\n        }, this);\n    }\n}\n_s(Page, \"Mts2wSjMnmkZg0THjLvJbuHmbaM=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8oaW5kZXgpL2hvbWUvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR3lEO0FBQ2I7QUFFb0M7QUFDbEI7QUFDbEI7QUFDUTtBQUNEO0FBRXBDLFNBQVNVOztJQUN2QkMsUUFBUUMsR0FBRyxDQUFDO0lBRVosTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdiLCtDQUFRQTtJQUNoQyxNQUFNLENBQUNjLFlBQVlDLGNBQWMsR0FBR2YsK0NBQVFBLENBQWlCLENBQUM7SUFDOUQsTUFBTSxDQUFDZ0IsV0FBV0MsYUFBYSxHQUFHakIsK0NBQVFBLENBQUM7SUFFM0MsV0FBVztJQUNYRCxnREFBU0EsQ0FBQztRQUNUUSxpRUFBYUEsQ0FBQztZQUFDVyxlQUFlO2dCQUFDO2dCQUFHViw0REFBWUE7Z0JBQUVRO2FBQVU7UUFBQSxHQUFHRyxJQUFJLENBQUNQLENBQUFBO1lBQ2pFQyxRQUFRRDtZQUNSRyxjQUFjO2dCQUNiSyxTQUFTO2dCQUNUQyxPQUFPO2dCQUNQQyxPQUFPVixLQUFLVSxLQUFLO1lBQ2xCO1FBQ0Q7SUFDRCxHQUFHO1FBQUNOO0tBQVU7SUFFZCxPQUFPO0lBQ1AsTUFBTU8sY0FBY3RCLGtEQUFXQSxDQUFDLE9BQU1hO1FBQ3JDLE1BQU1GLE9BQU8sTUFBTUwsaUVBQWFBLENBQUM7WUFDaENXLGVBQWU7Z0JBQUVKLENBQUFBLFdBQVdNLE9BQU8sR0FBRyxLQUFLTixXQUFXTyxLQUFLO2dCQUFFUCxXQUFXTyxLQUFLO2dCQUFFTDthQUFVO1FBQzFGO1FBRUEsSUFBR0osS0FBS1ksSUFBSSxJQUFJLE9BQU07WUFDckJYLFFBQVFEO1lBQ1JHLGNBQWM7Z0JBQ2JLLFNBQVNOLFdBQVdNLE9BQU87Z0JBQzNCQyxPQUFPUCxXQUFXTyxLQUFLO2dCQUN2QkMsT0FBT1YsS0FBS1UsS0FBSztZQUNsQjtRQUNEO0lBRUQsR0FBRyxFQUFFO0lBRUwsSUFBR1YsUUFBUWEsV0FBVTtRQUNwQmYsUUFBUUMsR0FBRyxDQUFDLFVBQVVDO1FBQ3RCLHFCQUNDLDhEQUFDVix3RkFBU0E7OzhCQUVULDhEQUFDRyx1RUFBbUJBO29CQUFDVyxXQUFXQTtvQkFBV0MsY0FBY0E7b0JBQWNTLEdBQUc7Ozs7Ozs4QkFFMUUsOERBQUNwQixxREFBS0E7b0JBQUNNLE1BQU1BOzs7Ozs7OEJBRWIsOERBQUNSLHVFQUFjQTtvQkFBQ1UsWUFBWUE7b0JBQVlhLFNBQVNKOzs7Ozs7Ozs7Ozs7SUFJcEQsT0FDSTtRQUNILHFCQUNDLDhEQUFDckIsd0ZBQVNBOzs7OztJQUdaO0FBSUQ7R0EzRHdCTztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvKGluZGV4KS9ob21lL3BhZ2UudHN4P2Y2NDQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXHJcblxyXG5pbXBvcnQgeyBQYWdpbmF0aW9uRGF0YSB9IGZyb20gXCJAL2FwcC9saWIvdHlwZXNcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xyXG5cclxuaW1wb3J0IHsgQ29tbW9uUGFnaW5hdGlvbiBhcyBIb21lUGFnaW5hdGlvbiB9IGZyb20gXCJAL2FwcC91aS9jb21tb24tcGFnaW5hdGlvblwiO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25BbmRQdWJsaXNoIH0gZnJvbSBcIkAvYXBwL3VpL2hvbWUvc2VsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFBvc3RzIH0gZnJvbSBcIkAvYXBwL3VpL2hvbWUvcG9zdHNcIjtcclxuaW1wb3J0IHsgaW5kZXhFbmRwb2ludCB9IGZyb20gXCJAL2FwcC9saWIvZW5kcG9pbnRzXCI7XHJcbmltcG9ydCB7IGxpbWl0RGVmYXVsdCB9IGZyb20gXCJAL2FwcC9saWIvY29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlKCl7XHJcblx0Y29uc29sZS5sb2coXCIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvaG9tZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFwiKVxyXG5cclxuXHRjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZTxhbnk+KCk7XHJcblx0Y29uc3QgW3BhZ2luYXRpb24sIHNldFBhZ2luYXRpb25dID0gdXNlU3RhdGU8UGFnaW5hdGlvbkRhdGE+KHt9IGFzIFBhZ2luYXRpb25EYXRhKTtcclxuXHRjb25zdCBbb3JkZXJNb2RlLCBzZXRPcmRlck1vZGVdID0gdXNlU3RhdGUoMCk7XHJcblxyXG5cdC8vIOiOt+WPluWIneWni+mhtemdouaVsOaNrlxyXG5cdHVzZUVmZmVjdCgoKT0+e1xyXG5cdFx0aW5kZXhFbmRwb2ludCh7cmVxdWVzdFBhcmFtczogWzAsIGxpbWl0RGVmYXVsdCwgb3JkZXJNb2RlXX0pLnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdHNldERhdGEoZGF0YSk7XHJcblx0XHRcdHNldFBhZ2luYXRpb24oe1xyXG5cdFx0XHRcdGN1cnJlbnQ6IDEsXHJcblx0XHRcdFx0bGltaXQ6IDUsXHJcblx0XHRcdFx0Y291bnQ6IGRhdGEuY291bnQsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSlcclxuXHR9LCBbb3JkZXJNb2RlXSlcclxuXHJcblx0Ly8g55So5LqO5YiG6aG1XHJcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSB1c2VDYWxsYmFjayhhc3luYyhwYWdpbmF0aW9uOiBQYWdpbmF0aW9uRGF0YSk9PntcclxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBpbmRleEVuZHBvaW50KHtcclxuXHRcdFx0cmVxdWVzdFBhcmFtczogWyhwYWdpbmF0aW9uLmN1cnJlbnQgLSAxKSAqIHBhZ2luYXRpb24ubGltaXQsIHBhZ2luYXRpb24ubGltaXQsIG9yZGVyTW9kZV1cclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRpZihkYXRhLmNvZGUgPT0gXCIyMDBcIil7XHJcblx0XHRcdHNldERhdGEoZGF0YSk7XHJcblx0XHRcdHNldFBhZ2luYXRpb24oe1xyXG5cdFx0XHRcdGN1cnJlbnQ6IHBhZ2luYXRpb24uY3VycmVudCxcclxuXHRcdFx0XHRsaW1pdDogcGFnaW5hdGlvbi5saW1pdCxcclxuXHRcdFx0XHRjb3VudDogZGF0YS5jb3VudCxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHJcblx0fSwgW10pXHJcblxyXG5cdGlmKGRhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiZGF0YTogXCIsIGRhdGEpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PENvbnRhaW5lcj5cclxuXHRcclxuXHRcdFx0XHQ8U2VsZWN0aW9uQW5kUHVibGlzaCBvcmRlck1vZGU9e29yZGVyTW9kZX0gc2V0T3JkZXJNb2RlPXtzZXRPcmRlck1vZGV9IHNldC8+XHJcblx0XHJcblx0XHRcdFx0PFBvc3RzIGRhdGE9e2RhdGF9Lz5cclxuXHJcblx0XHRcdFx0PEhvbWVQYWdpbmF0aW9uIHBhZ2luYXRpb249e3BhZ2luYXRpb259IG9uQ2xpY2s9e2hhbmRsZUNsaWNrfS8+IFxyXG5cdFx0XHRcdFx0IFxyXG5cdFx0XHQ8L0NvbnRhaW5lcj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Q29udGFpbmVyPlxyXG5cdFx0XHQ8L0NvbnRhaW5lcj5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRcclxuXHJcbn1cclxuXHJcblxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIkNvbnRhaW5lciIsIkNvbW1vblBhZ2luYXRpb24iLCJIb21lUGFnaW5hdGlvbiIsIlNlbGVjdGlvbkFuZFB1Ymxpc2giLCJQb3N0cyIsImluZGV4RW5kcG9pbnQiLCJsaW1pdERlZmF1bHQiLCJQYWdlIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJzZXREYXRhIiwicGFnaW5hdGlvbiIsInNldFBhZ2luYXRpb24iLCJvcmRlck1vZGUiLCJzZXRPcmRlck1vZGUiLCJyZXF1ZXN0UGFyYW1zIiwidGhlbiIsImN1cnJlbnQiLCJsaW1pdCIsImNvdW50IiwiaGFuZGxlQ2xpY2siLCJjb2RlIiwidW5kZWZpbmVkIiwic2V0Iiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(index)/home/page.tsx\n"));

/***/ })

});