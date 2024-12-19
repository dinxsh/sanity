<<<<<<< ours
# Brackets Backend

## Input parameters:
- tournament_id (to link the bracket with an existing tournament): required
- consolationFinal: required (default: `false`)
- grandFinalType: required (default: `simple`)

## Output structure:
> refer app/api/brackets/[id]/mockBrackets.js

## Roadblocks:
1. Model Mismatch
||||||| base
=======
# Brackets Backendfter resolving, mark the file as resolved
git add brackets.md

# Then commit to complete the merge
git commit -m "Resolve merge conflicts in brackets.md"


## Input parameters:
- tournament_id (to link the bracket with an existing tournament): required
- name (same as tournament name): required (default: fetched from `tournament_id`)
- type ('single_elimination' | 'double_elimination'): required (default: `single_elimination`)
- number (no. of participants): required (default: determined from `tournament_id`)
- consolationFinal: required (default: `false`)
- grandFinalType: required (default: `simple`)

## Output structure:
#### Participant (fetched from `TeamModel`)
- id: uuid of the team
- tournament_id: uuid of the tournament
- name: name of the team
>>>>>>> theirs
