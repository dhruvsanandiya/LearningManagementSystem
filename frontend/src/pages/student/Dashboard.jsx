import { BookOpen, Clock, Award, TrendingUp, Play, FileText } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Button } from '../../components/common/Button';
import { useEnrolledCourses } from '../../hooks/useCourses';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { data: enrolledCourses, isLoading } = useEnrolledCourses();

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses?.length || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month',
    },
    {
      title: 'Hours Learning',
      value: '45.5',
      icon: Clock,
      color: 'bg-green-500',
      change: '+12.5 this week',
    },
    {
      title: 'Certificates',
      value: '3',
      icon: Award,
      color: 'bg-purple-500',
      change: '+1 this month',
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5% improvement',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'lesson',
      title: 'Completed "Introduction to React Hooks"',
      course: 'Advanced React Development',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'quiz',
      title: 'Scored 92% on JavaScript Quiz',
      course: 'Modern JavaScript',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Submitted Final Project',
      course: 'Web Development Bootcamp',
      time: '1 day ago',
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'React Components Assignment',
      course: 'Advanced React Development',
      dueDate: '2025-10-05',
      type: 'assignment',
    },
    {
      id: 2,
      title: 'Database Design Quiz',
      course: 'Database Management',
      dueDate: '2025-10-07',
      type: 'quiz',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'Student'}! 👋
        </h1>
        <p className="text-primary-100">
          You're making great progress. Keep up the excellent work!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Continue Learning">
            {enrolledCourses && enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {course.instructor}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="primary" size="sm">
                            {course.category}
                          </Badge>
                          <Badge variant="success" size="sm">
                            {course.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Link to={`/dashboard/student/courses/${course.id}`}>
                        <Button size="sm" variant="primary">
                          <Play className="w-4 h-4 mr-1" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{course.progress || 0}%</span>
                      </div>
                      <ProgressBar progress={course.progress || 0} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">
                  You haven't enrolled in any courses yet
                </p>
                <Link to="/dashboard/student/browse">
                  <Button variant="primary">Browse Courses</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card title="Upcoming Deadlines">
            <div className="space-y-3">
              {upcomingDeadlines.map((item) => (
                <div
                  key={item.id}
                  className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900">
                      {item.title}
                    </h4>
                    <Badge variant="warning" size="sm">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{item.course}</p>
                  <p className="text-xs text-orange-600 font-medium">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {upcomingDeadlines.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No upcoming deadlines
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Card title="Recent Activity">
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0">
                {activity.type === 'lesson' && (
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                {activity.type === 'quiz' && (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                )}
                {activity.type === 'assignment' && (
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.course}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;


