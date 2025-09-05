import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Clock, Users } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  description: string | null;
  order: number;
  createdAt: string;
  _count: {
    problems: number;
  };
}

async function getChapters(): Promise<Chapter[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chapters`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch chapters');
  }
  
  return response.json();
}

export default async function ChaptersPage() {
  const chapters = await getChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Irodov Chapters
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore comprehensive video solutions organized by chapters from I.E. Irodov&apos;s 
            “Problems in General Physics”
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {chapters.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {chapters.reduce((acc, chapter) => acc + chapter._count.problems, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Problems</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              <BookOpen className="inline h-8 w-8" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              <Play className="inline h-8 w-8" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">Video Solutions</div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Card 
              key={chapter.id} 
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Chapter {chapter.order}
                    </span>
                  </div>
                  <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    {chapter._count.problems} problems
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {chapter.title}
                </CardTitle>
                {chapter.description && (
                  <CardDescription className="line-clamp-3">
                    {chapter.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Coming Soon</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>All Levels</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="group-hover:bg-blue-600 transition-colors"
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {chapters.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Chapters Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Chapters will be added soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}