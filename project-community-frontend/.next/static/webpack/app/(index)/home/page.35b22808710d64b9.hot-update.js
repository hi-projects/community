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

/***/ "(app-pages-browser)/./app/ui/home/selection.tsx":
/*!***********************************!*\
  !*** ./app/ui/home/selection.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SelectionAndPublish: function() { return /* binding */ SelectionAndPublish; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Form,Modal,Nav!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Nav.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Form,Modal,Nav!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Button.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Form,Modal,Nav!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Modal.js\");\n/* harmony import */ var _barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=Button,Form,Modal,Nav!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Form.js\");\n/* harmony import */ var _layout_root_header_and_children__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout-root/header-and-children */ \"(app-pages-browser)/./app/ui/layout-root/header-and-children.tsx\");\n/* harmony import */ var _app_lib_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/lib/endpoints */ \"(app-pages-browser)/./app/lib/endpoints.ts\");\n/* __next_internal_client_entry_do_not_use__ SelectionAndPublish auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst titleId = \"title\";\nconst contentId = \"content\";\nconst publishFormId = \"publish-form\";\nfunction SelectionAndPublish(param) {\n    let { setOrderMode } = param;\n    _s();\n    console.log(\" ============================= </SelectionAndPublish> ============================= \");\n    const userState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_layout_root_header_and_children__WEBPACK_IMPORTED_MODULE_2__.UserStateContext);\n    const user = userState.user;\n    const [showPublishModal, setShowPublishModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [showTipModal, setShowTipModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [tip, setTip] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [activeKey, setActiveKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    async function handlePublish(event) {\n        event.preventDefault();\n        const formData = {\n            \"title\": event.target[titleId].value,\n            \"content\": event.target[contentId].value\n        };\n        const data = await (0,_app_lib_endpoints__WEBPACK_IMPORTED_MODULE_3__.publishEndpoint)({\n            formData: JSON.stringify(formData)\n        });\n        setShowPublishModal(false);\n        setShowTipModal(true);\n        setTip(data.msg);\n        const indexData = await (0,_app_lib_endpoints__WEBPACK_IMPORTED_MODULE_3__.indexEndpoint)({\n            requestParams: [\n                0,\n                li\n            ]\n        });\n    }\n    // 根据热度查询帖子\n    async function navFunction(e, orderMode, activeKey) {\n        e.preventDefault();\n        setActiveKey(activeKey);\n        setOrderMode(orderMode);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"position-relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"tabs\",\n                className: \"mb-3\",\n                as: \"ul\",\n                activeKey: activeKey,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Item, {\n                        as: \"li\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Link, {\n                            eventKey: 1,\n                            onClick: (e)=>navFunction(e, 0, 1),\n                            children: \"最新\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                            lineNumber: 55,\n                            columnNumber: 6\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 5\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Item, {\n                        as: \"li\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Link, {\n                            eventKey: 2,\n                            onClick: (e)=>navFunction(e, 1, 2),\n                            children: \"最热\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 6\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 57,\n                        columnNumber: 5\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                lineNumber: 53,\n                columnNumber: 4\n            }, this),\n            user != undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                size: \"sm\",\n                className: \"position-absolute rt-0\",\n                onClick: ()=>setShowPublishModal(true),\n                children: \"我要发布\"\n            }, void 0, false, {\n                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                lineNumber: 63,\n                columnNumber: 26\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                show: showPublishModal,\n                onHide: ()=>setShowPublishModal(false),\n                \"aria-labelledby\": \"publishModalLabel\",\n                dialogClassName: \"modal-lg\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Header, {\n                        closeButton: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Title, {\n                            as: \"h5\",\n                            children: \"新帖发布\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                            lineNumber: 68,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Body, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                            id: publishFormId,\n                            onSubmit: handlePublish,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Group, {\n                                    controlId: titleId,\n                                    className: \"form-group\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Label, {\n                                            children: \"标题:\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                            lineNumber: 73,\n                                            columnNumber: 14\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Control, {\n                                            type: \"text\",\n                                            placeholder: \"请输入帖子标题!\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                            lineNumber: 74,\n                                            columnNumber: 14\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                    lineNumber: 72,\n                                    columnNumber: 7\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Group, {\n                                    controlId: contentId,\n                                    className: \"form-group\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Label, {\n                                            children: \"正文:\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                            lineNumber: 78,\n                                            columnNumber: 14\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Control, {\n                                            as: \"textarea\",\n                                            placeholder: \"请输入帖子内容!\",\n                                            rows: 15\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                            lineNumber: 79,\n                                            columnNumber: 14\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 12\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                            lineNumber: 71,\n                            columnNumber: 6\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Footer, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                type: \"submit\",\n                                form: publishFormId,\n                                children: \"发布\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                lineNumber: 85,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                variant: \"secondary\",\n                                onClick: ()=>setShowPublishModal(false),\n                                children: \"取消\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                                lineNumber: 86,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 84,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                lineNumber: 66,\n                columnNumber: 4\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                show: showTipModal,\n                dialogClassName: \"modal-lg\",\n                onHide: ()=>setShowTipModal(false),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Header, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Title, {\n                            as: \"h5\",\n                            children: \"提示\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                            lineNumber: 92,\n                            columnNumber: 6\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 91,\n                        columnNumber: 5\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Button_Form_Modal_Nav_react_bootstrap__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Body, {\n                        children: tip\n                    }, void 0, false, {\n                        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                        lineNumber: 94,\n                        columnNumber: 5\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n                lineNumber: 90,\n                columnNumber: 4\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\workspace\\\\workspace-javascript\\\\project-community\\\\app\\\\ui\\\\home\\\\selection.tsx\",\n        lineNumber: 51,\n        columnNumber: 9\n    }, this);\n}\n_s(SelectionAndPublish, \"w7h45x3g7Z6p/YvdAAhnHc+AYH0=\");\n_c = SelectionAndPublish;\n\nvar _c;\n$RefreshReg$(_c, \"SelectionAndPublish\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC91aS9ob21lL3NlbGVjdGlvbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRzZDO0FBQ2M7QUFDVztBQUNEO0FBRXJFLE1BQU1TLFVBQVU7QUFDaEIsTUFBTUMsWUFBWTtBQUNsQixNQUFNQyxnQkFBZ0I7QUFFdEIsU0FBU0Msb0JBQW9CLEtBQWM7UUFBZCxFQUFDQyxZQUFZLEVBQUMsR0FBZDs7SUFDNUJDLFFBQVFDLEdBQUcsQ0FBQztJQUVaLE1BQU1DLFlBQVloQixpREFBVUEsQ0FBQ00sOEVBQWdCQTtJQUM3QyxNQUFNVyxPQUFPRCxVQUFVQyxJQUFJO0lBRTNCLE1BQU0sQ0FBQ0Msa0JBQWtCQyxvQkFBb0IsR0FBR2xCLCtDQUFRQSxDQUFDO0lBQ3pELE1BQU0sQ0FBQ21CLGNBQWNDLGdCQUFnQixHQUFHcEIsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDcUIsS0FBS0MsT0FBTyxHQUFHdEIsK0NBQVFBLENBQVM7SUFDdkMsTUFBTSxDQUFDdUIsV0FBV0MsYUFBYSxHQUFHeEIsK0NBQVFBLENBQUM7SUFFM0MsZUFBZXlCLGNBQWNDLEtBQVM7UUFDckNBLE1BQU1DLGNBQWM7UUFFcEIsTUFBTUMsV0FBVztZQUNoQixTQUFTRixNQUFNRyxNQUFNLENBQUNyQixRQUFRLENBQUNzQixLQUFLO1lBQ3BDLFdBQVdKLE1BQU1HLE1BQU0sQ0FBQ3BCLFVBQVUsQ0FBQ3FCLEtBQUs7UUFDekM7UUFFQSxNQUFNQyxPQUFPLE1BQU14QixtRUFBZUEsQ0FBQztZQUFDcUIsVUFBVUksS0FBS0MsU0FBUyxDQUFDTDtRQUFTO1FBRXRFVixvQkFBb0I7UUFDcEJFLGdCQUFnQjtRQUNoQkUsT0FBT1MsS0FBS0csR0FBRztRQUVmLE1BQU1DLFlBQVksTUFBTTdCLGlFQUFhQSxDQUFDO1lBQUM4QixlQUFlO2dCQUFDO2dCQUFHQzthQUFHO1FBQUE7SUFDOUQ7SUFFQSxXQUFXO0lBQ1gsZUFBZUMsWUFBWUMsQ0FBSyxFQUFFQyxTQUFpQixFQUFFakIsU0FBZ0I7UUFDcEVnQixFQUFFWixjQUFjO1FBRWhCSCxhQUFhRDtRQUNiWCxhQUFhNEI7SUFDZDtJQUdHLHFCQUNJLDhEQUFDQztRQUFJQyxXQUFVOzswQkFFcEIsOERBQUN0QyxvR0FBR0E7Z0JBQUN1QyxTQUFRO2dCQUFPRCxXQUFVO2dCQUFPRSxJQUFHO2dCQUFLckIsV0FBV0E7O2tDQUN2RCw4REFBQ25CLG9HQUFHQSxDQUFDeUMsSUFBSTt3QkFBQ0QsSUFBRztrQ0FDWiw0RUFBQ3hDLG9HQUFHQSxDQUFDMEMsSUFBSTs0QkFBQ0MsVUFBVTs0QkFBR0MsU0FBU1QsQ0FBQUEsSUFBS0QsWUFBWUMsR0FBRyxHQUFHO3NDQUFJOzs7Ozs7Ozs7OztrQ0FFNUQsOERBQUNuQyxvR0FBR0EsQ0FBQ3lDLElBQUk7d0JBQUNELElBQUc7a0NBQ1osNEVBQUN4QyxvR0FBR0EsQ0FBQzBDLElBQUk7NEJBQUNDLFVBQVU7NEJBQUdDLFNBQVNULENBQUFBLElBQUtELFlBQVlDLEdBQUcsR0FBRztzQ0FBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLNUR2QixRQUFRaUMsMkJBQWEsOERBQUNoRCxvR0FBTUE7Z0JBQUNpRCxNQUFLO2dCQUFLUixXQUFVO2dCQUF5Qk0sU0FBUyxJQUFJOUIsb0JBQW9COzBCQUFPOzs7Ozs7MEJBR25ILDhEQUFDZixvR0FBS0E7Z0JBQUNnRCxNQUFNbEM7Z0JBQWtCbUMsUUFBUSxJQUFJbEMsb0JBQW9CO2dCQUFRbUMsbUJBQWdCO2dCQUFvQkMsaUJBQWdCOztrQ0FDcEgsOERBQUNuRCxvR0FBS0EsQ0FBQ29ELE1BQU07d0JBQUNDLFdBQVc7a0NBQ3ZCLDRFQUFDckQsb0dBQUtBLENBQUNzRCxLQUFLOzRCQUFDYixJQUFJO3NDQUFNOzs7Ozs7Ozs7OztrQ0FFekIsOERBQUN6QyxvR0FBS0EsQ0FBQ3VELElBQUk7a0NBQ2hCLDRFQUFDeEQsb0dBQUlBOzRCQUFDeUQsSUFBSWpEOzRCQUFla0QsVUFBVW5DOzs4Q0FDbEMsOERBQUN2QixvR0FBSUEsQ0FBQzJELEtBQUs7b0NBQUNDLFdBQVd0RDtvQ0FBU2tDLFdBQVU7O3NEQUNuQyw4REFBQ3hDLG9HQUFJQSxDQUFDNkQsS0FBSztzREFBQzs7Ozs7O3NEQUNaLDhEQUFDN0Qsb0dBQUlBLENBQUM4RCxPQUFPOzRDQUFDQyxNQUFLOzRDQUFPQyxhQUFZOzs7Ozs7Ozs7Ozs7OENBR3hDLDhEQUFDaEUsb0dBQUlBLENBQUMyRCxLQUFLO29DQUFDQyxXQUFXckQ7b0NBQVdpQyxXQUFVOztzREFDMUMsOERBQUN4QyxvR0FBSUEsQ0FBQzZELEtBQUs7c0RBQUM7Ozs7OztzREFDWiw4REFBQzdELG9HQUFJQSxDQUFDOEQsT0FBTzs0Q0FBQ3BCLElBQUc7NENBQVdzQixhQUFZOzRDQUFXQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FLNUQsOERBQUNoRSxvR0FBS0EsQ0FBQ2lFLE1BQU07OzBDQUNYLDhEQUFDbkUsb0dBQU1BO2dDQUFDZ0UsTUFBSztnQ0FBU0ksTUFBTTNEOzBDQUFlOzs7Ozs7MENBQzNDLDhEQUFDVCxvR0FBTUE7Z0NBQUMwQyxTQUFRO2dDQUFZSyxTQUFTLElBQUk5QixvQkFBb0I7MENBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFJOUUsOERBQUNmLG9HQUFLQTtnQkFBQ2dELE1BQU1oQztnQkFBY21DLGlCQUFnQjtnQkFBV0YsUUFBUSxJQUFJaEMsZ0JBQWdCOztrQ0FDakYsOERBQUNqQixvR0FBS0EsQ0FBQ29ELE1BQU07a0NBQ1osNEVBQUNwRCxvR0FBS0EsQ0FBQ3NELEtBQUs7NEJBQUNiLElBQUk7c0NBQU07Ozs7Ozs7Ozs7O2tDQUV4Qiw4REFBQ3pDLG9HQUFLQSxDQUFDdUQsSUFBSTtrQ0FDVHJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNTjtHQXhGU1Y7S0FBQUE7QUEyRnFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC91aS9ob21lL3NlbGVjdGlvbi50c3g/N2ViYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcclxuXHJcbmltcG9ydCB7IFB1Ymxpc2hGb3JtRGF0YSwgUHVibGlzaFJlc3BvbnNlQm9keSB9IGZyb20gXCJAL2FwcC9saWIvdHlwZXNcIjtcclxuaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uLCBGb3JtLCBNb2RhbCwgTmF2IH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGVDb250ZXh0IH0gZnJvbSBcIi4uL2xheW91dC1yb290L2hlYWRlci1hbmQtY2hpbGRyZW5cIjtcclxuaW1wb3J0IHsgaW5kZXhFbmRwb2ludCwgcHVibGlzaEVuZHBvaW50IH0gZnJvbSBcIkAvYXBwL2xpYi9lbmRwb2ludHNcIjtcclxuXHJcbmNvbnN0IHRpdGxlSWQgPSBcInRpdGxlXCI7XHJcbmNvbnN0IGNvbnRlbnRJZCA9IFwiY29udGVudFwiXHJcbmNvbnN0IHB1Ymxpc2hGb3JtSWQgPSBcInB1Ymxpc2gtZm9ybVwiXHJcblxyXG5mdW5jdGlvbiBTZWxlY3Rpb25BbmRQdWJsaXNoKHtzZXRPcmRlck1vZGV9KXtcclxuXHRjb25zb2xlLmxvZyhcIiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSA8L1NlbGVjdGlvbkFuZFB1Ymxpc2g+ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFwiKVxyXG5cclxuXHRjb25zdCB1c2VyU3RhdGUgPSB1c2VDb250ZXh0KFVzZXJTdGF0ZUNvbnRleHQpO1xyXG5cdGNvbnN0IHVzZXIgPSB1c2VyU3RhdGUudXNlcjtcclxuXHJcblx0Y29uc3QgW3Nob3dQdWJsaXNoTW9kYWwsIHNldFNob3dQdWJsaXNoTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cdGNvbnN0IFtzaG93VGlwTW9kYWwsIHNldFNob3dUaXBNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblx0Y29uc3QgW3RpcCwgc2V0VGlwXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7IFxyXG5cdGNvbnN0IFthY3RpdmVLZXksIHNldEFjdGl2ZUtleV0gPSB1c2VTdGF0ZSgxKVxyXG5cclxuXHRhc3luYyBmdW5jdGlvbiBoYW5kbGVQdWJsaXNoKGV2ZW50OmFueSl7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1EYXRhID0ge1xyXG5cdFx0XHRcInRpdGxlXCI6IGV2ZW50LnRhcmdldFt0aXRsZUlkXS52YWx1ZSxcclxuXHRcdFx0XCJjb250ZW50XCI6IGV2ZW50LnRhcmdldFtjb250ZW50SWRdLnZhbHVlLFxyXG5cdFx0fSBhcyBQdWJsaXNoRm9ybURhdGFcclxuXHJcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcHVibGlzaEVuZHBvaW50KHtmb3JtRGF0YTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpfSlcclxuXHRcdFxyXG5cdFx0c2V0U2hvd1B1Ymxpc2hNb2RhbChmYWxzZSk7XHJcblx0XHRzZXRTaG93VGlwTW9kYWwodHJ1ZSk7XHJcblx0XHRzZXRUaXAoZGF0YS5tc2cpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBpbmRleERhdGEgPSBhd2FpdCBpbmRleEVuZHBvaW50KHtyZXF1ZXN0UGFyYW1zOiBbMCwgbGldfSlcclxuXHR9XHJcblxyXG5cdC8vIOagueaNrueDreW6puafpeivouW4luWtkFxyXG5cdGFzeW5jIGZ1bmN0aW9uIG5hdkZ1bmN0aW9uKGU6YW55LCBvcmRlck1vZGU6IG51bWJlciwgYWN0aXZlS2V5Om51bWJlcil7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHJcblx0XHRzZXRBY3RpdmVLZXkoYWN0aXZlS2V5KVxyXG5cdFx0c2V0T3JkZXJNb2RlKG9yZGVyTW9kZSlcclxuXHR9XHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3NpdGlvbi1yZWxhdGl2ZVwiPlxyXG5cclxuXHRcdFx0PE5hdiB2YXJpYW50PVwidGFic1wiIGNsYXNzTmFtZT1cIm1iLTNcIiBhcz1cInVsXCIgYWN0aXZlS2V5PXthY3RpdmVLZXl9PlxyXG5cdFx0XHRcdDxOYXYuSXRlbSBhcz1cImxpXCI+XHJcblx0XHRcdFx0XHQ8TmF2LkxpbmsgZXZlbnRLZXk9ezF9IG9uQ2xpY2s9e2UgPT4gbmF2RnVuY3Rpb24oZSwgMCwgMSl9PuacgOaWsDwvTmF2Lkxpbms+XHJcblx0XHRcdFx0PC9OYXYuSXRlbT5cclxuXHRcdFx0XHQ8TmF2Lkl0ZW0gYXM9XCJsaVwiPlxyXG5cdFx0XHRcdFx0PE5hdi5MaW5rIGV2ZW50S2V5PXsyfSBvbkNsaWNrPXtlID0+IG5hdkZ1bmN0aW9uKGUsIDEsIDIpfT7mnIDng608L05hdi5MaW5rPlxyXG5cdFx0XHRcdDwvTmF2Lkl0ZW0+XHJcblx0XHRcdDwvTmF2PlxyXG5cdFx0XHRcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHVzZXIgIT0gdW5kZWZpbmVkICYmIDxCdXR0b24gc2l6ZT1cInNtXCIgY2xhc3NOYW1lPVwicG9zaXRpb24tYWJzb2x1dGUgcnQtMFwiIG9uQ2xpY2s9eygpPT5zZXRTaG93UHVibGlzaE1vZGFsKHRydWUpfT7miJHopoHlj5HluIM8L0J1dHRvbj5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0PE1vZGFsIHNob3c9e3Nob3dQdWJsaXNoTW9kYWx9IG9uSGlkZT17KCk9PnNldFNob3dQdWJsaXNoTW9kYWwoZmFsc2UpfSBhcmlhLWxhYmVsbGVkYnk9XCJwdWJsaXNoTW9kYWxMYWJlbFwiIGRpYWxvZ0NsYXNzTmFtZT1cIm1vZGFsLWxnXCI+XHJcbiAgICAgICAgXHRcdDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XHJcbiAgICAgICAgXHRcdCAgPE1vZGFsLlRpdGxlIGFzPXsnaDUnfT7mlrDluJblj5HluIM8L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIFx0XHQ8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICBcdFx0PE1vZGFsLkJvZHk+XHJcblx0XHRcdFx0XHQ8Rm9ybSBpZD17cHVibGlzaEZvcm1JZH0gb25TdWJtaXQ9e2hhbmRsZVB1Ymxpc2h9PlxyXG5cdFx0XHRcdFx0XHQ8Rm9ybS5Hcm91cCBjb250cm9sSWQ9e3RpdGxlSWR9IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgIFx0XHRcdFx0ICAgIFx0PEZvcm0uTGFiZWw+5qCH6aKYOjwvRm9ybS5MYWJlbD5cclxuICAgIFx0XHRcdFx0ICAgIFx0PEZvcm0uQ29udHJvbCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5biW5a2Q5qCH6aKYIVwiLz5cclxuICAgIFx0XHRcdFx0ICAgIDwvRm9ybS5Hcm91cD5cclxuXHJcbiAgICAgIFx0XHRcdFx0XHQ8Rm9ybS5Hcm91cCBjb250cm9sSWQ9e2NvbnRlbnRJZH0gY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICBcdFx0XHRcdFx0ICA8Rm9ybS5MYWJlbD7mraPmloc6PC9Gb3JtLkxhYmVsPlxyXG4gICAgICBcdFx0XHRcdFx0ICA8Rm9ybS5Db250cm9sIGFzPVwidGV4dGFyZWFcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeW4luWtkOWGheWuuSFcIiByb3dzPXsxNX0vPlxyXG4gICAgICBcdFx0XHRcdFx0PC9Gb3JtLkdyb3VwPlxyXG5cclxuICAgIFx0XHRcdFx0PC9Gb3JtPlxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuICAgICAgICBcdFx0PE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICBcdFx0ICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBmb3JtPXtwdWJsaXNoRm9ybUlkfT7lj5HluIM8L0J1dHRvbj5cclxuICAgICAgICBcdFx0ICA8QnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXsoKT0+c2V0U2hvd1B1Ymxpc2hNb2RhbChmYWxzZSl9PuWPlua2iDwvQnV0dG9uPlxyXG4gICAgICAgIFx0XHQ8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgXHRcdDwvTW9kYWw+XHJcblxyXG5cdFx0XHQ8TW9kYWwgc2hvdz17c2hvd1RpcE1vZGFsfSBkaWFsb2dDbGFzc05hbWU9XCJtb2RhbC1sZ1wiIG9uSGlkZT17KCk9PnNldFNob3dUaXBNb2RhbChmYWxzZSl9PlxyXG5cdFx0XHRcdDxNb2RhbC5IZWFkZXI+XHJcblx0XHRcdFx0XHQ8TW9kYWwuVGl0bGUgYXM9eydoNSd9PuaPkOekujwvTW9kYWwuVGl0bGU+XHJcblx0XHRcdFx0PC9Nb2RhbC5IZWFkZXI+XHJcblx0XHRcdFx0PE1vZGFsLkJvZHk+XHJcblx0XHRcdFx0XHR7dGlwfVxyXG5cdFx0XHRcdDwvTW9kYWwuQm9keT5cclxuXHJcblx0XHRcdDwvTW9kYWw+XHJcblx0XHQ8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBTZWxlY3Rpb25BbmRQdWJsaXNoIH0gIl0sIm5hbWVzIjpbInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsIkJ1dHRvbiIsIkZvcm0iLCJNb2RhbCIsIk5hdiIsIlVzZXJTdGF0ZUNvbnRleHQiLCJpbmRleEVuZHBvaW50IiwicHVibGlzaEVuZHBvaW50IiwidGl0bGVJZCIsImNvbnRlbnRJZCIsInB1Ymxpc2hGb3JtSWQiLCJTZWxlY3Rpb25BbmRQdWJsaXNoIiwic2V0T3JkZXJNb2RlIiwiY29uc29sZSIsImxvZyIsInVzZXJTdGF0ZSIsInVzZXIiLCJzaG93UHVibGlzaE1vZGFsIiwic2V0U2hvd1B1Ymxpc2hNb2RhbCIsInNob3dUaXBNb2RhbCIsInNldFNob3dUaXBNb2RhbCIsInRpcCIsInNldFRpcCIsImFjdGl2ZUtleSIsInNldEFjdGl2ZUtleSIsImhhbmRsZVB1Ymxpc2giLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJ0YXJnZXQiLCJ2YWx1ZSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwibXNnIiwiaW5kZXhEYXRhIiwicmVxdWVzdFBhcmFtcyIsImxpIiwibmF2RnVuY3Rpb24iLCJlIiwib3JkZXJNb2RlIiwiZGl2IiwiY2xhc3NOYW1lIiwidmFyaWFudCIsImFzIiwiSXRlbSIsIkxpbmsiLCJldmVudEtleSIsIm9uQ2xpY2siLCJ1bmRlZmluZWQiLCJzaXplIiwic2hvdyIsIm9uSGlkZSIsImFyaWEtbGFiZWxsZWRieSIsImRpYWxvZ0NsYXNzTmFtZSIsIkhlYWRlciIsImNsb3NlQnV0dG9uIiwiVGl0bGUiLCJCb2R5IiwiaWQiLCJvblN1Ym1pdCIsIkdyb3VwIiwiY29udHJvbElkIiwiTGFiZWwiLCJDb250cm9sIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicm93cyIsIkZvb3RlciIsImZvcm0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/ui/home/selection.tsx\n"));

/***/ })

});