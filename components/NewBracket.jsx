const NewBracket = ({ participant }) => {
  let newArr = [];
  for (let i = 0; i < participant.length; i += 2) {
    newArr.push(participant.slice(i, i + 2));
  }

  return (
    <div className="flex ">
      <div className="p-5 w-1/4">
        {newArr.map((participant, index) => {
          return (
            <div key={index} className="flex">
              <div className="flex flex-col w-2/3  m-2 border-gray-400 border-2">
                <span className="bg-gray-400 p-3">
                  #{participant[0].id} {participant[0].name}
                </span>
                <span className="p-2">
                  #{participant[1].id} {participant[1].name}
                </span>
              </div>
              <div className="place-content-center w-1/3 ">---|---</div>
            </div>
          );
        })}
      </div>
      <div className="place-content-center">final bracket</div>
    </div>
  );
};

export default NewBracket;
