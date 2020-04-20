// ================================================================================================================
// ==== LIBRARIES AND DEPENDENCIES ================================================================================

var express = require('express');
var bodyParser = require('body-parser');
var risiko = require('risiko-dande');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000);

// ================================================================================================================

const diceSides = 6;
risiko.setSides(diceSides);

var atkUnits = 0;
var defUnits = 0;
var isBattleSet = false;

// ==== SECTION END ===============================================================================================
// ================================================================================================================



// ================================================================================================================
// ==== API CALLS =================================================================================================

app.get('/risiko/get-battle-result', function(req, res){

    if(isBattleSet){
        battle_res = risiko.doBattle(atkUnits, defUnits);
        // TODO: You must set units again. Save results in variables and manage different players.
        isBattleSet = false;
        return res.status(200).json({battle_res});
    } else {
        return res.status(400).json({message: 'You have to set the battle units first.'});
    }
    
});

app.post('/risiko/set-battle-units', function(req, res){

    if(req.body){
        if(req.body.atkUnits && req.body.defUnits){
            atkUnits = req.body.atkUnits;
            defUnits = req.body.defUnits;
            isBattleSet = true;
            return res.status(200).json({message: 'Units set. You can now do a battle.'});
        } else {
            return res.status(400).json({message: 'You must set the units using atkUnits and defUnits.'});
        }
    } else {
        return res.status(400).json({message: 'Units not found.'});
    }

});

// ==== SECTION END ===============================================================================================
// ================================================================================================================