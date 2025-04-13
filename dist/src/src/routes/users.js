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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/users.ts
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var db_1 = __importDefault(require("../db")); // Import the knex instance
var router = express_1.default.Router();
// User registration
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, surname, email, password, existingUser, hashedPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, surname = _a.surname, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, db_1.default)('users').where({ email: email }).first()];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, (0, db_1.default)('users')
                        .insert({ name: name_1, surname: surname, email: email, password: hashedPassword })
                        .returning(['id', 'name', 'surname', 'email', 'created_at', 'updated_at'])];
            case 3:
                newUser = (_b.sent())[0];
                res.status(201).json(newUser);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Error registering user' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// User login
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, userPassword, userWithoutPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, db_1.default)('users').where({ email: email }).first()];
            case 1:
                user = _b.sent();
                // Check if user exists
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                userPassword = user.password, userWithoutPassword = __rest(user, ["password"]);
                res.json(userWithoutPassword);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Error logging in' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get user by ID
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('users')
                        .select('id', 'name', 'surname', 'email', 'created_at', 'updated_at')
                        .where({ id: id })
                        .first()];
            case 1:
                user = _a.sent();
                // Check if user exists
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Error fetching user' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update user
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, surname, email, password, existingUser, updateData, _b, updatedUser, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, surname = _a.surname, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, db_1.default)('users').where({ id: id }).first()];
            case 1:
                existingUser = _c.sent();
                if (!existingUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                updateData = {};
                if (name_2)
                    updateData.name = name_2;
                if (surname)
                    updateData.surname = surname;
                if (email)
                    updateData.email = email;
                if (!password) return [3 /*break*/, 3];
                _b = updateData;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                _b.password = _c.sent();
                _c.label = 3;
            case 3: return [4 /*yield*/, (0, db_1.default)('users')
                    .where({ id: id })
                    .update(updateData)
                    .returning(['id', 'name', 'surname', 'email', 'created_at', 'updated_at'])];
            case 4:
                updatedUser = (_c.sent())[0];
                res.json(updatedUser);
                return [3 /*break*/, 6];
            case 5:
                error_4 = _c.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Error updating user' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Delete user
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.default)('users').where({ id: id }).first()];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                // Delete the user
                return [4 /*yield*/, (0, db_1.default)('users').where({ id: id }).del()];
            case 2:
                // Delete the user
                _a.sent();
                res.json({ message: 'User deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Error deleting user' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=users.js.map