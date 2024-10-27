import { Button } from "../@/components/ui/button";

const FiltersSidebar = () => {
  return (
    <div class="p-4 rounded-lg col-span-1 lg:col-span-3 h-fit border shadow transition-all">
      <form>
        <div class="flex justify-between items-center mb-4">
          <div className="flex justify-between items-center w-full">
            <div class="text-xl font-semibold">Filters</div>
            <Button variant="outline" className="transition-all">
              <input type="reset" value="Reset" className="cursor-pointer" />
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Game</label>
          <select className="w-full p-2 rounded-md bg-background border">
            <option selected>Select Game</option>
            <option className="text-sm">BGMI</option>
            <option className="text-sm">Free Fire Max</option>
            <option className="text-sm">Valorant</option>
            <option className="text-sm">COD Mobile</option>
            <option className="text-sm">Pokemon Unite</option>
            <option className="text-sm">Clash of Clans</option>
            <option className="text-sm">Cricket</option>
            <option className="text-sm">NEW STATE Mobile</option>
            <option className="text-sm">GTA V</option>
            <option className="text-sm">League of Legends PC</option>
            <option className="text-sm">FIFA 22</option>
            <option className="text-sm">Brawl Stars</option>
            <option className="text-sm">Apex Legends Mobile</option>
            <option className="text-sm">Clash Royale</option>
            <option className="text-sm">Mobile Legends Bang Bang</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select className="w-full p-2 rounded-md bg-background border">
            <option>Select role</option>
            <option>Select role</option>
            <option>Select role</option>
            <option>Select role</option>
            <option>Select role</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Language</label>
          <select className="w-full p-2 rounded-md bg-background border">
            <option selected>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <Button className="w-full mt-5">Apply</Button>
      </form>
    </div>
  );
};

export default FiltersSidebar;
