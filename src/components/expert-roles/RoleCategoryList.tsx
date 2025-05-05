
import RoleCategory from "./RoleCategory";
import { RoleCategory as RoleCategoryType } from "./roleData";

interface RoleCategoryListProps {
  categories: RoleCategoryType[];
  expandedCategory: string | null;
  toggleCategory: (categoryId: string) => void;
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const RoleCategoryList = ({
  categories,
  expandedCategory,
  toggleCategory,
  selectedRoles,
  onRoleToggle,
}: RoleCategoryListProps) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <RoleCategory
          key={category.id}
          category={category}
          isExpanded={expandedCategory === category.id}
          onToggle={() => toggleCategory(category.id)}
          selectedRoles={selectedRoles}
          onRoleToggle={onRoleToggle}
        />
      ))}
    </div>
  );
};

export default RoleCategoryList;
