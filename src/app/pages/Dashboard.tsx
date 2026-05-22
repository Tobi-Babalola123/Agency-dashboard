import { motion } from 'motion/react';
import { Users, Briefcase, FileText, DollarSign, TrendingUp, TrendingDown, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';

const stats = [
  {
    name: 'Total Clients',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'violet',
  },
  {
    name: 'Active Projects',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: Briefcase,
    color: 'blue',
  },
  {
    name: 'Pending Invoices',
    value: '23',
    change: '-4.3%',
    trend: 'down',
    icon: FileText,
    color: 'amber',
  },
  {
    name: 'Monthly Revenue',
    value: '$124.5K',
    change: '+18.7%',
    trend: 'up',
    icon: DollarSign,
    color: 'emerald',
  },
];

const recentActivities = [
  {
    id: 1,
    client: 'Acme Corp',
    action: 'New project created',
    time: '5 minutes ago',
    avatar: 'AC',
  },
  {
    id: 2,
    client: 'TechStart Inc',
    action: 'Invoice paid - $12,500',
    time: '1 hour ago',
    avatar: 'TS',
  },
  {
    id: 3,
    client: 'Design Studio',
    action: 'Project milestone completed',
    time: '2 hours ago',
    avatar: 'DS',
  },
  {
    id: 4,
    client: 'Brand Labs',
    action: 'New message received',
    time: '3 hours ago',
    avatar: 'BL',
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    project: 'Website Redesign',
    client: 'Acme Corp',
    deadline: 'May 20, 2026',
    progress: 75,
    priority: 'high',
  },
  {
    id: 2,
    project: 'Mobile App Development',
    client: 'TechStart Inc',
    deadline: 'May 25, 2026',
    progress: 45,
    priority: 'medium',
  },
  {
    id: 3,
    project: 'Brand Identity',
    client: 'Design Studio',
    deadline: 'June 2, 2026',
    progress: 90,
    priority: 'low',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 85000 },
  { month: 'Feb', revenue: 92000 },
  { month: 'Mar', revenue: 98000 },
  { month: 'Apr', revenue: 105000 },
  { month: 'May', revenue: 124500 },
  { month: 'Jun', revenue: 118000 },
];

const projectsData = [
  { name: 'In Progress', value: 45 },
  { name: 'Pending', value: 28 },
  { name: 'Completed', value: 83 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DashboardPage() {
  return (
    <div className="space-y-8 p-6 sm:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.name} variants={item}>
            <Card className="relative overflow-hidden border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`rounded-lg bg-${stat.color}-500/10 p-2`}>
                  <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Projects Chart */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current project distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: 'Projects',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="rgb(139, 92, 246)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Deadlines */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest client and project updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: activity.id * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-xs text-white">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.client}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Projects requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: project.id * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{project.project}</p>
                      <p className="text-xs text-muted-foreground">{project.client}</p>
                    </div>
                    <Badge
                      variant={
                        project.priority === 'high'
                          ? 'destructive'
                          : project.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {project.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{project.progress}% complete</span>
                      <span className="text-muted-foreground">{project.deadline}</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/40 bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Streamline your workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Users className="mr-2 h-4 w-4" />
              Add Client
            </Button>
            <Button variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
