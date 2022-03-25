"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/consumer', (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
});
exports.default = router;
//# sourceMappingURL=consumerRouter.js.map