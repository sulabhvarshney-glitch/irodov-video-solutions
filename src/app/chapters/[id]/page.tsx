import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Clock, Users, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";

interface Problem {
  id: string;
  problemNumber: number;
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  youtubeVideoId: string | null;
  duration: number | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string | null;
  order: number;
  createdAt: string;
  problems: Problem[];
}

async function getChapter(id: string): Promise<Chapter | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chapters/${id}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch chapter');
  }
  
  return response.json();
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'EASY':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'HARD':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'FAILED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

function formatDuration(seconds: number | null) {
  if (!seconds) return 'N/A';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapter = await getChapter(params.id);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Chapter Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The chapter you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/chapters">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedProblems = chapter.problems.filter(p => p.status === 'COMPLETED').length;
  const totalProblems = chapter.problems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/chapters">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Chapter {chapter.order}: {chapter.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {chapter.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {totalProblems}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Problems</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {completedProblems}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.round((completedProblems / totalProblems) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <Play className="inline h-6 w-6" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Video Solutions</div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All Difficulties</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All Status</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="NOT_STARTED">Not Started</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chapter.problems.map((problem) => (
            <Card 
              key={problem.id} 
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Problem {problem.problemNumber}
                      </span>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(problem.status)}>
                        {problem.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {problem.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {problem.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(problem.duration)}</span>
                    </div>
                    {problem.youtubeVideoId && (
                      <div className="flex items-center space-x-1">
                        <Play className="h-4 w-4" />
                        <span>Video Ready</span>
                      </div>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!problem.youtubeVideoId}
                    className={problem.youtubeVideoId ? '' : 'opacity-50 cursor-not-allowed'}
                  >
                    {problem.youtubeVideoId ? 'Watch Solution' : 'Coming Soon'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {chapter.problems.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Problems Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Problems will be added to this chapter soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}