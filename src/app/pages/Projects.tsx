import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, MoreVertical, Calendar, Users as UsersIcon, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'Acme Corporation',
    status: 'in-progress',
    progress: 75,
    deadline: 'May 20, 2026',
    team: ['JD', 'SM', 'AB'],
    priority: 'high',
    tasksCompleted: 18,
    totalTasks: 24,
    description: 'Complete redesign of corporate website with modern UI/UX',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'in-progress',
    progress: 45,
    deadline: 'May 25, 2026',
    team: ['JD', 'EW'],
    priority: 'medium',
    tasksCompleted: 12,
    totalTasks: 28,
    description: 'Native iOS and Android app for customer engagement',
  },
  {
    id: 3,
    name: 'Brand Identity',
    client: 'Design Studio Pro',
    status: 'completed',
    progress: 100,
    deadline: 'May 15, 2026',
    team: ['SM', 'AB', 'DL'],
    priority: 'low',
    tasksCompleted: 15,
    totalTasks: 15,
    description: 'Complete brand identity package including logo and guidelines',
  },
  {
    id: 4,
    name: 'E-commerce Platform',
    client: 'Brand Labs',
    status: 'pending',
    progress: 15,
    deadline: 'June 10, 2026',
    team: ['EW', 'DL'],
    priority: 'medium',
    tasksCompleted: 3,
    totalTasks: 35,
    description: 'Custom e-commerce solution with payment integration',
  },
  {
    id: 5,
    name: 'Marketing Campaign',
    client: 'Creative Agency',
    status: 'in-progress',
    progress: 60,
    deadline: 'May 30, 2026',
    team: ['AB', 'SM'],
    priority: 'high',
    tasksCompleted: 21,
    totalTasks: 32,
    description: 'Digital marketing campaign across social media platforms',
  },
  {
    id: 6,
    name: 'API Integration',
    client: 'TechStart Inc',
    status: 'overdue',
    progress: 85,
    deadline: 'May 10, 2026',
    team: ['JD'],
    priority: 'high',
    tasksCompleted: 17,
    totalTasks: 20,
    description: 'Third-party API integrations for platform expansion',
  },
];

const statusColors = {
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'pending': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'completed': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'overdue': 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your client projects
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group h-full border-border/40 bg-card/50 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.client}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>View Tasks</DropdownMenuItem>
                      <DropdownMenuItem>Add Team Member</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Archive Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                  <Badge
                    variant={
                      project.priority === 'high'
                        ? 'destructive'
                        : project.priority === 'medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {project.priority}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {project.tasksCompleted} of {project.totalTasks} tasks completed
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.deadline}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-background">
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-[10px] text-white">
                          {member}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
