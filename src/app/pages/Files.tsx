import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Search, MoreVertical, File, FileText, Image, Film, Music, Archive, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const files = [
  {
    id: 1,
    name: 'project-proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'John Doe',
    uploadDate: 'May 15, 2026',
    icon: FileText,
    color: 'text-red-600',
  },
  {
    id: 2,
    name: 'design-mockups.fig',
    type: 'Figma',
    size: '15.8 MB',
    uploadedBy: 'Sarah Miller',
    uploadDate: 'May 14, 2026',
    icon: Image,
    color: 'text-purple-600',
  },
  {
    id: 3,
    name: 'presentation.pptx',
    type: 'PowerPoint',
    size: '8.2 MB',
    uploadedBy: 'Alex Brown',
    uploadDate: 'May 12, 2026',
    icon: FileText,
    color: 'text-orange-600',
  },
  {
    id: 4,
    name: 'demo-video.mp4',
    type: 'Video',
    size: '45.6 MB',
    uploadedBy: 'Emma Wilson',
    uploadDate: 'May 10, 2026',
    icon: Film,
    color: 'text-blue-600',
  },
  {
    id: 5,
    name: 'client-assets.zip',
    type: 'Archive',
    size: '120.3 MB',
    uploadedBy: 'David Lee',
    uploadDate: 'May 8, 2026',
    icon: Archive,
    color: 'text-amber-600',
  },
  {
    id: 6,
    name: 'brand-guidelines.pdf',
    type: 'PDF',
    size: '5.1 MB',
    uploadedBy: 'John Doe',
    uploadDate: 'May 5, 2026',
    icon: FileText,
    color: 'text-red-600',
  },
];

export function FilesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSize = files.reduce((sum, file) => {
    const size = parseFloat(file.size.split(' ')[0]);
    return sum + size;
  }, 0);

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Files</h1>
          <p className="text-muted-foreground mt-1">
            Manage and share project files with your team
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Shared Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card className="border-border/40 bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Upload className="mr-2 h-4 w-4" />
            Choose Files
          </Button>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="border-border/40 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>Files uploaded across all projects</CardDescription>
            </div>
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between rounded-lg border border-border/40 bg-card/30 p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <file.icon className={`h-6 w-6 ${file.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{file.uploadedBy}</span>
                      <span>•</span>
                      <span>{file.uploadDate}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{file.type}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Move to Folder</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
