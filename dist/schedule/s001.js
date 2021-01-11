"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const anylogger_1 = __importDefault(require("anylogger"));
const logger = anylogger_1.default('schedules001');
function s001(data) {
    logger.debug(data);
}
exports.default = s001;
