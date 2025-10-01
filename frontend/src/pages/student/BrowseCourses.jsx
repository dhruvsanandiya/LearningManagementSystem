import { useState } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Star } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useCourses, useEnrollCourse } from '../../hooks/useCourses';
import { Link } from 'react-router-dom';

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const { data: courses, isLoading } = useCourses({
    search: searchTerm,
    category: selectedCategory,
    level: selectedLevel,
  });

  const enrollMutation = useEnrollCourse();

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleEnroll = async (courseId) => {
    await enrollMutation.mutateAsync(courseId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
        <p className="text-gray-600">
          Discover your next learning adventure from our extensive catalog
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="input-field"
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            {/* Course Image */}
            <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>

            {/* Course Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{course.rating || 4.5}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center space-x-2">
                <Badge variant="primary" size="sm">
                  {course.category}
                </Badge>
                <Badge 
                  variant={
                    course.difficulty === 'Beginner' ? 'success' :
                    course.difficulty === 'Intermediate' ? 'warning' :
                    'danger'
                  } 
                  size="sm"
                >
                  {course.difficulty}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount || 0} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration || '8'} weeks</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">By {course.instructor}</p>
                </div>
                {course.isEnrolled ? (
                  <Link to={`/dashboard/student/courses/${course.id}`}>
                    <Button size="sm" variant="primary">
                      Continue
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleEnroll(course.id)}
                    isLoading={enrollMutation.isPending}
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {courses?.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseCourses;


