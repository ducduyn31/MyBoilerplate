const router = require('express').Router();

router.get('/test', (req, res) => {
   res.json('ok');
});

module.exports = router;
