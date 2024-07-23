import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    // Aquí puedes manejar la lógica de creación de un ítem en tu base de datos
    // const id = await createItem(parsed);

    return NextResponse.json({ message: 'Form submitted successfully', data: parsed });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      // Maneja otros tipos de errores
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}
