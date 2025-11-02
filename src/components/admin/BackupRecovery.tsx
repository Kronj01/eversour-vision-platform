import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Download, Upload, Clock, Shield, Calendar, HardDrive, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Backup {
  id: string;
  name: string;
  size: string;
  created: string;
  type: 'manual' | 'automatic';
  status: 'completed' | 'in-progress' | 'failed';
}

export const BackupRecovery = () => {
  const { toast } = useToast();
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'full-backup-2024-01-15',
      size: '2.4 GB',
      created: '2024-01-15 03:00',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: '2',
      name: 'manual-backup-2024-01-14',
      size: '2.3 GB',
      created: '2024-01-14 10:30',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '3',
      name: 'full-backup-2024-01-14',
      size: '2.3 GB',
      created: '2024-01-14 03:00',
      type: 'automatic',
      status: 'completed'
    }
  ]);

  const createBackup = () => {
    toast({
      title: "Backup Started",
      description: "Database backup is being created...",
    });
  };

  const restoreBackup = (backupId: string) => {
    toast({
      title: "Restore Initiated",
      description: "Database restore process has started. This may take several minutes.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Total Backups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{backups.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-primary" />
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.0 GB</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Last Backup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">30 days</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backups">
        <TabsList>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="disaster">Disaster Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Backup History</h3>
              <p className="text-sm text-muted-foreground">View and manage database backups</p>
            </div>
            <Button onClick={createBackup} className="gap-2">
              <Database className="h-4 w-4" />
              Create Backup Now
            </Button>
          </div>

          <div className="space-y-3">
            {backups.map((backup) => (
              <Card key={backup.id} className="bg-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{backup.name}</h4>
                          <p className="text-sm text-muted-foreground">{backup.created}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">{backup.size}</p>
                      </div>
                      <Badge variant={backup.type === 'automatic' ? 'default' : 'secondary'}>
                        {backup.type}
                      </Badge>
                      <Badge variant={
                        backup.status === 'completed' ? 'default' :
                        backup.status === 'in-progress' ? 'secondary' : 'destructive'
                      }>
                        {backup.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => restoreBackup(backup.id)}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Automated Backup Schedule
              </CardTitle>
              <CardDescription>Configure automatic database backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Backup Time</Label>
                  <Input type="time" defaultValue="03:00" />
                </div>

                <div className="grid gap-2">
                  <Label>Retention Period (days)</Label>
                  <Input type="number" defaultValue="30" />
                </div>

                <div className="grid gap-2">
                  <Label>Backup Type</Label>
                  <Select defaultValue="full">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Backup</SelectItem>
                      <SelectItem value="incremental">Incremental</SelectItem>
                      <SelectItem value="differential">Differential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button>Save Schedule</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Point-in-Time Recovery
              </CardTitle>
              <CardDescription>Restore database to a specific point in time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Select Date & Time</Label>
                  <Input type="datetime-local" />
                </div>

                <div className="grid gap-2">
                  <Label>Recovery Target</Label>
                  <Select defaultValue="production">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production Database</SelectItem>
                      <SelectItem value="staging">Staging Database</SelectItem>
                      <SelectItem value="development">Development Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-500">Warning</p>
                      <p className="text-sm text-muted-foreground">
                        Point-in-time recovery will overwrite current database data. Make sure to create a backup before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="destructive">Initiate Recovery</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disaster" className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Disaster Recovery Plan
              </CardTitle>
              <CardDescription>Emergency recovery procedures and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Recovery Time Objective (RTO)</h4>
                  <p className="text-sm text-muted-foreground mb-3">Maximum acceptable downtime</p>
                  <Input type="number" defaultValue="4" className="max-w-xs" />
                  <span className="text-sm text-muted-foreground ml-2">hours</span>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Recovery Point Objective (RPO)</h4>
                  <p className="text-sm text-muted-foreground mb-3">Maximum acceptable data loss</p>
                  <Input type="number" defaultValue="1" className="max-w-xs" />
                  <span className="text-sm text-muted-foreground ml-2">hour</span>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Failover Configuration</h4>
                  <p className="text-sm text-muted-foreground mb-3">Automatic failover to secondary region</p>
                  <Badge variant="default">Enabled</Badge>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Emergency Contacts</h4>
                  <div className="space-y-2 mt-3">
                    <Input placeholder="Primary: admin@example.com" />
                    <Input placeholder="Secondary: backup@example.com" />
                  </div>
                </div>
              </div>

              <Button>Update DR Plan</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackupRecovery;
