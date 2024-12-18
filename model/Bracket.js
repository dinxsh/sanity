const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BracketSchema = new Schema({
    bracketName: { type: String, required: true },
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
    BracketNumber: Number,
    consolationFinal: Boolean,
    grandFinalType: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Bracket || mongoose.model('Bracket', BracketSchema);