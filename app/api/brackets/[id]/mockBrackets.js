export default {
  participant: [
    {
      id: 0,
      tournament_id: 1,
      name: "GodLike",
    },
    {
      id: 1,
      tournament_id: 1,
      name: "NaVi",
    },
    {
      id: 2,
      tournament_id: 1,
      name: "True Rippers",
    },
    {
      id: 3,
      tournament_id: 1,
      name: "Cloud 9",
    },
    {
      id: 4,
      tournament_id: 1,
      name: "Team Vitality",
    },
    {
      id: 5,
      tournament_id: 1,
      name: "Luminosity Gaming",
    },
    {
      id: 6,
      tournament_id: 1,
      name: "Tribe Gaming",
    },
    {
      id: 7,
      tournament_id: 1,
      name: "Reckoning Esports",
    },
    {
      id: 8,
      tournament_id: 1,
      name: "Sanity Gaming",
    },
    {
      id: 9,
      tournament_id: 1,
      name: "Team IND",
    },
    {
      id: 10,
      tournament_id: 1,
      name: "RRQ",
    },
    {
      id: 11,
      tournament_id: 1,
      name: "Nova Esports",
    },
    {
      id: 12,
      tournament_id: 1,
      name: "S8UL Esports",
    },
    {
      id: 13,
      tournament_id: 1,
      name: "Global Esports",
    },
    {
      id: 14,
      tournament_id: 1,
      name: "Orangutan Esports",
    },
    {
      id: 15,
      tournament_id: 1,
      name: "Revenant Esports",
    },
  ],
  stage: [
    {
      id: 0,
      tournament_id: 1,
      name: "Elimination stage",
      type: "single_elimination",
      settings: {
        grandFinal: "single",
        consolationFinal: false,
        matchesChildCount: 0,
        size: 16,

        seedOrdering: ["inner_outer"],
      },
    },
  ],
  
  group: [
    {
      id: 0,
      stage_id: 0,
      number: 1
    }
  ],
  
  round: [
    { id: 0, number: 1, stage_id: 0, group_id: 0 },
    { id: 1, number: 2, stage_id: 0, group_id: 0 },
    { id: 2, number: 3, stage_id: 0, group_id: 0 },
    { id: 3, number: 4, stage_id: 0, group_id: 0 }
  ],
  
   match:[
     {
       id :0,
       number :1,
       stage_id :0,
       group_id :0,
       round_id :0,
       child_count :0,
       status :4,
       opponent1 :{id :0 , position :1 , score :1 , result :"win"},
       opponent2 :{id :15 , position :16 , score :0 , result :"loss"}
     },
     {
       id :1,
       number :2,
       stage_id :0,
       group_id :0,
       round_id :0,
       child_count :0,
       status :2,
       opponent1 :{id :7 , position :8},
       opponent2 :{id :8 , position :9}
     },
     {
       id :2,
       number :3,
       stage_id :0,
       group_id :0,
       round_id :0,
       child_count :0,
       status :2,
       opponent1 :{id :3 , position :4},
       opponent2 :{id :12 , position :13}
     },
     {
       id :3,
       number :4,
       stage_id :0,
       group_id :0,
       round_id :0,
       child_count :0,
       status :2,
       opponent1:{id :4 , position :5},
       opponent2:{id :11 , position :12}
     },
     {
      id :4,
      number :5,
      stage_id :0,
      group_id :0,
      round_id :0,
      child_count :0,
      status :2,
      opponent1:{id :1 , position :2},
      opponent2:{id:null}
   },
   {
     id   :5,
     number   :6,
     stage_id   :0,
     group_id   :0,
     round_id   :0,
     child_count   :0,
     status   :"pending",
     opponent1   :
         {
             id   :"6",
             position   :"7"
         },
     opponent2   :
         {
             id   :"9",
             position   :"10"
         }
   }
   // Continue adding matches as per the structure above
   ],
   
   match_game:[]
}
