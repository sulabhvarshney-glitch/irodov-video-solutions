import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');

    const where: any = {};
    
    if (chapterId) {
      where.chapterId = chapterId;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (difficulty && ['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) {
      where.difficulty = difficulty;
    }

    const problems = await db.problem.findMany({
      where,
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [
        { chapterId: 'asc' },
        { problemNumber: 'asc' },
      ],
    });

    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chapterId, problemNumber, title, description, difficulty } = body;

    const problem = await db.problem.create({
      data: {
        chapterId,
        problemNumber,
        title,
        description,
        difficulty,
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json(
      { error: 'Failed to create problem' },
      { status: 500 }
    );
  }
}