import { TeamModel } from "../../model/Team";

export const fetchTeamById = async (id) => {
  try {
    const team = await TeamModel.findById(id);

    return team;
  } catch (error) {
    console.log(error);
  }
};
