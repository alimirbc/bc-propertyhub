import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { TenantCard } from "@/components/tenant-card";
import { AddTenantDialog } from "@/components/add-tenant-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, UserCheck, AlertTriangle } from "lucide-react";

interface Tenant {
  id: number;
  propertyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  leaseStart: string | null;
  leaseEnd: string | null;
  rentAmount: string | null;
  depositAmount: string | null;
  emergencyContact: {
    name?: string;
    phone?: string;
  } | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Property {
  id: number;
  name: string;
  address: string;
}

export default function Tenants() {
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { data: tenants = [], isLoading: tenantsLoading } = useQuery<Tenant[]>({
    queryKey: ["/api/tenants"],
    enabled: isAuthenticated,
  });

  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    enabled: isAuthenticated,
  });

  const handleDeleteTenant = (tenantId: number) => {
    // Tenant deletion is handled in TenantCard component
  };

  const handleAddTenant = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setShowAddDialog(true);
  };

  const activeTenants = tenants.filter(t => t.isActive);
  const inactiveTenants = tenants.filter(t => !t.isActive);

  const getLeaseStatus = (tenant: Tenant) => {
    if (!tenant.leaseEnd) return "no-lease";
    
    const endDate = new Date(tenant.leaseEnd);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    if (endDate < today) return "expired";
    if (endDate <= thirtyDaysFromNow) return "expiring-soon";
    return "active";
  };

  const expiringLeases = tenants.filter(t => getLeaseStatus(t) === "expiring-soon");
  const expiredLeases = tenants.filter(t => getLeaseStatus(t) === "expired");

  if (isLoading || tenantsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Management</h1>
          <p className="text-muted-foreground">
            Manage your tenants and lease agreements
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenants.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeTenants.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently renting
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{expiringLeases.length}</div>
            <p className="text-xs text-muted-foreground">
              Within 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Leases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredLeases.length}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Properties and Add Tenant Buttons */}
      {properties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Add Tenant to Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {properties.map((property) => (
                <Button
                  key={property.id}
                  variant="outline"
                  onClick={() => handleAddTenant(property.id)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {property.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lease Alerts */}
      {(expiringLeases.length > 0 || expiredLeases.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Lease Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expiredLeases.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-2">Expired Leases ({expiredLeases.length})</h4>
                <div className="space-y-2">
                  {expiredLeases.map((tenant) => (
                    <div key={tenant.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
                        <p className="text-sm text-muted-foreground">
                          Lease expired: {tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <Badge variant="destructive">Expired</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expiringLeases.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-600 mb-2">Expiring Soon ({expiringLeases.length})</h4>
                <div className="space-y-2">
                  {expiringLeases.map((tenant) => (
                    <div key={tenant.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
                        <p className="text-sm text-muted-foreground">
                          Lease expires: {tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Expires Soon
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tenants List */}
      <div className="space-y-6">
        {activeTenants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Tenants</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeTenants.map((tenant) => (
                <TenantCard
                  key={tenant.id}
                  tenant={{
                    ...tenant,
                    leaseStartDate: tenant.leaseStart || "",
                    leaseEndDate: tenant.leaseEnd || "",
                    monthlyRent: parseFloat(tenant.rentAmount || "0"),
                    securityDeposit: parseFloat(tenant.depositAmount || "0"),
                    status: tenant.isActive ? "active" : "inactive",
                    emergencyContactName: tenant.emergencyContact?.name || null,
                    emergencyContactPhone: tenant.emergencyContact?.phone || null,
                    notes: null,
                  }}
                  onDelete={handleDeleteTenant}
                />
              ))}
            </div>
          </div>
        )}

        {inactiveTenants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Former Tenants</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inactiveTenants.map((tenant) => (
                <TenantCard
                  key={tenant.id}
                  tenant={{
                    ...tenant,
                    leaseStartDate: tenant.leaseStart || "",
                    leaseEndDate: tenant.leaseEnd || "",
                    monthlyRent: parseFloat(tenant.rentAmount || "0"),
                    securityDeposit: parseFloat(tenant.depositAmount || "0"),
                    status: tenant.isActive ? "active" : "former",
                    emergencyContactName: tenant.emergencyContact?.name || null,
                    emergencyContactPhone: tenant.emergencyContact?.phone || null,
                    notes: null,
                  }}
                  onDelete={handleDeleteTenant}
                />
              ))}
            </div>
          </div>
        )}

        {tenants.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tenants yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start by adding your first tenant to one of your properties.
              </p>
              {properties.length > 0 && (
                <Button
                  onClick={() => handleAddTenant(properties[0].id)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add First Tenant
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Tenant Dialog */}
      {selectedPropertyId && (
        <AddTenantDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          propertyId={selectedPropertyId}
        />
      )}
    </div>
  );
}