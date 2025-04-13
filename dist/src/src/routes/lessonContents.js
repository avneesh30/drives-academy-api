"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/lessonContents.ts
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var router = express_1.default.Router();
// Create Lesson Content
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, driving_lesson_id, title, content, order, newLessonContent, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, driving_lesson_id = _a.driving_lesson_id, title = _a.title, content = _a.content, order = _a.order;
                return [4 /*yield*/, (0, db_1.default)('lesson_contents')
                        .insert({ driving_lesson_id: driving_lesson_id, title: title, content: content, order: order })
                        .returning(['id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at'])];
            case 1:
                newLessonContent = (_b.sent())[0];
                res.status(201).json(newLessonContent);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Error creating lesson content' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get All Lesson Contents
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lessonContents, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, db_1.default)('lesson_contents').select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at')];
            case 1:
                lessonContents = _a.sent();
                res.json(lessonContents);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Error fetching lesson contents' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get Lesson Content by ID
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lessonContent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('lesson_contents')
                        .select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at')
                        .where({ id: id })
                        .first()];
            case 1:
                lessonContent = _a.sent();
                if (!lessonContent) {
                    return [2 /*return*/, res.status(404).json({ message: 'Lesson content not found' })];
                }
                res.json(lessonContent);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Error fetching lesson content' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get Lesson Contents by Driving Lesson ID
router.get('/driving-lessons/:drivingLessonId/lesson-contents', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var drivingLessonId, lessonContents, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                drivingLessonId = req.params.drivingLessonId;
                return [4 /*yield*/, (0, db_1.default)('lesson_contents')
                        .select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at')
                        .where({ driving_lesson_id: drivingLessonId })];
            case 1:
                lessonContents = _a.sent();
                res.json(lessonContents);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Error fetching lesson contents for driving lesson' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update Lesson Content
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, driving_lesson_id, title, content, order, existingLessonContent, updatedLessonContent, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, driving_lesson_id = _a.driving_lesson_id, title = _a.title, content = _a.content, order = _a.order;
                return [4 /*yield*/, (0, db_1.default)('lesson_contents').where({ id: id }).first()];
            case 1:
                existingLessonContent = _b.sent();
                if (!existingLessonContent) {
                    return [2 /*return*/, res.status(404).json({ message: 'Lesson content not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('lesson_contents')
                        .where({ id: id })
                        .update({ driving_lesson_id: driving_lesson_id, title: title, content: content, order: order })
                        .returning(['id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at'])];
            case 2:
                updatedLessonContent = (_b.sent())[0];
                res.json(updatedLessonContent);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Error updating lesson content' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete Lesson Content
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingLessonContent, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('lesson_contents').where({ id: id }).first()];
            case 1:
                existingLessonContent = _a.sent();
                if (!existingLessonContent) {
                    return [2 /*return*/, res.status(404).json({ message: 'Lesson content not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('lesson_contents').where({ id: id }).del()];
            case 2:
                _a.sent();
                res.json({ message: 'Lesson content deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Error deleting lesson content' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=lessonContents.js.map