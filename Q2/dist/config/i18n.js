"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
i18n_1.default.configure({
    locales: ['en', 'zh-TW'],
    directory: path_1.default.join(__dirname, '../locales'),
    defaultLocale: 'zh-TW',
    queryParameter: 'lang',
    cookie: 'lang',
    header: 'accept-language',
    autoReload: true,
    updateFiles: false,
    objectNotation: true
});
exports.default = i18n_1.default;
