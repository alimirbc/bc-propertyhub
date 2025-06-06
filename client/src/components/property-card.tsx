import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2,
  Bed,
  Bath,
  Square
} from "lucide-react";

interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  propertyType: string;
  status: string;
  rentAmount: string;
  bedrooms: number;
  bathrooms: string;
  squareFootage: number | null;
  description: string | null;
}

interface PropertyCardProps {
  property: Property;
  onDelete: (propertyId: number) => void;
}

export function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(Number(amount));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      vacant: "secondary",
      occupied: "default", 
      maintenance: "destructive"
    } as const;
    
    const colors = {
      vacant: "bg-orange-100 text-orange-800",
      occupied: "bg-green-100 text-green-800",
      maintenance: "bg-red-100 text-red-800"
    } as const;
    
    return (
      <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPropertyTypeIcon = (type: string) => {
    // You can customize icons based on property type
    return <Building className="w-4 h-4" />;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getPropertyTypeIcon(property.propertyType)}
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {property.name}
            </h3>
          </div>
          {getStatusBadge(property.status)}
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="text-sm truncate">
            {property.address}, {property.city}, {property.province}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Property Details */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gray-400" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gray-400" />
              <span>{property.bathrooms} bath</span>
            </div>
            {property.squareFootage && (
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4 text-gray-400" />
                <span>{property.squareFootage} sq ft</span>
              </div>
            )}
          </div>

          {/* Rent Amount */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(property.rentAmount)}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          {/* Property Type */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">Type:</span> {property.propertyType}
          </div>

          {/* Description Preview */}
          {property.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(property.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
