import { motion } from 'motion/react';
import { Plus, Mail, Phone, MoreVertical, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'JD',
    role: 'Founder & CEO',
    email: 'john@agency.com',
    phone: '+1 (555) 123-4567',
    projectsActive: 12,
    tasksCompleted: 145,
    productivity: 95,
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Miller',
    avatar: 'SM',
    role: 'Lead Designer',
    email: 'sarah@agency.com',
    phone: '+1 (555) 234-5678',
    projectsActive: 8,
    tasksCompleted: 128,
    productivity: 92,
    status: 'active',
  },
  {
    id: 3,
    name: 'Alex Brown',
    avatar: 'AB',
    role: 'Senior Developer',
    email: 'alex@agency.com',
    phone: '+1 (555) 345-6789',
    projectsActive: 10,
    tasksCompleted: 156,
    productivity: 88,
    status: 'active',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'EW',
    role: 'Project Manager',
    email: 'emma@agency.com',
    phone: '+1 (555) 456-7890',
    projectsActive: 15,
    tasksCompleted: 187,
    productivity: 94,
    status: 'active',
  },
  {
    id: 5,
    name: 'David Lee',
    avatar: 'DL',
    role: 'Marketing Specialist',
    email: 'david@agency.com',
    phone: '+1 (555) 567-8901',
    projectsActive: 6,
    tasksCompleted: 92,
    productivity: 85,
    status: 'away',
  },
  {
    id: 6,
    name: 'Lisa Garcia',
    avatar: 'LG',
    role: 'Content Writer',
    email: 'lisa@agency.com',
    phone: '+1 (555) 678-9012',
    projectsActive: 7,
    tasksCompleted: 104,
    productivity: 90,
    status: 'active',
  },
];

export function TeamPage() {
  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and track their performance
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.reduce((sum, member) => sum + member.projectsActive, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamMembers.reduce((sum, member) => sum + member.productivity, 0) /
                  teamMembers.length
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group border-border/40 bg-card/50 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      <DropdownMenuItem>View Projects</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={member.status === 'active' ? 'default' : 'secondary'}
                    className={
                      member.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : ''
                    }
                  >
                    {member.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                    <p className="text-lg font-semibold">{member.projectsActive}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tasks Done</p>
                    <p className="text-lg font-semibold">{member.tasksCompleted}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Productivity</span>
                    <span className="font-medium">{member.productivity}%</span>
                  </div>
                  <Progress value={member.productivity} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
