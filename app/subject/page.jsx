'use client';
import CourseCard from '../components/course-card';
import AuthMiddleware from '@/app/utils/authMiddleware';
import { useRouter } from 'next/navigation';


export default function ExplorePage() {
    const router = useRouter();


    const subjects = [
        {
            title: 'Biochemistry',
            description: 'Biochemistry is the study of the chemical processes that occur in living organisms. It is a branch of medicine that deals with the diagnosis and treatment of diseases related to the chemical processes that occur in living organisms.',
            imageUrl: '/course-images/biochemistry.jpeg',
            slug: 'biochemistry',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',
        },
        {
            title: 'Bacteriology',
            description: 'Bacteriology is the study of bacteria, their classification, structure, functions, and role in health, disease, and industry.',
            imageUrl: '/course-images/bacteriology.jpeg',
            slug: 'bacteriology',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',

        },
        {
            title: 'Hematology',
            description: 'Hematology is the study of blood, its components, and their functions. It is a branch of medicine that deals with the diagnosis and treatment of diseases related to blood.',
            imageUrl: '/course-images/hematology.jpeg',
            slug: 'hematology',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',

        },
        {
            title: 'Parasitology',
            description: 'Parasitology is the study of parasites, their classification, structure, functions, and role in health, disease, and industry.',
            imageUrl: '/course-images/parasitology.png',
            slug: 'parasitology',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',

        },
        {
            title: 'Immunology',
            description: 'Immunology is the study of the immune system, its components, and their functions. It is a branch of medicine that deals with the diagnosis and treatment of diseases related to the immune system.',
            imageUrl: '/course-images/immunology.jpeg',
            slug: 'immunology',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',
        },
        {
            title: 'Blood Banking',
            description: 'Blood Banking is the study of blood, its components, and their functions. It is a branch of medicine that deals with the diagnosis and treatment of diseases related to blood.',
            imageUrl: '/course-images/blood-banking.jpeg',
            slug: 'blood-banking',
            primaryActionText: 'See Questions',
            secondaryActionText: 'Practice Quiz',
        }
    ]

    return (
        <AuthMiddleware>
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <p className="text-muted-foreground mb-6">
                    See all the subjects available.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject, index) => (
                        <CourseCard key={index} {...subject}
                            onPrimaryAction={() => {
                                router.push(`/subject/${subject.slug}`);
                            }}
                            onSecondaryAction={() => {
                                router.push(`/quiz/${subject.slug}`);
                            }}
                        />
                    ))}
                </div>
            </div>
        </AuthMiddleware>
    );
} 