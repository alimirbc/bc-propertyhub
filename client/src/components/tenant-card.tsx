import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Trash2,
  UserCheck,
  AlertTriangle,
  User
} from "lucide-react";

interface Tenant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: string;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  notes: string | null;
}

interface TenantCardProps {
  tenant: Tenant;
  onDelete: (tenantId: number) => void;
}

export function TenantCard({ tenant, onDelete }: TenantCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tenants/${tenant.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenants"] });
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Success",
        description: "Tenant removed successfully",
      });
      onDelete(tenant.id);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "former":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "former":
        return "outline";
      default:
        return "outline";
    }
  };

  const isLeaseExpiringSoon = () => {
    const endDate = new Date(tenant.leaseEndDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return endDate <= thirtyDaysFromNow && endDate >= today;
  };

  const isLeaseExpired = () => {
    const endDate = new Date(tenant.leaseEndDate);
    const today = new Date();
    return endDate < today;
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {tenant.firstName.charAt(0)}{tenant.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {tenant.firstName} {tenant.lastName}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={getStatusVariant(tenant.status)}>
                  {getStatusIcon(tenant.status)}
                  <span className="ml-1 capitalize">{tenant.status}</span>
                </Badge>
                {isLeaseExpiringSoon() && !isLeaseExpired() && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Expires Soon
                  </Badge>
                )}
                {isLeaseExpired() && (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Expired
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Tenant</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove {tenant.firstName} {tenant.lastName}? 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{tenant.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{tenant.phone}</span>
          </div>
        </div>

        {/* Lease Information */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Lease Period</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(tenant.leaseStartDate), "MMM d, yyyy")} - {format(new Date(tenant.leaseEndDate), "MMM d, yyyy")}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Monthly Rent</span>
            </div>
            <div className="text-lg font-semibold text-green-600">
              ${tenant.monthlyRent.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Security Deposit */}
        <div className="flex justify-between items-center pt-2 border-t text-sm">
          <span className="text-muted-foreground">Security Deposit:</span>
          <span className="font-medium">${tenant.securityDeposit.toLocaleString()}</span>
        </div>

        {/* Emergency Contact */}
        {tenant.emergencyContactName && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Emergency Contact</div>
            <div className="text-sm text-muted-foreground">
              {tenant.emergencyContactName}
              {tenant.emergencyContactPhone && (
                <span className="ml-2">• {tenant.emergencyContactPhone}</span>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {tenant.notes && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Notes</div>
            <div className="text-sm text-muted-foreground">
              {tenant.notes}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}