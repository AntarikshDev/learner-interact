import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { 
  X, 
  Search, 
  Filter, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Calendar,
  FileText,
  Video,
  Volume2,
  Users,
  BookOpen,
  PenTool,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingState, LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

// Mock API hooks - replace with your actual implementation
const useGetQuestionInAssetmentMutation = () => [
  async (body: any) => {
    const response = await Promise.resolve({ data: [], totalRecords: 0 });
    return { unwrap: async () => response };
  },
];

const useGetAssetFromAssesmentLibraryMutation = () => [
  async (body: any) => {
    const response = await Promise.resolve({ success: true, message: "Questions not found for this quiz!" });
    return { unwrap: async () => response };
  },
];

// Export the Asset interface with an id field
export interface Asset {
  asset_title: string;
  content_asset_title: string;
  asset_id: number;
  id: number;
  asset_type: string;
  updated_at: string;
  created_at: string;
  created_by: string;
  title: string;
}

interface AssetsLibraryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToLesson: (selectedAssets: Asset[]) => void;
  lesson_id: number;
}

const AssetsLibraryPopup: React.FC<AssetsLibraryPopupProps> = ({
  isOpen,
  onClose,
  onAddToLesson,
  lesson_id,
}) => {
  const [getQuestionInAssetment] = useGetQuestionInAssetmentMutation();
  const [getAssetFromAssesmentLibrary] = useGetAssetFromAssesmentLibraryMutation();
  
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToLesson, setIsAddingToLesson] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    title: "",
    start_date: "",
    end_date: "",
    asset_type: "",
    modified_start_date: "",
    modified_end_date: "",
  });
  
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Debounced fetch function to avoid excessive API calls
  const fetchAssets = useCallback(
    debounce(async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const body = {
          filter: {
            title: filters.title,
            start_date: filters.start_date,
            end_date: filters.end_date,
            asset_type: filters.asset_type,
            modified_start_date: filters.modified_start_date,
            modified_end_date: filters.modified_end_date,
          },
          sortColumn,
          sortDirection,
          pageNumber,
          pageSize,
        };
        
        const result = await getQuestionInAssetment(body);
        const response = await result.unwrap();

        if (response && Array.isArray(response.data)) {
          setAssets(response.data);
          setTotalItems(response.totalRecords || 0);
        } else {
          setAssets([]);
          setTotalItems(0);
        }
      } catch (error: any) {
        console.error("Failed to fetch assets:", error);
        setError("Failed to load assets. Please try again.");
        setAssets([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [
      filters,
      sortColumn,
      sortDirection,
      pageNumber,
      pageSize,
      getQuestionInAssetment,
    ],
  );

  useEffect(() => {
    if (isOpen) {
      fetchAssets();
    }
    return () => {
      fetchAssets.cancel();
    };
  }, [isOpen, fetchAssets]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAssets([]);
      setError(null);
      setPageNumber(1);
    }
  }, [isOpen]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPageNumber(1);
  };

  const handleSortChange = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setPageNumber(1);
  };

  const handleCheckboxChange = (asset: Asset) => {
    setSelectedAssets((prev) =>
      prev.some((a) => a.asset_id === asset.asset_id)
        ? prev.filter((a) => a.asset_id !== asset.asset_id)
        : [...prev, asset],
    );
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === assets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(assets);
    }
  };

  const handleAddToLesson = async () => {
    if (selectedAssets.length === 0) {
      setError("Please select at least one asset to add to the lesson.");
      return;
    }

    if (!lesson_id) {
      setError("Invalid lesson ID. Please try again.");
      return;
    }

    setIsAddingToLesson(true);
    setError(null);

    const body = {
      lesson_id: lesson_id,
      asset_id: selectedAssets.map((asset) => asset.asset_id),
      asset_type: selectedAssets.map((asset) => asset.asset_type),
    };

    try {
      const result = await getAssetFromAssesmentLibrary(body);
      const response = await result.unwrap();
      if (
        response.success &&
        response.message === "Questions not found for this quiz!"
      ) {
        setError(response.message);
        return;
      }
      onAddToLesson(selectedAssets);
      setSelectedAssets([]);
      onClose();
    } catch (error: any) {
      setError(
        error?.data?.message ||
          "Failed to add assets to lesson. Please try again.",
      );
    } finally {
      setIsAddingToLesson(false);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    const calculatedTotalPages = Math.ceil(totalItems / pageSize) || 1;
    if (newPage > 0 && newPage <= calculatedTotalPages) {
      setPageNumber(newPage);
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'video': return Video;
      case 'audio': return Volume2;
      case 'quiz': return PenTool;
      case 'meeting': return Users;
      case 'article': return BookOpen;
      case 'assignment': return FileText;
      default: return Database;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'hsl(var(--modal-backdrop))' }}
    >
      <div 
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-modal-background rounded-xl shadow-large animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-subtle">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Assets Library</h2>
              <p className="text-sm text-muted-foreground">Browse and select assets to add to your lesson</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search by title..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              name="asset_type"
              value={filters.asset_type}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Asset Types</option>
              <option value="Quiz">Quiz</option>
              <option value="Meeting">Meeting</option>
              <option value="Article">Article</option>
              <option value="Assignment">Assignment</option>
              <option value="Raw">Raw</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {error && (
            <div className="m-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {isLoading ? (
            <LoadingState message="Loading assets..." />
          ) : (
            <div className="p-6">
              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full">
                    <thead className="bg-table-header border-b border-border sticky top-0">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-foreground">
                          <input 
                            type="checkbox" 
                            checked={assets.length > 0 && selectedAssets.length === assets.length}
                            onChange={handleSelectAll}
                            className="rounded border-border"
                          />
                        </th>
                        <th 
                          className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSortChange("content_asset_title")}
                        >
                          <div className="flex items-center space-x-2">
                            <span>Title</span>
                            {sortColumn === "content_asset_title" && (
                              sortDirection === "asc" ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSortChange("asset_type")}
                        >
                          <div className="flex items-center space-x-2">
                            <span>Type</span>
                            {sortColumn === "asset_type" && (
                              sortDirection === "asc" ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSortChange("created_by")}
                        >
                          <div className="flex items-center space-x-2">
                            <span>Created By</span>
                            {sortColumn === "created_by" && (
                              sortDirection === "asc" ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSortChange("created_at")}
                        >
                          <div className="flex items-center space-x-2">
                            <span>Created</span>
                            {sortColumn === "created_at" && (
                              sortDirection === "asc" ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSortChange("updated_at")}
                        >
                          <div className="flex items-center space-x-2">
                            <span>Modified</span>
                            {sortColumn === "updated_at" && (
                              sortDirection === "asc" ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.length > 0 ? (
                        assets.map((asset, index) => {
                          const AssetIcon = getAssetTypeIcon(asset.asset_type);
                          const isSelected = selectedAssets.some((a) => a.asset_id === asset.asset_id);
                          
                          return (
                            <tr
                              key={index}
                              className={cn(
                                "border-b border-border hover:bg-table-row-hover transition-colors duration-150",
                                isSelected && "bg-primary/5"
                              )}
                            >
                              <td className="py-4 px-4">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleCheckboxChange(asset)}
                                  className="rounded border-border"
                                />
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-medium text-foreground">
                                  {asset.content_asset_title || asset.title || "Untitled"}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <AssetIcon className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {asset.asset_type || "Unknown"}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm text-muted-foreground">
                                {asset.created_by || "—"}
                              </td>
                              <td className="py-4 px-4 text-sm text-muted-foreground">
                                {formatDate(asset.created_at)}
                              </td>
                              <td className="py-4 px-4 text-sm text-muted-foreground">
                                {formatDate(asset.updated_at)}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center">
                            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No assets found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="px-2 py-1 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <span>per page</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {pageNumber} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-gradient-subtle">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {selectedAssets.length > 0 && (
              <>
                <span className="font-medium text-foreground">{selectedAssets.length}</span>
                <span>asset{selectedAssets.length !== 1 ? 's' : ''} selected</span>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="professional"
              onClick={onClose}
              disabled={isAddingToLesson}
            >
              Cancel
            </Button>
            
            <Button
              variant="default"
              onClick={handleAddToLesson}
              disabled={selectedAssets.length === 0 || isAddingToLesson}
              className="min-w-32"
            >
              {isAddingToLesson ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add to Lesson</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsLibraryPopup;