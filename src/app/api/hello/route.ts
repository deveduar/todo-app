import { NextRequest, NextResponse } from 'next/server';

// Esta función maneja las solicitudes POST
export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'Hello from Next.js!' });
}

// Si deseas manejar otros métodos HTTP, puedes exportar funciones adicionales
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello from GET request!' });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: 'Hello from PUT request!' });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: 'Hello from DELETE request!' });
}
