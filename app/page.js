import CourseCard from "./components/CourseCard";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      <CourseCard title="Bacteriology" description="Learn the fundamentals of Bacteriology" />
    </div>
  );
}
