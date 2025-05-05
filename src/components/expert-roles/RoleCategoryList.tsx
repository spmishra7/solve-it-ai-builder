
import RoleCategory from "./RoleCategory";
import { RoleCategory as RoleCategoryType } from "./roleData";

interface RoleCategoryListProps {
  categories: RoleCategoryType[];
  expandedCategories: string[];
  onExpandToggle: (categoryId: string) => void;
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const RoleCategoryList = ({
  categories,
  expandedCategories,
  onExpandToggle,
  selectedRoles,
  onRoleToggle,
}: RoleCategoryListProps) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <RoleCategory
          key={category.id}
          category={category}
          isExpanded={expandedCategories.includes(category.id)}
          onToggle={() => onExpandToggle(category.id)}
          selectedRoles={selectedRoles}
          onRoleToggle={onRoleToggle}
        />
      ))}
    </div>
  );
};

export default RoleCategoryList;
