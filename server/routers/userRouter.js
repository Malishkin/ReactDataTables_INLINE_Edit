const express = require('express');
const userBl = require('../models/userBL');

const router = express.Router();

router.route('/')
    .get(function (req, resp)
    {
        userBl.getUsers().then(result =>
        {
            return resp.json(result.data);
        })
    });

    router.route('/')
    .post(function(req, resp)
    {
        let userData = req.body;
        console.log("Received user data: ", userData);

        userBl.postUsers(userData).then(result =>
            {
                console.log("Returning to client: ", result);
                return resp.json(result);
            })
    })


module.exports = router;