import { patientData } from "@/app/data/route";

// In-memory array
let patients = [...patientData];

// GET  Fetch all patients
export async function GET() {
  return new Response(JSON.stringify(patients), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST  Add new patient
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || !body.age || !body.disease || !body.contact || !body.image || !body.description) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newPatient = {
      id: Date.now(),
      name: body.name,
      age: body.age,
      disease: body.disease,
      contact: body.contact,
      image: body.image,
      description: body.description,
    };

    patients.unshift(newPatient);

    return new Response(JSON.stringify({ message: "Patient added successfully", newPatient }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON or server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
