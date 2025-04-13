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
// src/routes/answers.ts
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var router = express_1.default.Router();
// Create Answer
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, question_id, answer_text, is_correct, newAnswer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, question_id = _a.question_id, answer_text = _a.answer_text, is_correct = _a.is_correct;
                return [4 /*yield*/, (0, db_1.default)('answers')
                        .insert({ question_id: question_id, answer_text: answer_text, is_correct: is_correct })
                        .returning(['id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at'])];
            case 1:
                newAnswer = (_b.sent())[0];
                res.status(201).json(newAnswer);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Error creating answer' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get All Answers
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, db_1.default)('answers').select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at')];
            case 1:
                answers = _a.sent();
                res.json(answers);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Error fetching answers' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get Answer by ID
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('answers')
                        .select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at')
                        .where({ id: id })
                        .first()];
            case 1:
                answer = _a.sent();
                if (!answer) {
                    return [2 /*return*/, res.status(404).json({ message: 'Answer not found' })];
                }
                res.json(answer);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Error fetching answer' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get Answers by Question ID
router.get('/questions/:questionId/answers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questionId, answers, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionId = req.params.questionId;
                return [4 /*yield*/, (0, db_1.default)('answers')
                        .select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at')
                        .where({ question_id: questionId })];
            case 1:
                answers = _a.sent();
                res.json(answers);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Error fetching answers for question' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update Answer
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, question_id, answer_text, is_correct, existingAnswer, updatedAnswer, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, question_id = _a.question_id, answer_text = _a.answer_text, is_correct = _a.is_correct;
                return [4 /*yield*/, (0, db_1.default)('answers').where({ id: id }).first()];
            case 1:
                existingAnswer = _b.sent();
                if (!existingAnswer) {
                    return [2 /*return*/, res.status(404).json({ message: 'Answer not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('answers')
                        .where({ id: id })
                        .update({ question_id: question_id, answer_text: answer_text, is_correct: is_correct })
                        .returning(['id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at'])];
            case 2:
                updatedAnswer = (_b.sent())[0];
                res.json(updatedAnswer);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Error updating answer' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete Answer
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingAnswer, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('answers').where({ id: id }).first()];
            case 1:
                existingAnswer = _a.sent();
                if (!existingAnswer) {
                    return [2 /*return*/, res.status(404).json({ message: 'Answer not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('answers').where({ id: id }).del()];
            case 2:
                _a.sent();
                res.json({ message: 'Answer deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Error deleting answer' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=answers.js.map