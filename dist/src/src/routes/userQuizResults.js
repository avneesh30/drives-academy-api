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
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var router = express_1.default.Router(); /**
 * @swagger
 * tags:
 *   name: UserQuizResults
 *   description: API for managing user quiz results
 */
/**
* @swagger
 * /user-quiz-results:
 *   post:
 *     summary: Create a new user quiz result
 *     tags: [UserQuizResults]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:
 *                 type: integer
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: User quiz results created successfully
 *       500:
 *         description: Error creating user quiz result
 *   get:
 *     summary: Get all user quiz result
 *         description: ID of the user quiz result
 *         schema:
 *           type: integer
 *     description: ""
 *     responses:
 *       200:
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results
 * /user-quiz-results/{id}:
 *   get:
 *     summary: Get user quiz result by ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz result fetched successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error fetching user quiz result
 *
 * /user-quiz-results/users/{userId}/user-quiz-results:
 *   get:
 *     summary: Get user quiz results by user ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results for user
 *
 * /user-quiz-results/quizzes/{quizId}/user-quiz-results:
 *   get:
 *     summary: Get user quiz results by quiz ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results for quiz
 *
 * /user-quiz-results/{id}:
 *   put:
 *     summary: Update user quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:
 *                 type: integer
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: User quiz result updated successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error updating user quiz result
 *   delete:
 *     summary: Delete user quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz result deleted successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error deleting user quiz result
 */
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at, newUserQuizResult, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, user_id = _a.user_id, quiz_id = _a.quiz_id, score = _a.score, correct_answer_count = _a.correct_answer_count, incorrect_answer_count = _a.incorrect_answer_count, completed_at = _a.completed_at;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results')
                        .insert({ user_id: user_id, quiz_id: quiz_id, score: score, correct_answer_count: correct_answer_count, incorrect_answer_count: incorrect_answer_count, completed_at: completed_at })
                        .returning(['id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at'])];
            case 1:
                newUserQuizResult = (_b.sent())[0];
                res.status(201).json(newUserQuizResult);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Error creating user quiz result' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userQuizResults, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results').select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')];
            case 1:
                userQuizResults = _a.sent();
                res.json(userQuizResults);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Error fetching user quiz results' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userQuizResult, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results')
                        .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
                        .where({ id: id })
                        .first()];
            case 1:
                userQuizResult = _a.sent();
                if (!userQuizResult) {
                    return [2 /*return*/, res.status(404).json({ message: 'User quiz result not found' })];
                }
                res.json(userQuizResult);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Error fetching user quiz result' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/users/:userId/user-quiz-results', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userQuizResults, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results')
                        .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
                        .where({ user_id: userId })];
            case 1:
                userQuizResults = _a.sent();
                res.json(userQuizResults);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Error fetching user quiz results for user' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/quizzes/:quizId/user-quiz-results', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quizId, userQuizResults, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quizId = req.params.quizId;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results')
                        .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
                        .where({ quiz_id: quizId })];
            case 1:
                userQuizResults = _a.sent();
                res.json(userQuizResults);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Error fetching user quiz results for quiz' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at, existingUserQuizResult, updatedUserQuizResult, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, user_id = _a.user_id, quiz_id = _a.quiz_id, score = _a.score, correct_answer_count = _a.correct_answer_count, incorrect_answer_count = _a.incorrect_answer_count, completed_at = _a.completed_at;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results').where({ id: id }).first()];
            case 1:
                existingUserQuizResult = _b.sent();
                if (!existingUserQuizResult) {
                    return [2 /*return*/, res.status(404).json({ message: 'User quiz result not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results')
                        .where({ id: id })
                        .update({ user_id: user_id, quiz_id: quiz_id, score: score, correct_answer_count: correct_answer_count, incorrect_answer_count: incorrect_answer_count, completed_at: completed_at })
                        .returning(['id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at'])];
            case 2:
                updatedUserQuizResult = (_b.sent())[0];
                res.json(updatedUserQuizResult);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Error updating user quiz result' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingUserQuizResult, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results').where({ id: id }).first()];
            case 1:
                existingUserQuizResult = _a.sent();
                if (!existingUserQuizResult) {
                    return [2 /*return*/, res.status(404).json({ message: 'User quiz result not found' })];
                }
                return [4 /*yield*/, (0, db_1.default)('user_quiz_results').where({ id: id }).del()];
            case 2:
                _a.sent();
                res.json({ message: 'User quiz result deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).json({ message: 'Error deleting user quiz result' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=userQuizResults.js.map