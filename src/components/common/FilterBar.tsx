import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface FilterBarProps {
  filters: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
  }[];
  sortOptions: {
    label: string;
    value: string;
  }[];
  currentSort: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (value: string) => void;
  onSortDirectionChange: () => void;
}

export default function FilterBar({
  filters,
  sortOptions,
  currentSort,
  sortDirection,
  onSortChange,
  onSortDirectionChange,
}: FilterBarProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex items-center text-yellow-500">
        <Filter size={20} className="mr-2" />
        <span className="font-medium">Filters:</span>
      </div>
      
      {filters.map((filter) => (
        <div key={filter.label} className="flex items-center space-x-2">
          <label className="text-sm">{filter.label}:</label>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="bg-gray-700 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex-1" />

      <div className="flex items-center space-x-4">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-700 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-yellow-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={onSortDirectionChange}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
        >
          {sortDirection === 'asc' ? (
            <SortAsc size={20} className="text-yellow-500" />
          ) : (
            <SortDesc size={20} className="text-yellow-500" />
          )}
        </button>
      </div>
    </div>
  );
}