"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.StatefulService = void 0;
var stateful_service_1 = require("./services/stateful_service");
Object.defineProperty(exports, "StatefulService", { enumerable: true, get: function () { return stateful_service_1.StatefulService; } });
var application_1 = require("./application");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return __importDefault(application_1).default; } });
//# sourceMappingURL=index.js.map