import express from 'express';
import { addCandidate, addVote, getAllVotesOFEveryCandidate, getCandidates, removeCandidate } from '../controllers/vote.js';
import { verifyToken } from '../jwt.js';

const router= express.Router();

router.get('/getcandidates',getCandidates)
router.post('/addvote',verifyToken,addVote)
router.post('/addcandidate',addCandidate)
router.get('/getallcandidatesvotes',getAllVotesOFEveryCandidate)
router.delete('/remvecandidate/:name',removeCandidate)

export default   router;