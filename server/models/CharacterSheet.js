const mongoose = require('mongoose');

const characterSheetSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    characterName: String,
    class: String,
    level: Number,
    abilities: Object,
    equipment: Array,
    
});

module.exports = mongoose.model('CharacterSheet', characterSheetSchema);

