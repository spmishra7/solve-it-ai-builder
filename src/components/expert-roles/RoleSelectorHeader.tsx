
import SelectAllButton from "./SelectAllButton";

interface RoleSelectorHeaderProps {
  allSelected: boolean;
  onSelectAll: () => void;
}

const RoleSelectorHeader = ({ allSelected, onSelectAll }: RoleSelectorHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Select Expert Perspectives</h3>
      <SelectAllButton allSelected={allSelected} onSelectAll={onSelectAll} />
    </div>
  );
};

export default RoleSelectorHeader;
